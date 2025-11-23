import { supabaseAdmin } from '../lib/supabase';
import { seedProducers } from '../lib/seedProducers';

async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  // Insert producers one by one
  for (const producer of seedProducers) {
    console.log(`📦 Inserting: ${producer.original.name}`);

    // 1. Insert producer basic info
    const { data: producerData, error: producerError } = await supabaseAdmin
      .from('producers')
      .insert({
        business_name: producer.original.name,
        location: producer.original.location,
        product_type: producer.original.productType,
        description_greek: producer.original.descriptionGreek,
        photo_url: producer.original.photoUrl,
        category: producer.category,
        keywords: producer.keywords,
      })
      .select()
      .single();

    if (producerError) {
      console.error('❌ Error inserting producer:', producerError);
      continue;
    }

    console.log(`✅ Inserted producer: ${producerData.id}`);

    // 2. Insert translations
    const translationPromises = Object.entries(producer.translations).map(
      ([language, translation]) =>
        supabaseAdmin.from('producer_translations').insert({
          producer_id: producerData.id,
          language,
          translation,
          storytelling: producer.storytelling[language] || null,
        })
    );

    await Promise.all(translationPromises);
    console.log(`✅ Inserted translations for ${producer.original.name}`);
  }

  console.log('🎉 Database seeded successfully!');
}

// Run it
seedDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('💥 Seed failed:', err);
    process.exit(1);
  });