import { useCallback, useEffect, useState } from "react";

import type { Tables } from "@/types/database";
import { supabase } from "@/utils/supabase";

export interface EventSettingsState {
  settings: Tables<"event_settings"> | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

let cachedSettings: Tables<"event_settings"> | null = null;
let activeRequest: Promise<Tables<"event_settings"> | null> | null = null;
const listeners = new Set<(settings: Tables<"event_settings"> | null) => void>();

async function fetchEventSettings(): Promise<Tables<"event_settings"> | null> {
  if (activeRequest) {
    return activeRequest;
  }

  activeRequest = (async () => {
    try {
      const { data, error } = await supabase
        .from("event_settings")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) {
        if (import.meta.env.DEV) {
          console.error("useEventSettings loadError:", error);
        }
        return null;
      }

      cachedSettings = data;
      listeners.forEach((listener) => listener(data));
      return data;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("useEventSettings network error:", err);
      }
      return null;
    } finally {
      activeRequest = null;
    }
  })();

  return activeRequest;
}

/**
 * Loads the singleton `event_settings` row (the schema allows more than one
 * row, so the oldest is treated as the active configuration).
 */
export function useEventSettings(): EventSettingsState {
  const [settings, setSettings] = useState<Tables<"event_settings"> | null>(
    cachedSettings,
  );
  const [isLoading, setIsLoading] = useState(!cachedSettings);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    void fetchEventSettings().then((data) => {
      setSettings(data);
      setIsLoading(false);
      if (!data && !cachedSettings) {
        setError("Gagal memuat pengaturan event dari server. Coba lagi.");
      }
    });
  }, []);

  useEffect(() => {
    listeners.add(setSettings);

    if (!cachedSettings) {
      void fetchEventSettings().then((data) => {
        setSettings(data);
        setIsLoading(false);
        if (!data) {
          setError("Gagal memuat pengaturan event dari server. Coba lagi.");
        }
      });
    }

    return () => {
      listeners.delete(setSettings);
    };
  }, []);

  return { settings, isLoading, error, refetch };
}
