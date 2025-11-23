import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Language mapping
const LANGUAGE_NAMES: { [key: string]: string } = {
  el: 'Greek',
  en: 'English',
  de: 'German',
  fr: 'French',
  it: 'Italian',
  es: 'Spanish',
  pt: 'Portuguese',
};

// Type definitions
export interface ProducerData {
  name: string;
  location: string;
  productType: string;
  sourceLanguage: string; // Changed from descriptionGreek
  description: string; // Changed from descriptionGreek
  photoUrl?: string;
}

export interface TranslatedProfile {
  original: ProducerData;
  translations: {
    en: string;
    de: string;
    fr: string;
    it: string;
    es: string;
    pt: string;
    el: string;
  };
  storytelling: {
    en: string;
    de: string;
    fr: string;
  };
  keywords: string[];
  category: string;
}

export interface BuyerQuery {
  query: string;
  location?: string;
  productType?: string;
}

export interface ProducerMatch {
  producer: TranslatedProfile;
  score: number;
  reasoning: string;
  fitAnalysis: {
    locationFit: number;
    productFit: number;
    qualityFit: number;
  };
}

// AI Service for Producer Processing
export async function processProducer(
  data: ProducerData
): Promise<TranslatedProfile> {
  const sourceLangName = LANGUAGE_NAMES[data.sourceLanguage] || 'Unknown';

  // Get all target languages (all 7 except the source)
  const allLanguages = ['el', 'en', 'de', 'fr', 'it', 'es', 'pt'];
  const targetLanguages = allLanguages.filter(lang => lang !== data.sourceLanguage);

  const prompt = `You are a cultural commerce expert helping artisan producers reach global markets.

Producer Information:
- Name: ${data.name}
- Location: ${data.location}
- Product: ${data.productType}
- Description (${sourceLangName}): ${data.description}

Your task:
1. Translate the ${sourceLangName} description into ${targetLanguages.map(l => LANGUAGE_NAMES[l]).join(', ')}
   - Preserve cultural nuance and emotional tone
   - Don't just translate words - capture the story and heritage
   - Make it compelling for international buyers

2. Create enhanced "storytelling" versions in English, German, and French that:
   - Emphasize authenticity and tradition
   - Highlight unique selling points
   - Connect the product to place and heritage
   - Are 2-3 sentences longer than the translation

3. Extract 5-8 relevant keywords (in English) for searchability

4. Categorize the product (choose ONE): Artisan Food, Artisan Beverage, Handmade Crafts, Textiles, Wellness Products, or Other

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "translations": {
    ${targetLanguages.map(lang => `"${lang}": "..."`).join(',\n    ')}
  },
  "storytelling": {
    "en": "...",
    "de": "...",
    "fr": "..."
  },
  "keywords": ["keyword1", "keyword2", ...],
  "category": "Artisan Food"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a cultural commerce AI assistant. You ONLY respond with valid JSON, no other text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const aiResponse = JSON.parse(content);

    // Add the source language description to translations
    const fullTranslations: any = {
      ...aiResponse.translations,
      [data.sourceLanguage]: data.description, // Keep original
    };

    return {
      original: data,
      translations: fullTranslations,
      storytelling: aiResponse.storytelling,
      keywords: aiResponse.keywords,
      category: aiResponse.category,
    };
  } catch (error) {
    console.error('Error processing producer:', error);
    throw new Error('Failed to process producer with AI');
  }
}

// AI Service for Buyer Matching
export async function matchBuyerWithProducers(
  buyerQuery: BuyerQuery,
  producers: TranslatedProfile[]
): Promise<ProducerMatch[]> {
  const producersContext = producers
    .map(
      (p, idx) => `
Producer ${idx + 1}:
- Name: ${p.original.name}
- Location: ${p.original.location}
- Product: ${p.original.productType}
- Category: ${p.category}
- Description: ${p.translations.en}
- Keywords: ${p.keywords.join(', ')}
`
    )
    .join('\n---\n');

  const prompt = `You are a B2B matching expert for cultural commerce.

Buyer Query: "${buyerQuery.query}"
${buyerQuery.location ? `Buyer Location: ${buyerQuery.location}` : ''}
${buyerQuery.productType ? `Preferred Product: ${buyerQuery.productType}` : ''}

Available Producers:
${producersContext}

Your task:
1. Analyze the buyer's needs
2. Rank ALL producers by relevance (score 0-100)
3. For the top 3 matches, provide:
   - Overall match score
   - Breakdown: location fit, product fit, quality/authenticity fit (each 0-100)
   - Clear reasoning for why this is a good match (2-3 sentences)

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "matches": [
    {
      "producerIndex": 0,
      "score": 94,
      "reasoning": "...",
      "locationFit": 90,
      "productFit": 95,
      "qualityFit": 97
    }
  ]
}

Return the top 3 matches only.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a B2B matching AI. You ONLY respond with valid JSON, no other text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const aiResponse = JSON.parse(content);

    const matches: ProducerMatch[] = aiResponse.matches.map((match: any) => ({
      producer: producers[match.producerIndex],
      score: match.score,
      reasoning: match.reasoning,
      fitAnalysis: {
        locationFit: match.locationFit,
        productFit: match.productFit,
        qualityFit: match.qualityFit,
      },
    }));

    return matches;
  } catch (error) {
    console.error('Error matching buyer with producers:', error);
    throw new Error('Failed to match buyer with producers');
  }
}