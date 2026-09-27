import type { HTMLAttributes, ReactNode, Ref } from "react";

export type CardBgColor =
  | "white"
  | "canvas"
  | "yellow"
  | "lime"
  | "coral"
  | "tertiary"
  | "container"
  | "transparent";

export type CardShadowSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type CardBorderWidth = "thin" | "normal" | "thick";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  bgColor?: CardBgColor;
  shadow?: CardShadowSize;
  borderWidth?: CardBorderWidth;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}
