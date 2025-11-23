'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden grain-overlay">
      {/* Background Image with Parallax Effect */}
      <div 
        className={`absolute inset-0 transition-transform duration-1000 ${
          isLoaded ? 'scale-100' : 'scale-105'
        }`}
      >
        <img
          src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=2000&q=80"
          alt="Artisan hands crafting"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-naios-navy/60 via-naios-navy/40 to-naios-navy/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div 
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full mb-8 border border-white/20">
          <span className="w-2 h-2 bg-naios-terracotta rounded-full animate-pulse"></span>
          <span className="font-sans text-sm tracking-wide">B2B Cultural Commerce Platform</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-white mb-6">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
            Where Culture
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-naios-terracotta via-naios-sand to-naios-clay bg-clip-text text-transparent">
            Becomes Commerce
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
          Connecting Mediterranean artisans with global buyers through 
          <span className="text-naios-terracotta font-medium"> AI-powered matching</span>, 
          cultural translation, and heritage preservation
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup?type=producer" className="w-full sm:w-auto">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-naios-terracotta hover:bg-naios-terracotta-dark text-white font-sans font-semibold text-lg px-10 py-7 rounded-sm shadow-2xl shadow-naios-terracotta/30 hover:shadow-naios-terracotta/50 transition-all duration-300"
            >
              <span className="mr-3">🏺</span>
              I'm an Artisan
            </Button>
          </Link>
          <Link href="/signup?type=buyer" className="w-full sm:w-auto">
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-naios-navy font-sans font-semibold text-lg px-10 py-7 rounded-sm transition-all duration-300"
            >
              <span className="mr-3">🌍</span>
              I'm a Buyer
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}