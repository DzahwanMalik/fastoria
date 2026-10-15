import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";

export interface DashboardStats {
  competitions: number;
  categories: number;
  prizePool: number;
}

export interface DashboardStatsState {
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const EMPTY_STATS: DashboardStats = {
  competitions: 0,
  categories: 0,
  prizePool: 0,
};

/**
 * Loads only the aggregate figures the dashboard needs (row counts + prize
 * pool), rather than fetching full rows.
 */
export function useDashboardStats(): DashboardStatsState {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      const [competitionsResult, categoriesResult, eventResult] =
        await Promise.all([
          supabase
            .from("competitions")
            .select("*", { count: "exact", head: true }),
          supabase.from("categories").select("*", { count: "exact", head: true }),
          supabase
            .from("event_settings")
            .select("prize_pool")
            .order("created_at", { ascending: true })
            .limit(1)
            .maybeSingle(),
        ]);

      if (!isActive) {
        return;
      }

      const loadError =
        competitionsResult.error ?? categoriesResult.error ?? eventResult.error;

      if (loadError) {
        setError("Gagal memuat statistik. Coba lagi.");
        setIsLoading(false);
        return;
      }

      setStats({
        competitions: competitionsResult.count ?? 0,
        categories: categoriesResult.count ?? 0,
        prizePool: eventResult.data?.prize_pool ?? 0,
      });
      setIsLoading(false);
    };

    void load();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  return { stats, isLoading, error, refetch };
}
