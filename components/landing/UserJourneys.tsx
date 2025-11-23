"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function UserJourneys() {
  const artisanJourney = [
    {
      step: "01",
      title: "Share Your Story",
      description:
        "Tell your craft's heritage in your native language—Greek, Italian, Spanish, or any of our 7 supported languages",
    },
    {
      step: "02",
      title: "AI Translation Magic",
      description:
        "Our cultural AI preserves your story's emotion while translating to 6 additional languages automatically",
    },
    {
      step: "03",
      title: "Global Discovery",
      description:
        "Get matched with B2B buyers worldwide through intelligent algorithms and fairness-first visibility",
    },
    {
      step: "04",
      title: "Export with Confidence",
      description:
        "Ship internationally using our step-by-step playbooks, templates, and producer enablement resources",
    },
  ];

  const buyerJourney = [
    {
      step: "01",
      title: "Define Your Needs",
      description:
        "Describe the authentic products you seek—quality, origin, volume, and cultural authenticity criteria",
    },
    {
      step: "02",
      title: "AI-Powered Matching",
      description:
        "Our algorithms analyze thousands of artisan profiles to surface perfect matches based on your requirements",
    },
    {
      step: "03",
      title: "Verify & Connect",
      description:
        "Review detailed producer stories, verified ratings, and heritage authenticity before direct contact",
    },
    {
      step: "04",
      title: "Order & Track",
      description:
        "Place orders, monitor shipping status, and build long-term relationships with trusted makers",
    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-naios-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-naios-olive/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-naios-olive via-naios-terracotta to-naios-clay rounded-full"></div>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-naios-charcoal mb-6">
            Your Journey on Naios
          </h2>
          <p className="text-xl text-naios-charcoal/60 font-light max-w-2xl mx-auto">
            Two paths. One mission: preserving Mediterranean heritage through
            global commerce.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Artisans */}
          <Card className="relative bg-gradient-to-br from-naios-terracotta/5 to-naios-terracotta/10 border-2 border-naios-terracotta/20 p-10 shadow-xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 text-[200px] opacity-5 font-serif font-bold text-naios-terracotta">
              🏺
            </div>

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="text-5xl">🏺</div>
                <div>
                  <h3 className="font-serif text-3xl font-bold text-naios-charcoal">
                    For Artisans
                  </h3>
                  <p className="text-naios-terracotta font-medium">
                    χειροτέχνες
                  </p>
                </div>
              </div>

              {/* Journey Steps */}
              <div className="space-y-6 mb-8">
                {artisanJourney.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-naios-terracotta text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-sans font-bold text-naios-charcoal mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-sm text-naios-charcoal/70 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/signup?type=producer" className="block">
                <Button className="w-full bg-naios-terracotta hover:bg-naios-terracotta-dark text-white font-semibold py-6 text-lg rounded-sm shadow-lg">
                  Start Your Journey
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </div>
          </Card>

          {/* For Buyers */}
          <Card className="relative bg-gradient-to-br from-naios-olive/5 to-naios-olive/10 border-2 border-naios-olive/20 p-10 shadow-xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 text-[200px] opacity-5 font-serif font-bold text-naios-olive">
              🌍
            </div>

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="text-5xl">🌍</div>
                <div>
                  <h3 className="font-serif text-3xl font-bold text-naios-charcoal">
                    For Buyers
                  </h3>
                  <p className="text-naios-olive font-medium">αγοραστές</p>
                </div>
              </div>

              {/* Journey Steps */}
              <div className="space-y-6 mb-8">
                {buyerJourney.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-naios-olive text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-sans font-bold text-naios-charcoal mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-sm text-naios-charcoal/70 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/signup?type=buyer" className="block">
                <Button className="w-full bg-naios-olive hover:bg-naios-olive-dark text-white font-semibold py-6 text-lg rounded-sm shadow-lg">
                  Start Discovering
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
