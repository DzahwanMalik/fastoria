import type { HTMLAttributes, ReactNode, Ref } from "react";

export type BadgeColor =
  | "electric-yellow"
  | "soft-lilac"
  | "punch-coral"
  | "vivid-mint"
  | "electric-cyan"
  | "lime"
  | "secondary"
  | "white"
  | "surface-container";

export type BadgeSize = "sm" | "md" | "lg" | "inherit";

export type BadgeShadow = "none" | "xs" | "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  color?: BadgeColor;
  size?: BadgeSize;
  shadow?: BadgeShadow;
  rotate?: "none" | "left" | "right";
  borderWidth?: "normal" | "thick";
  pulse?: boolean;
  children: ReactNode;
  className?: string;
  as?: "span" | "div";
  ref?: Ref<HTMLElement>;
}
