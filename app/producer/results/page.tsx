"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProducerData {
  name: string;
  location: string;
  productType: string;
  description: string;
  photoUrl: string;
}

const translations = [
  { lang: "EN", flag: "🇬🇧", text: "Premium organic olive oil from traditional Greek groves, cold-pressed and sustainably produced." },
  { lang: "DE", flag: "🇩🇪", text: "Hochwertiges Bio-Olivenöl aus traditionellen griechischen Hainen, kaltgepresst und nachhaltig hergestellt." },
  { lang: "FR", flag: "🇫🇷", text: "Huile d'olive biologique premium des oliveraies grecques traditionnelles, pressée à froid et produite durablement." },
  { lang: "IT", flag: "🇮🇹", text: "Olio d'oliva biologico premium da uliveti tradizionali greci, spremuto a freddo e prodotto in modo sostenibile." },
  { lang: "ES", flag: "🇪🇸", text: "Aceite de oliva orgánico premium de olivares griegos tradicionales, prensado en frío y producido de forma sostenible." },
  { lang: "PT", flag: "🇵🇹", text: "Azeite orgânico premium de olivais gregos tradicionais, prensado a frio e produzido de forma sustentável." },
];

const keywords = [
  "organic", "traditional", "sustainable", "cold-pressed", "premium",
  "Greek heritage", "artisanal", "family-owned", "extra virgin"
];

export default function ProducerResults() {
  const [producerData, setProducerData] = useState<ProducerData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("producerData");
    if (data) {
      setProducerData(JSON.parse(data));
    }
  }, []);

  if (!producerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading...</p>
          <Link href="/producer" className="text-blue-600 hover:text-blue-800">
            Return to form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your profile is ready!
            </h1>
            <p className="text-gray-600">
              AI has processed and optimized your listing
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Producer Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                {producerData.name}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Location:</span>{" "}
                {producerData.location}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Product:</span>{" "}
                {producerData.productType}
              </div>
            </div>
            {producerData.photoUrl && (
              <div className="mb-6">
                <img
                  src={producerData.photoUrl}
                  alt="Product"
                  className="w-full max-w-md rounded-lg shadow-md"
                />
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold text-gray-700">
                Original Description:
              </span>
              <p className="mt-2 text-gray-800">{producerData.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI-Generated Translations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {translations.map((t) => (
              <div
                key={t.lang}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{t.flag}</span>
                  <span className="font-bold text-gray-900">{t.lang}</span>
                </div>
                <p className="text-gray-700 text-sm">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Extracted Keywords
          </h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/producer">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200">
              Create Another Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
