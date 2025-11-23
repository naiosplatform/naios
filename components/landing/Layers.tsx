"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

const layers = [
  {
    number: "01",
    icon: "🎯",
    title: "AI Matching",
    description:
      "Intelligent B2B recommendations connecting authentic producers with ideal buyers",
  },
  {
    number: "02",
    icon: "🗣️",
    title: "Cultural Translation",
    description:
      "Preserve emotion and heritage across 7 languages with AI storytelling",
  },
  {
    number: "03",
    icon: "⚖️",
    title: "Fairness Algorithm",
    description:
      "Discovery boost for new artisans—no monopolies, just equal opportunity",
  },
  {
    number: "04",
    icon: "⭐",
    title: "Trust & Reviews",
    description:
      "Verified buyer testimonials and quality signals build marketplace confidence",
  },
  {
    number: "05",
    icon: "📚",
    title: "Export Playbooks",
    description:
      "Step-by-step guides for customs, documentation, and international shipping",
  },
  {
    number: "06",
    icon: "🎓",
    title: "Producer Enablement",
    description:
      "Transform local artisans into professional exporters with training and resources",
  },
  {
    number: "07",
    icon: "📦",
    title: "Tracking & Provenance",
    description:
      "Transparent order tracking with optional blockchain authenticity certificates",
  },
  {
    number: "08",
    icon: "🌍",
    title: "Multilingual Experience",
    description:
      "Automatic language detection and seamless translation for global accessibility",
  },
  {
    number: "09",
    icon: "✓",
    title: "Authenticity Verification",
    description:
      "Community trust signals and AI-powered authenticity scoring system",
  },
  {
    number: "10",
    icon: "🏛️",
    title: "Heritage Capsules",
    description:
      "AI-powered cultural archives preserving craft stories for future generations",
  },
];

export function Layers() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-naios-navy text-white relative overflow-hidden grain-overlay">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-naios-terracotta via-naios-sand to-naios-clay rounded-full"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            The 10 Naios Layers
          </h2>
          <p className="text-xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            A complete infrastructure for cultural commerce—every layer
            compounds to create an{" "}
            <span className="text-naios-terracotta font-medium">
              unbreakable competitive moat
            </span>
          </p>
        </div>

        {/* Layers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {layers.map((layer, idx) => (
            <Card
              key={idx}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-naios-terracotta/50 transition-all duration-500 cursor-pointer overflow-hidden ${
                idx >= 5 ? "lg:col-span-1" : "lg:col-span-1"
              }`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-naios-terracotta/20 to-naios-olive/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              <div className="relative p-6">
                {/* Number */}
                <div className="text-6xl font-serif font-bold text-white/10 group-hover:text-naios-terracotta/30 transition-colors duration-300 mb-2">
                  {layer.number}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {layer.icon}
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg font-bold text-white mb-3 group-hover:text-naios-terracotta transition-colors">
                  {layer.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {layer.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm font-light italic">
            Estimated time for competitors to replicate all 10 layers:{" "}
            <span className="text-naios-terracotta font-semibold">
              3-4 years
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
