import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  matchBuyerWithProducers,
  BuyerQuery,
  TranslatedProfile,
} from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body: { query: BuyerQuery } = await request.json();

    // Validate input
    if (!body.query || !body.query.query) {
      return NextResponse.json(
        { error: "Missing search query" },
        { status: 400 },
      );
    }

    console.log("Buyer query:", body.query.query);

    // Fetch producers from database
    const { data: producersData, error: producersError } = await supabase
      .from("producers")
      .select("*");

    if (producersError) {
      console.error("Database error:", producersError);
      return NextResponse.json(
        { error: "Failed to fetch producers" },
        { status: 500 },
      );
    }

    console.log(`Found ${producersData.length} producers in database`);

    // Fetch translations for each producer
    const producersWithTranslations: TranslatedProfile[] = await Promise.all(
      producersData.map(async (producer) => {
        const { data: translations } = await supabase
          .from("producer_translations")
          .select("*")
          .eq("producer_id", producer.id);

        // Convert translations array to object format with ALL 7 languages
        const translationsObj = {
          en: "",
          de: "",
          fr: "",
          it: "",
          es: "",
          pt: "",
          el: "", // ← ΠΡΟΣΤΕΘΗΚΕ ΕΛΛΗΝΙΚΑ!
        };

        const storytellingObj = {
          en: "",
          de: "",
          fr: "",
        };

        translations?.forEach((t) => {
          if (t.language in translationsObj) {
            translationsObj[t.language as keyof typeof translationsObj] =
              t.translation;
          }
          if (t.storytelling && ["en", "de", "fr"].includes(t.language)) {
            storytellingObj[t.language as "en" | "de" | "fr"] = t.storytelling;
          }
        });

        return {
          original: {
            name: producer.business_name,
            location: producer.location,
            productType: producer.product_type,
            sourceLanguage: producer.source_language, // ← ΠΡΟΣΤΕΘΗΚΕ!
            description: producer.description_original, // ← ΔΙΟΡΘΩΘΗΚΕ το field name
            photoUrl: producer.photo_url,
          },
          translations: translationsObj,
          storytelling: storytellingObj,
          keywords: producer.keywords || [],
          category: producer.category,
        };
      }),
    );

    console.log("Matching with AI...");

    // Match with AI
    const matches = await matchBuyerWithProducers(
      body.query,
      producersWithTranslations,
    );

    console.log(`Found ${matches.length} matches`);

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Error in match-buyers API:", error);
    return NextResponse.json(
      {
        error: "Failed to match buyer with producers",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
