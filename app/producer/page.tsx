"use client";

import { useState } from "react";
import Link from "next/link";
import { TranslatedProfile } from "@/lib/aiService";

const productTypes = [
  "Olive Oil",
  "Wine",
  "Ceramics",
  "Textiles",
  "Honey",
  "Cheese",
  "Herbs",
];

const languages = [
  {
    code: "el",
    name: "Greek (Ελληνικά)",
    placeholder: "Περιγράψτε το προϊόν σας...",
  },
  {
    code: "it",
    name: "Italian (Italiano)",
    placeholder: "Descrivi il tuo prodotto...",
  },
  {
    code: "es",
    name: "Spanish (Español)",
    placeholder: "Describe tu producto...",
  },
  {
    code: "pt",
    name: "Portuguese (Português)",
    placeholder: "Descreva o seu produto...",
  },
  {
    code: "fr",
    name: "French (Français)",
    placeholder: "Décrivez votre produit...",
  },
  {
    code: "de",
    name: "German (Deutsch)",
    placeholder: "Beschreiben Sie Ihr Produkt...",
  },
  { code: "en", name: "English", placeholder: "Describe your product..." },
];

export default function ProducerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslatedProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    productType: "",
    sourceLanguage: "el",
    description: "",
    photoUrl: "",
  });

  const selectedLanguage = languages.find(
    (l) => l.code === formData.sourceLanguage,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/process-producer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          location: formData.location,
          productType: formData.productType,
          sourceLanguage: formData.sourceLanguage,
          description: formData.description,
          photoUrl: formData.photoUrl || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process producer");
      }

      const data: TranslatedProfile = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setFormData({
      name: "",
      location: "",
      productType: "",
      sourceLanguage: "el",
      description: "",
      photoUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {!result ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Producer Registration
              </h1>
              <p className="text-gray-600 mb-8">
                Share your products with buyers across Europe
              </p>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                  <p className="text-xl text-gray-700">Processing with AI...</p>
                  <p className="text-gray-500 mt-2">
                    ✨ Translating to 6 languages
                  </p>
                  <p className="text-gray-500">
                    ✨ Creating compelling storytelling
                  </p>
                  <p className="text-gray-500">✨ Extracting keywords</p>
                  <p className="text-sm text-gray-400 mt-4">
                    This may take 15-30 seconds...
                  </p>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                      <p className="font-semibold">Error:</p>
                      <p>{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name or company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="City, Region, Country"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Type *
                      </label>
                      <select
                        required
                        value={formData.productType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            productType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a product type</option>
                        {productTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Language *
                      </label>
                      <select
                        required
                        value={formData.sourceLanguage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sourceLanguage: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-gray-500 mt-1">
                        ℹ️ Choose your native language - AI will translate to
                        the other 6 languages
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description in {selectedLanguage?.name.split(" ")[0]} *
                      </label>
                      <textarea
                        required
                        maxLength={500}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                        placeholder={selectedLanguage?.placeholder}
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.description.length}/500 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Photo URL (optional)
                      </label>
                      <input
                        type="url"
                        value={formData.photoUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, photoUrl: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                    >
                      Submit Profile
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Global Profile is Ready!
                </h2>
                <p className="text-gray-600">
                  AI has translated your product into 6 languages
                </p>
              </div>

              {/* Original Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Original Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {result.original.name}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {result.original.location}
                  </p>
                  <p>
                    <span className="font-medium">Product:</span>{" "}
                    {result.original.productType}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {result.category}
                  </p>
                </div>
              </div>

              {/* Translations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📝 Translations
                </h3>
                <div className="space-y-4">
                  {Object.entries(result.translations).map(([lang, text]) => (
                    <div key={lang} className="border-l-4 border-blue-500 pl-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        {lang === "en" && "English"}
                        {lang === "de" && "Deutsch"}
                        {lang === "fr" && "Français"}
                        {lang === "it" && "Italiano"}
                        {lang === "es" && "Español"}
                        {lang === "pt" && "Português"}
                        {lang === "el" && "Ελληνικά"}
                      </p>
                      <p className="text-gray-800">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storytelling */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  ✨ Enhanced Storytelling
                </h3>
                <div className="space-y-4">
                  {Object.entries(result.storytelling).map(([lang, text]) => (
                    <div
                      key={lang}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6"
                    >
                      <p className="text-xs font-semibold text-blue-600 uppercase mb-2">
                        {lang === "en" && "English"}
                        {lang === "de" && "Deutsch"}
                        {lang === "fr" && "Français"}
                      </p>
                      <p className="text-gray-800 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  🏷️ Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Create Another Profile
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(result, null, 2),
                    );
                    alert("Profile data copied to clipboard!");
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Copy Profile Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
