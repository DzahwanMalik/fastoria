import { useCallback, useEffect, useState } from "react";

import type { Tables } from "@/types/database";
import { supabase } from "@/utils/supabase";

export interface EventSettingsState {
  settings: Tables<"event_settings"> | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Loads the singleton `event_settings` row (the schema allows more than one
 * row, so the oldest is treated as the active configuration).
 */
export function useEventSettings(): EventSettingsState {
  const [settings, setSettings] = useState<Tables<"event_settings"> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: loadError } = await supabase
          .from("event_settings")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle();

        if (!isActive) {
          return;
        }

        if (loadError) {
          if (import.meta.env.DEV) {
            console.error("useEventSettings loadError:", loadError);
          }
          setError("Gagal memuat pengaturan event dari server. Coba lagi.");
          setIsLoading(false);
          return;
        }

        setSettings(data);
        setIsLoading(false);
      } catch (err) {
        if (!isActive) {
          return;
        }
        if (import.meta.env.DEV) {
          console.error("useEventSettings network error:", err);
        }
        setError(
          "Koneksi ke server gagal. Periksa koneksi internet Anda lalu coba lagi.",
        );
        setIsLoading(false);
      }
    };

    void load();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  return { settings, isLoading, error, refetch };
}
