"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

const categories = [
  {
    emoji: "🌿",
    title: "Essence of the Land",
    subtitle: "η ψυχή της γης",
    description:
      "Natural produce, regional foods, and flavors born from Mediterranean soil",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80",
    subcategories: [
      "Olive Oil",
      "Wine",
      "Honey",
      "Herbs & Teas",
      "Artisan Preserves",
    ],
  },
  {
    emoji: "🪶",
    title: "Crafted Objects",
    subtitle: "χειροποίητα",
    description:
      "Where tradition meets the human touch—every piece tells a story",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&q=80",
    subcategories: [
      "Ceramics",
      "Jewelry",
      "Textiles",
      "Woodwork",
      "Handmade Accessories",
    ],
  },
  {
    emoji: "🌸",
    title: "Wellbeing & Nature",
    subtitle: "φυσική ευεξία",
    description:
      "Natural care rooted in ancient wisdom and Mediterranean botanicals",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80",
    subcategories: [
      "Skincare",
      "Natural Soaps",
      "Herbal Wellness",
      "Essential Oils",
    ],
  },
  {
    emoji: "💎",
    title: "Limited Heritage",
    subtitle: "συλλεκτικά",
    description:
      "Rare collections for connoisseurs—numbered editions, ancient techniques",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&q=80",
    subcategories: [
      "Heritage Crafts",
      "Premium Editions",
      "Designer Collaborations",
    ],
  },
];

export function Categories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-naios-olive via-naios-terracotta to-naios-clay rounded-full"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-naios-charcoal mb-6">
            Explore by Category
          </h2>
          <p className="text-xl text-naios-charcoal/60 font-light max-w-2xl mx-auto">
            Four pillars of Mediterranean craftsmanship, curated for discerning
            B2B buyers
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-naios-sand"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIndex === idx ? "scale-110" : "scale-100"
                  }`}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-naios-navy/90 via-naios-navy/50 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    {category.emoji}
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-naios-sand/90 italic text-lg mb-4 font-light">
                    {category.subtitle}
                  </p>
                  <p className="text-white/90 text-base mb-6 font-light leading-relaxed">
                    {category.description}
                  </p>

                  {/* Subcategories */}
                  <div
                    className={`flex flex-wrap gap-2 transition-all duration-300 ${
                      hoveredIndex === idx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {category.subcategories.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/30"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
