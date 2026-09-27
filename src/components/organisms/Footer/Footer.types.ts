import type { ReactNode } from "react";

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
  className?: string;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}
