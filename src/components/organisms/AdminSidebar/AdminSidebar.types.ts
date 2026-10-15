import type { IconType } from "react-icons";

export interface AdminNavItem {
  label: string;
  to: string;
  icon: IconType;
  disabled?: boolean;
}

export interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}
