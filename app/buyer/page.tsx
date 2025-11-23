"use client";

import { useState } from "react";
import Link from "next/link";
import { seedProducers } from "@/lib/seedProducers";
import { ProducerMatch } from "@/lib/aiService";

export default function BuyerPage() {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<ProducerMatch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMatches([]);

    try {
      const response = await fetch("/api/match-buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: { query: searchQuery },
          producers: seedProducers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to find matches");
      }

      const data = await response.json();
      setMatches(data.matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMatches([]);
    setError(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-5xl mx-auto py-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {matches.length === 0 ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Find Your Perfect Producer
              </h1>
              <p className="text-gray-600 mb-8">
                AI-powered matching for authentic cultural products
              </p>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                  <p className="text-xl text-gray-700">Searching with AI...</p>
                  <p className="text-gray-500 mt-2">
                    ✨ Analyzing your requirements
                  </p>
                  <p className="text-gray-500">
                    ✨ Matching with {seedProducers.length} producers
                  </p>
                  <p className="text-gray-500">✨ Ranking by relevance</p>
                  <p className="text-sm text-gray-400 mt-4">
                    This may take 10-20 seconds...
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
                        What are you looking for? *
                      </label>
                      <textarea
                        required
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40"
                        placeholder="Describe what you're looking for... (e.g., 'I need organic olive oil from Crete for my boutique hotel in Santorini')"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Be as specific as possible to get the best matches
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        💡 Search Tips
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Specify product type and origin</li>
                        <li>
                          • Mention quality requirements (organic, artisanal,
                          etc.)
                        </li>
                        <li>• Include intended use or application</li>
                        <li>• Note any location preferences</li>
                      </ul>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                    >
                      Search with AI
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Found {matches.length} Perfect Matches!
                </h2>
                <p className="text-gray-600">
                  AI analyzed your needs and ranked these producers
                </p>
              </div>

              <div className="space-y-6">
                {matches.map((match, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">#{idx + 1}</span>
                        <span className="text-sm opacity-90">Match Score</span>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{match.score}</div>
                        <div className="text-xs opacity-90">out of 100</div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex gap-6">
                        {match.producer.original.photoUrl && (
                          <img
                            src={match.producer.original.photoUrl}
                            alt={match.producer.original.name}
                            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                          />
                        )}

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {match.producer.original.name}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            📍 {match.producer.original.location}
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {match.producer.translations.en}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {match.producer.keywords.slice(0, 5).map((keyword, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          🎯 Why This Match?
                        </h4>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {match.reasoning}
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {match.fitAnalysis.locationFit}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              Location Fit
                            </div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {match.fitAnalysis.productFit}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              Product Fit
                            </div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {match.fitAnalysis.qualityFit}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              Quality Fit
                            </div>
                          </div>
                        </div>

                        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all">
                          Contact Producer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  New Search
                </button>
                <button
                  onClick={() => {
                    const results = matches.map((m) => ({
                      name: m.producer.original.name,
                      score: m.score,
                      location: m.producer.original.location,
                    }));
                    navigator.clipboard.writeText(
                      JSON.stringify(results, null, 2)
                    );
                    alert("Match results copied to clipboard!");
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  Export Results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}