import type { ReactNode } from "react";

export interface SponsorLogoProps {
  name: string;
  children: ReactNode;
  url?: string;
  className?: string;
}
