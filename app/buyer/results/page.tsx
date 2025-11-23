"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const dummyMatches = [
  {
    id: 1,
    name: "Konstantinos Olive Groves",
    location: "Kalamata, Messinia, Greece",
    productType: "Olive Oil",
    score: 94,
    photoUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    description: "Family-owned olive groves producing premium extra virgin olive oil using traditional methods passed down through four generations.",
    matchReason: "Perfect match for your organic requirements. Their cold-pressed extra virgin olive oil from Kalamata has PDO certification and sustainable farming practices. 50+ year old trees produce exceptional quality oil ideal for high-end restaurants.",
  },
  {
    id: 2,
    name: "Mediterranean Heritage Oils",
    location: "Crete, Greece",
    productType: "Olive Oil",
    score: 89,
    photoUrl: "https://images.unsplash.com/photo-1509448871844-97a8f476ddab?w=400",
    description: "Artisanal producer specializing in single-estate organic olive oils with international certifications and export experience.",
    matchReason: "Strong match with proven export track record to 15+ EU countries. Holds organic certifications (EU, USDA) and has experience supplying restaurant chains. Their Koroneiki variety offers consistent quality year-round.",
  },
  {
    id: 3,
    name: "Golden Harvest Cooperative",
    location: "Sparta, Laconia, Greece",
    productType: "Olive Oil",
    score: 85,
    photoUrl: "https://images.unsplash.com/photo-1611143669419-5efead1d4e75?w=400",
    description: "Cooperative of 40+ small-scale organic farmers producing certified organic olive oil with full traceability and quality control.",
    matchReason: "Good match for volume requirements. The cooperative can scale production to meet larger orders while maintaining organic standards. They offer competitive pricing and have established logistics for bulk shipments across Europe.",
  },
];

export default function BuyerResults() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const query = localStorage.getItem("buyerSearch");
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <Link href="/buyer" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← New Search
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Top Matches for Your Search
          </h1>
          {searchQuery && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Your Search:
              </p>
              <p className="text-gray-800">{searchQuery}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {dummyMatches.map((match, index) => (
            <div
              key={match.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 md:p-8"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={match.photoUrl}
                      alt={match.name}
                      className="w-32 h-32 rounded-lg object-cover shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div className="text-lg leading-none">{match.score}</div>
                        <div className="text-xs">/100</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        #{index + 1} {match.name}
                      </h2>
                      <p className="text-gray-600 flex items-center">
                        <span className="mr-2">📍</span>
                        {match.location}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {match.productType}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{match.description}</p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      🎯 Why this match?
                    </h3>
                    <p className="text-sm text-gray-700">{match.matchReason}</p>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all duration-200 hover:shadow-lg">
                    Contact Producer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/buyer">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200">
              Start New Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
