"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get user type from query param
  const typeFromQuery = searchParams.get("type") as "producer" | "buyer" | null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: typeFromQuery || ("producer" as "producer" | "buyer"),
  });

  // Update userType when query param changes
  useEffect(() => {
    if (typeFromQuery) {
      setFormData((prev) => ({ ...prev, userType: typeFromQuery }));
    }
  }, [typeFromQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        userType: formData.userType,
      });

      // Redirect to onboarding for producers, dashboard for buyers
      if (formData.userType === "producer") {
        router.push("/onboarding/producer");
      } else {
        router.push("/dashboard/buyer");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-naios-sand to-naios-cream flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md border border-naios-sand-dark">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">⚡</span>
            <span className="text-2xl font-serif font-bold text-naios-charcoal">
              Naios
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-naios-charcoal mb-2">
            Create Account
          </h1>
          <p className="text-naios-charcoal/60">
            {formData.userType === "producer"
              ? "Start your global journey"
              : "Discover authentic artisans"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-naios-charcoal mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-3 border border-naios-sand-dark rounded-sm focus:ring-2 focus:ring-naios-terracotta focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-naios-charcoal mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-naios-sand-dark rounded-sm focus:ring-2 focus:ring-naios-terracotta focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-naios-charcoal mb-2">
              Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 border border-naios-sand-dark rounded-sm focus:ring-2 focus:ring-naios-terracotta focus:border-transparent"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-naios-charcoal mb-2">
              I am a: *
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="producer"
                  checked={formData.userType === "producer"}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: "producer" })
                  }
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-sm text-center transition-all ${
                    formData.userType === "producer"
                      ? "border-naios-terracotta bg-naios-terracotta/5"
                      : "border-naios-sand-dark hover:border-naios-terracotta/50"
                  }`}
                >
                  <div className="text-2xl mb-1">🏺</div>
                  <div className="font-semibold text-naios-charcoal">
                    Producer
                  </div>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="buyer"
                  checked={formData.userType === "buyer"}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: "buyer" })
                  }
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-sm text-center transition-all ${
                    formData.userType === "buyer"
                      ? "border-naios-olive bg-naios-olive/5"
                      : "border-naios-sand-dark hover:border-naios-olive/50"
                  }`}
                >
                  <div className="text-2xl mb-1">🌍</div>
                  <div className="font-semibold text-naios-charcoal">Buyer</div>
                </div>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-6 text-lg rounded-sm shadow-lg transition-all ${
              formData.userType === "producer"
                ? "bg-naios-terracotta hover:bg-naios-terracotta-dark"
                : "bg-naios-olive hover:bg-naios-olive-dark"
            } text-white`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-naios-charcoal/60 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-naios-terracotta hover:text-naios-terracotta-dark font-semibold"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
