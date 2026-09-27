import type { ReactNode } from "react";

export interface FooterSocialLinkProps {
  label: string;
  href: string;
  icon: ReactNode;
  hoverColorClass?: string;
  ariaLabel?: string;
  className?: string;
}
