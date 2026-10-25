import type { ReactNode } from "react";

import type { Tables } from "@/types/database";

export interface FooterLegalLink {
  label: string;
  href: string;
}

export interface FooterSocialItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  hoverColorClass: string;
}

export interface FooterProps {
  settings?: Tables<"event_settings"> | null;
  className?: string;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}
