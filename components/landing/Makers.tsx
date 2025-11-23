"use client";

import { Card } from "@/components/ui/card";

const makers = [
  {
    name: "Maria Konstantinou",
    region: "Crete, Greece",
    craft: "Extra Virgin Olive Oil",
    story:
      "Third-generation organic farmer preserving ancient grove traditions",
    image:
      "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80",
    years: "47 years",
  },
  {
    name: "Antonio Ferrara",
    region: "Tuscany, Italy",
    craft: "Handmade Ceramics",
    story: "Renaissance techniques meet contemporary design in every piece",
    image:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&q=80",
    years: "32 years",
  },
  {
    name: "Elena Santos",
    region: "Douro Valley, Portugal",
    craft: "Natural Wine",
    story: "Biodynamic viticulture honoring five generations of winemaking",
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80",
    years: "28 years",
  },
  {
    name: "Dimitris Papadakis",
    region: "Rhodes, Greece",
    craft: "Artisan Honey",
    story: "Mountain thyme honey from hives untouched for centuries",
    image:
      "https://images.unsplash.com/photo-1595854341625-f33ce61e5e11?w=600&q=80",
    years: "41 years",
  },
  {
    name: "Sofia Rossi",
    region: "Sicily, Italy",
    craft: "Textile Weaving",
    story: "Ancient loom techniques creating modern Mediterranean textiles",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    years: "25 years",
  },
  {
    name: "Carlos Mendoza",
    region: "Valencia, Spain",
    craft: "Ceramic Art",
    story: "Moorish-inspired designs fired in traditional wood kilns",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    years: "38 years",
  },
];

export function Makers() {
  return (
    <section className="py-32 bg-gradient-to-b from-naios-sand to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-naios-olive/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-naios-terracotta/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-naios-olive via-naios-terracotta to-naios-clay rounded-full"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-naios-charcoal mb-6">
            Meet the Makers
          </h2>
          <p className="text-xl text-naios-charcoal/60 font-light max-w-2xl mx-auto">
            Real artisans. Real heritage. Real stories passed through
            generations.
          </p>
        </div>

        {/* Makers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {makers.map((maker, idx) => (
            <Card
              key={idx}
              className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* Image */}
              <div className="relative aspect-photo overflow-hidden">
                <img
                  src={maker.image}
                  alt={maker.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Years Badge */}
                <div className="absolute top-4 right-4 bg-naios-terracotta text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {maker.years}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-naios-charcoal mb-1">
                  {maker.name}
                </h3>
                <p className="text-sm text-naios-olive font-medium mb-3 tracking-wide">
                  {maker.region}
                </p>
                <p className="text-base text-naios-charcoal font-semibold mb-3">
                  {maker.craft}
                </p>
                <p className="text-sm text-naios-charcoal/70 italic leading-relaxed font-light">
                  "{maker.story}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
