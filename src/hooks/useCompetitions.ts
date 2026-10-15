import { useCallback, useEffect, useState } from "react";

import type { Tables } from "@/types/database";
import { supabase } from "@/utils/supabase";

export interface CompetitionsState {
  competitions: Tables<"competitions">[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Loads every competition row for the admin "Lomba" module, newest first.
 */
export function useCompetitions(): CompetitionsState {
  const [competitions, setCompetitions] = useState<Tables<"competitions">[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error: loadError } = await supabase
        .from("competitions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isActive) {
        return;
      }

      if (loadError) {
        setError("Gagal memuat daftar lomba. Coba lagi.");
        setIsLoading(false);
        return;
      }

      setCompetitions(data ?? []);
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

  return { competitions, isLoading, error, refetch };
}
