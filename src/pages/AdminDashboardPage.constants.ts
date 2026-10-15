import type { IconType } from "react-icons";
import {
  FiAward,
  FiCreditCard,
  FiPlus,
  FiSettings,
  FiTag,
} from "react-icons/fi";

import type { CardBgColor } from "@/components/atoms/Card";

export type DashboardStatId = "competitions" | "categories" | "prize";

export interface DashboardStatConfig {
  id: DashboardStatId;
  label: string;
  hint: string;
  icon: IconType;
  bgColor: CardBgColor;
}

/**
 * Presentation metadata for the dashboard stat cards. Values are derived from
 * the database in the page, so only labels/colors/icons live here.
 */
export const DASHBOARD_STAT_CONFIGS: DashboardStatConfig[] = [
  {
    id: "competitions",
    label: "Total Lomba",
    hint: "Seluruh kategori",
    icon: FiAward,
    bgColor: "yellow",
  },
  {
    id: "categories",
    label: "Kategori",
    hint: "Cabang perlombaan",
    icon: FiTag,
    bgColor: "lime",
  },
  {
    id: "prize",
    label: "Total Hadiah",
    hint: "Dari pengaturan event",
    icon: FiCreditCard,
    bgColor: "white",
  },
];

export interface QuickActionConfig {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  /** Set when the target admin module exists; renders the tile as a link. */
  to?: string;
  /** Router state forwarded to {@link QuickActionConfig.to}, e.g. to open a form. */
  state?: { create?: boolean };
  disabled?: boolean;
}

/**
 * Shortcut tiles for the dashboard. Tiles without a `to` target stay disabled
 * until the matching admin module (and its route) exists.
 */
export const QUICK_ACTIONS: QuickActionConfig[] = [
  {
    id: "add-competition",
    title: "Tambah Lomba",
    description: "Buka modul lomba dan entri baru pada tabel competitions.",
    icon: FiPlus,
    to: "/admin/lomba",
    state: { create: true },
  },
  {
    id: "manage-categories",
    title: "Kelola Kategori",
    description: "Atur cabang pada tabel categories.",
    icon: FiTag,
    disabled: true,
  },
  {
    id: "event-settings",
    title: "Pengaturan Event",
    description: "Perbarui info dan hadiah pada event_settings.",
    icon: FiSettings,
    disabled: true,
  },
];
