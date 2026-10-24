import { useCallback, useEffect, useState } from "react";

import defaultBanner from "@/assets/images/competitions/uiux-design.png";
import type {
  CompetitionFilterTab,
  CompetitionItem,
} from "@/components/molecules/CompetitionCard";
import type { Tables } from "@/types/database";
import { formatRupiah } from "@/utils/currency";
import { supabase } from "@/utils/supabase";

export interface CompetitionWithCategory extends Tables<"competitions"> {
  categories?: {
    id: string;
    slug: string;
    label: string;
  } | null;
}

export interface LandingCompetitionsState {
  competitions: CompetitionItem[];
  categories: CompetitionFilterTab[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const toCompetitionItem = (
  comp: CompetitionWithCategory,
): CompetitionItem => {
  const categoryLabel = comp.categories?.label ?? "UMUM";
  const categorySlug = comp.categories?.slug ?? "all";

  const tags: string[] = [categoryLabel];
  if (comp.teams && comp.teams > 1) {
    tags.push(`TIM ${comp.teams} ORANG`);
  } else {
    tags.push("INDIVIDU");
  }

  return {
    id: comp.id,
    categoryId: comp.category_id,
    categorySlug,
    categoryLabel,
    title: comp.title,
    description: comp.description,
    imageSrc: comp.image_url?.trim() || defaultBanner,
    imageAlt: comp.title,
    tags,
    fee: formatRupiah(comp.registration_fee),
    feeUnit: comp.teams && comp.teams > 1 ? "/ Tim" : "/ Orang",
    registrationLink: comp.registration_link,
    guidebookUrl: comp.guidebook_link,
    slotBadgeLabel: "SLOT TERBATAS",
  };
};

export function useLandingCompetitions(): LandingCompetitionsState {
  const [competitions, setCompetitions] = useState<CompetitionItem[]>([]);
  const [categories, setCategories] = useState<CompetitionFilterTab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [compRes, catRes] = await Promise.all([
          supabase
            .from("competitions")
            .select("*, categories(id, slug, label)")
            .order("created_at", { ascending: true }),
          supabase
            .from("categories")
            .select("*")
            .order("created_at", { ascending: true }),
        ]);

        if (!isActive) {
          return;
        }

        if (compRes.error || catRes.error) {
          const loadErr = compRes.error ?? catRes.error;
          if (import.meta.env.DEV) {
            console.error("useLandingCompetitions error:", loadErr);
          }
          setError("Gagal memuat daftar perlombaan dari server. Coba lagi.");
          setIsLoading(false);
          return;
        }

        const compItems = (compRes.data as CompetitionWithCategory[] ?? []).map(
          toCompetitionItem,
        );

        const catTabs: CompetitionFilterTab[] = [
          { id: "all", label: "SEMUA KATEGORI" },
          ...(catRes.data ?? []).map((cat) => ({
            id: cat.slug || cat.id,
            label: cat.label.toUpperCase(),
          })),
        ];

        setCompetitions(compItems);
        setCategories(catTabs);
        setIsLoading(false);
      } catch (err) {
        if (!isActive) {
          return;
        }
        if (import.meta.env.DEV) {
          console.error("useLandingCompetitions exception:", err);
        }
        setError(
          "Koneksi ke server gagal saat memuat lomba. Periksa koneksi internet Anda.",
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

  return { competitions, categories, isLoading, error, refetch };
}
