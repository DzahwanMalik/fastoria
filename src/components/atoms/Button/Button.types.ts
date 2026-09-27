import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "lime";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
  "aria-label"?: string;
}
