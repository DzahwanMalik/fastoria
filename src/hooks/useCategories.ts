import { useCallback, useEffect, useState } from "react";

import type { Tables } from "@/types/database";
import { supabase } from "@/utils/supabase";

export interface CategoriesState {
  categories: Tables<"categories">[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Loads categories, used to label competitions, to populate the category
 * select in the competition form, and by the "Kategori" admin module.
 */
export function useCategories(): CategoriesState {
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error: loadError } = await supabase
        .from("categories")
        .select("*")
        .order("label", { ascending: true });

      if (!isActive) {
        return;
      }

      if (loadError) {
        setError("Gagal memuat kategori. Coba lagi.");
        setIsLoading(false);
        return;
      }

      setCategories(data ?? []);
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

  return { categories, isLoading, error, refetch };
}
