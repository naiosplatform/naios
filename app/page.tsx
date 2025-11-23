import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Purpose } from "@/components/landing/Purpose";
import { Categories } from "@/components/landing/Categories";
import { Makers } from "@/components/landing/Makers";
import { Layers } from "@/components/landing/Layers";
import { UserJourneys } from "@/components/landing/UserJourneys";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-naios-cream">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Purpose Statement */}
      <Purpose />

      {/* Categories Grid */}
      <Categories />

      {/* Meet the Makers */}
      <Makers />

      {/* The 10 Naios Layers */}
      <Layers />

      {/* User Journeys */}
      <UserJourneys />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="bg-naios-charcoal text-white/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">⚡</span>
                <span className="text-2xl font-serif font-bold text-white">
                  Naios
                </span>
              </div>
              <p className="text-white/60 font-light leading-relaxed max-w-md">
                B2B cultural commerce platform connecting Mediterranean artisans
                with global buyers. Preserving heritage through technology.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-sans font-semibold text-white mb-4">
                Platform
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    For Artisans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    For Buyers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-sans font-semibold text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    Mission
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-naios-terracotta transition-colors"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50 font-light">
              © 2025 Naios. Built with ❤️ for Mediterranean artisans.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <span>🇬🇷 Greece</span>
              <span>🇮🇹 Italy</span>
              <span>🇪🇸 Spain</span>
              <span>🇵🇹 Portugal</span>
              <span>🇫🇷 France</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
