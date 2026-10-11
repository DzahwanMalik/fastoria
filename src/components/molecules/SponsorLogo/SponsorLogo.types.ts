import type { ReactNode } from "react";

export interface SponsorLogoProps {
  name: string;
  children?: ReactNode;
  logoSrc?: string;
  url?: string;
  className?: string;
}
