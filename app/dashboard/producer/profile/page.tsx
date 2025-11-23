"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const languages = [
  { code: "el", name: "Greek (Ελληνικά)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "es", name: "Spanish (Español)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "en", name: "English" },
];

export default function ProducerProfile() {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [producer, setProducer] = useState<any>(null);
  const [formData, setFormData] = useState({
    business_name: "",
    location: "",
    source_language: "el",
    description_original: "",
    photo_url: "",
    product_type: "",
  });

  useEffect(() => {
    fetchProducerData();
  }, [userProfile?.id]);

  const fetchProducerData = async () => {
    if (!userProfile?.id) return;

    const { data, error } = await supabase
      .from("producers")
      .select("*")
      .eq("user_id", userProfile.id)
      .single();

    if (data) {
      setProducer(data);
      setFormData({
        business_name: data.business_name || "",
        location: data.location || "",
        source_language: data.source_language || "el",
        description_original: data.description_original || "",
        photo_url: data.photo_url || "",
        product_type: data.product_type || "",
      });
    }

    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update producer record
      const { error } = await supabase
        .from("producers")
        .update({
          business_name: formData.business_name,
          location: formData.location,
          source_language: formData.source_language,
          description_original: formData.description_original,
          photo_url: formData.photo_url,
          product_type: formData.product_type,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userProfile?.id);

      if (error) throw error;

      // TODO: Optionally re-translate if description changed
      // For MVP, we'll just save - can add re-translation later

      alert("Profile updated successfully!");
      fetchProducerData();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (!producer) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          No Profile Found
        </h2>
        <p className="text-gray-600 mb-4">
          You haven't created a producer profile yet.
          <a href="/producer" className="text-blue-600 hover:underline ml-1">
            Create one now →
          </a>
        </p>
      </div>
    );
  }

  const selectedLanguage = languages.find(
    (l) => l.code === formData.source_language,
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Edit Your Profile
        </h2>
        <p className="text-gray-600">
          Update your business information and product story
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-lg shadow-sm p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            required
            value={formData.business_name}
            onChange={(e) =>
              setFormData({ ...formData, business_name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your business or company name"
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
          <input
            type="text"
            required
            value={formData.product_type}
            onChange={(e) =>
              setFormData({ ...formData, product_type: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Olive Oil, Wine, Ceramics"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Language *
          </label>
          <select
            required
            value={formData.source_language}
            onChange={(e) =>
              setFormData({ ...formData, source_language: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Story *
          </label>
          <p className="text-sm text-blue-600 mb-2">
            ✍️ Write in {selectedLanguage?.name.split(" (")[0]}
          </p>
          <textarea
            required
            maxLength={500}
            value={formData.description_original}
            onChange={(e) =>
              setFormData({ ...formData, description_original: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
            placeholder="Tell your story..."
          />
          <div className="text-sm text-gray-500 mt-1">
            {formData.description_original.length}/500 characters
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Photo URL (optional)
          </label>
          <input
            type="url"
            value={formData.photo_url}
            onChange={(e) =>
              setFormData({ ...formData, photo_url: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => fetchProducerData()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Current Translations Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tip</h3>
        <p className="text-sm text-gray-600">
          If you change your story, consider re-submitting via the registration
          page to get fresh AI translations. We'll add automatic re-translation
          in a future update!
        </p>
      </div>
    </div>
  );
}
