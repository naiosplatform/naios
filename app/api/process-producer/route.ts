import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { processProducer, ProducerData } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (
      !body.name ||
      !body.location ||
      !body.description ||
      !body.sourceLanguage
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, location, description, sourceLanguage",
        },
        { status: 400 },
      );
    }

    console.log(
      "Processing producer:",
      body.name,
      "Source language:",
      body.sourceLanguage,
    );

    // Prepare data for AI processing
    const producerData: ProducerData = {
      name: body.name,
      location: body.location,
      productType: body.productType,
      sourceLanguage: body.sourceLanguage,
      description: body.description,
      photoUrl: body.photoUrl,
    };

    // Process with AI
    const aiResult = await processProducer(producerData);

    console.log("AI processing complete, saving to database...");

    // Save to database
    const { data: producerDataDb, error: producerError } = await supabaseAdmin
      .from("producers")
      .insert({
        user_id: body.userId, // ← ΠΡΟΣΤΕΘΗΚΕ ΑΥΤΟ
        business_name: aiResult.original.name,
        location: aiResult.original.location,
        product_type: aiResult.original.productType,
        source_language: aiResult.original.sourceLanguage,
        description_original: aiResult.original.description,
        photo_url: aiResult.original.photoUrl,
        category: aiResult.category,
        keywords: aiResult.keywords,
      })
      .select()
      .single();

    if (producerError) {
      console.error("Database error:", producerError);
      return NextResponse.json(
        { error: "Failed to save producer", details: producerError.message },
        { status: 500 },
      );
    }

    console.log("Producer saved to database:", producerDataDb.id);

    // Save translations (all 7 languages)
    const translationPromises = Object.entries(aiResult.translations).map(
      ([language, translation]) =>
        supabaseAdmin.from("producer_translations").insert({
          producer_id: producerDataDb.id,
          language,
          translation,
          storytelling:
            aiResult.storytelling[language as "en" | "de" | "fr"] || null,
        }),
    );

    await Promise.all(translationPromises);

    console.log("Translations saved successfully");

    // Return complete result
    return NextResponse.json({
      ...aiResult,
      producer_id: producerDataDb.id,
    });
  } catch (error) {
    console.error("Error in process-producer API:", error);
    return NextResponse.json(
      {
        error: "Failed to process producer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
