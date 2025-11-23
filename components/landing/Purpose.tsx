export function Purpose() {
  return (
    <section className="py-32 bg-naios-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-naios-olive/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-naios-terracotta/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6">
          <div className="w-16 h-1 bg-gradient-to-r from-naios-olive via-naios-terracotta to-naios-clay rounded-full"></div>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-naios-charcoal mb-8 leading-tight">
          Preserving heritage through
          <br />
          <span className="text-naios-olive">modern technology</span>
        </h2>

        <div className="space-y-6 text-lg md:text-xl text-naios-charcoal/70 leading-relaxed max-w-3xl mx-auto">
          <p className="font-light">
            Naios is not a marketplace. It's a{" "}
            <span className="font-medium text-naios-terracotta">
              cultural infrastructure
            </span>{" "}
            that empowers Mediterranean artisans to reach global B2B buyers
            while preserving the authenticity and soul of their craft.
          </p>
          <p className="font-light">
            Through AI-powered translation that respects cultural nuance,
            algorithmic fairness that levels the playing field, and
            comprehensive export support, we're building the future of{" "}
            <span className="font-medium text-naios-olive">
              heritage commerce
            </span>
            .
          </p>
          <p className="font-light">
            Every transaction preserves a tradition. Every connection honors
            centuries of craftsmanship.
          </p>
        </div>
      </div>
    </section>
  );
}
