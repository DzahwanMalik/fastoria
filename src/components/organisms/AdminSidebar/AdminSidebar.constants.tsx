import { FiAward, FiGrid, FiSettings, FiTag } from "react-icons/fi";

import type { AdminNavItem } from "./AdminSidebar.types";

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", to: "/admin", icon: FiGrid },
  { label: "Lomba", to: "/admin/lomba", icon: FiAward, disabled: true },
  { label: "Kategori", to: "/admin/kategori", icon: FiTag, disabled: true },
  { label: "Pengaturan", to: "/admin/pengaturan", icon: FiSettings, disabled: true },
];
