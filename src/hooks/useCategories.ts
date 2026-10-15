import { useEffect, useState } from "react";

import type { Tables } from "@/types/database";
import { supabase } from "@/utils/supabase";

export interface CategoriesState {
  categories: Tables<"categories">[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Loads categories, used both to label competitions and to populate the
 * category select in the competition form.
 */
export function useCategories(): CategoriesState {
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("Gagal memuat kategori.");
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
  }, []);

  return { categories, isLoading, error };
}
