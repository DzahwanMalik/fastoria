import type { JSX } from "react";

import type {
  CardBgColor,
  CardBorderWidth,
  CardProps,
  CardShadowSize,
} from "./Card.types";

const BG_COLOR_MAP: Record<CardBgColor, string> = {
  white: "bg-surface-white",
  canvas: "bg-canvas-bg",
  yellow: "bg-electric-yellow",
  lime: "bg-primary-container",
  coral: "bg-punch-coral",
  tertiary: "bg-tertiary-container",
  container: "bg-surface-container",
  transparent: "bg-transparent",
};

const SHADOW_MAP: Record<CardShadowSize, string> = {
  none: "",
  xs: "shadow-neo-xs",
  sm: "shadow-neo-sm",
  md: "shadow-neo-md",
  lg: "shadow-neo-lg",
  xl: "shadow-neo-xl",
};

const BORDER_WIDTH_MAP: Record<CardBorderWidth, string> = {
  thin: "border-2 border-black",
  normal: "border-[2.5px] border-black",
  thick: "border-[3px] border-black",
};

export default function Card({
  children,
  bgColor = "white",
  shadow = "lg",
  borderWidth = "normal",
  className = "",
  ref,
  ...restProps
}: CardProps): JSX.Element {
  const bgClass = BG_COLOR_MAP[bgColor];
  const shadowClass = SHADOW_MAP[shadow];
  const borderClass = BORDER_WIDTH_MAP[borderWidth];

  const combinedClasses = `${bgClass} ${borderClass} ${shadowClass} ${className}`.trim();

  return (
    <div ref={ref} className={combinedClasses} {...restProps}>
      {children}
    </div>
  );
}
