"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const element = document.getElementById("final-cta");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="final-cta"
      className="relative py-40 overflow-hidden grain-overlay"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=2000&q=80"
          alt="Mediterranean workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-naios-navy/85 via-naios-navy/75 to-naios-charcoal/90"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Quote Mark */}
        <div className="text-8xl md:text-9xl font-serif text-naios-terracotta/30 leading-none mb-6">
          "
        </div>

        {/* Main Message */}
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Preserve Heritage.
          <br />
          <span className="bg-gradient-to-r from-naios-terracotta via-naios-sand to-naios-clay bg-clip-text text-transparent">
            Build Legacy.
          </span>
        </h2>

        <p className="text-2xl md:text-3xl text-white/90 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
          Every transaction on Naios honors centuries of craftsmanship.
          <br />
          Join the movement connecting culture with commerce.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-naios-terracotta mb-2">
              100+
            </div>
            <div className="text-white/70 text-sm font-light">Artisans</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-naios-sand mb-2">
              7
            </div>
            <div className="text-white/70 text-sm font-light">Languages</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-naios-clay mb-2">
              20+
            </div>
            <div className="text-white/70 text-sm font-light">Countries</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup?type=producer" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-naios-terracotta hover:bg-naios-terracotta-dark text-white font-semibold text-lg px-12 py-7 rounded-sm shadow-2xl shadow-naios-terracotta/30"
            >
              I'm an Artisan
            </Button>
          </Link>
          <Link href="/signup?type=buyer" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-naios-navy font-semibold text-lg px-12 py-7 rounded-sm"
            >
              I'm a Buyer
            </Button>
          </Link>
        </div>

        {/* Small Print */}
        <p className="text-white/50 text-sm mt-12 font-light">
          Free to join. No credit card required. Start preserving heritage
          today.
        </p>
      </div>
    </section>
  );
}
