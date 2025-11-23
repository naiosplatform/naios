"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-naios-sand"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-3xl transform group-hover:rotate-12 transition-transform">
            ⚡
          </span>
          <span
            className={`text-2xl font-serif font-bold transition-colors ${
              isScrolled ? "text-naios-charcoal" : "text-white"
            }`}
          >
            Naios
          </span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className={`font-sans text-sm font-medium transition-colors hover:text-naios-terracotta ${
              isScrolled ? "text-naios-charcoal" : "text-white"
            }`}
          >
            Log In
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className={`font-sans font-semibold rounded-sm transition-all ${
                isScrolled
                  ? "bg-naios-terracotta hover:bg-naios-terracotta-dark text-white"
                  : "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-naios-charcoal"
              }`}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
