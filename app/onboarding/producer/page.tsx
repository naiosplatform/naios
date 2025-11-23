"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const productTypes = [
  "Olive Oil",
  "Wine",
  "Ceramics",
  "Textiles",
  "Honey",
  "Cheese",
  "Herbs",
  "Other",
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

export default function ProducerOnboarding() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: userProfile?.full_name || "",
    location: "",
    productType: "",
    sourceLanguage: "el",
    description: "",
    photoUrl: "",
  });

  const selectedLanguage = languages.find(
    (l) => l.code === formData.sourceLanguage,
  );

  const handleNext = () => {
    if (
      step === 1 &&
      (!formData.name || !formData.location || !formData.productType)
    ) {
      setError("Please fill in all required fields");
      return;
    }
    if (step === 2 && !formData.description) {
      setError("Please write your story");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

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
          userId: user?.id, // Pass user ID to link
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create profile");
      }

      // Success! Redirect to dashboard
      router.push("/dashboard/producer");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Step {step} of 3
              </span>
              <span className="text-sm text-gray-500">
                {step === 1 && "Business Info"}
                {step === 2 && "Your Story"}
                {step === 3 && "Almost Done!"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1 && "Tell us about your business"}
            {step === 2 && "Share your story"}
            {step === 3 && "Final touches"}
          </h1>
          <p className="text-gray-600 mb-8">
            {step === 1 && "Basic information about your products"}
            {step === 2 && "AI will translate it to 6 languages"}
            {step === 3 && "Optional details to enhance your profile"}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-xl text-gray-700">Creating your profile...</p>
              <p className="text-gray-500 mt-2">
                ✨ Translating to 6 languages
              </p>
              <p className="text-sm text-gray-400 mt-4">
                This may take 15-30 seconds...
              </p>
            </div>
          )}

          {!loading && (
            <>
              {/* Step 1: Business Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Name *
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select a product type</option>
                      {productTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Story */}
              {step === 2 && (
                <div className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      ℹ️ Choose your native language - AI will translate to 6
                      languages
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Description *
                    </label>
                    <p className="text-sm text-blue-600 mb-2">
                      ✍️ Write in {selectedLanguage?.name.split(" (")[0]}
                    </p>
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
                </div>
              )}

              {/* Step 3: Optional */}
              {step === 3 && (
                <div className="space-y-6">
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
                    <p className="text-sm text-gray-500 mt-1">
                      You can add this later from your dashboard
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      🎉 You're all set!
                    </h3>
                    <p className="text-sm text-gray-600">
                      Click "Complete Setup" and we'll create your global
                      profile with AI translations in 6 languages.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Complete Setup
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
