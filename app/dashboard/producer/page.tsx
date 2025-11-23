"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProducerDashboard() {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalViews: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (!userProfile?.id) return;

    const { data: producer } = await supabase
      .from("producers")
      .select("*")
      .eq("user_id", userProfile.id)
      .single();

    if (producer) {
      setStats({
        totalProducts: 1,
        totalViews: producer.profile_views || 0,
        totalOrders: producer.total_orders || 0,
      });
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">Loading stats...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome Producer!
        </h2>
        <p className="text-gray-600">Manage your profile and products here.</p>
      </div>
    </div>
  );
}
