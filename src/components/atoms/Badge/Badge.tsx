import type { JSX } from "react";

import type {
  BadgeColor,
  BadgeProps,
  BadgeShadow,
  BadgeSize,
} from "./Badge.types";

export default function Badge({
  color = "electric-yellow",
  size = "sm",
  shadow = "xs",
  rotate = "none",
  borderWidth = "normal",
  pulse = false,
  children,
  className = "",
  as: Component = "span",
  ref,
  ...restProps
}: BadgeProps): JSX.Element {
  const colorClasses: Record<BadgeColor, string> = {
    "electric-yellow": "bg-electric-yellow text-on-surface",
    "soft-lilac": "bg-soft-lilac text-on-surface",
    "punch-coral": "bg-punch-coral text-surface-white",
    "vivid-mint": "bg-vivid-mint text-on-surface",
    "electric-cyan": "bg-electric-cyan text-on-surface",
    lime: "bg-primary-container text-on-surface",
    secondary: "bg-secondary text-surface-white",
    white: "bg-surface-white text-on-surface",
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: "text-xs font-label-caps",
    md: "text-sm font-label-caps",
    lg: "text-base font-headline-sm",
    inherit: "text-inherit font-inherit",
  };

  const shadowClasses: Record<BadgeShadow, string> = {
    none: "",
    xs: "shadow-neo-xs",
    sm: "shadow-neo-sm",
    md: "shadow-neo-md",
  };

  const rotateClasses = {
    none: "",
    left: "-rotate-1 sm:-rotate-2",
    right: "rotate-1 sm:rotate-2",
  };

  const borderClass =
    borderWidth === "thick"
      ? "border-[2.5px] border-black"
      : "border-2 border-black";

  return (
    <Component
      ref={ref as never}
      className={`inline-flex items-center gap-2 px-3 py-1 tracking-wider uppercase font-extrabold select-none ${sizeClasses[size]} ${borderClass} ${colorClasses[color]} ${shadowClasses[shadow]} ${rotateClasses[rotate]} ${className}`.trim()}
      {...restProps}
    >
      {pulse && (
        <span className="w-2.5 h-2.5 rounded-full bg-vivid-mint border border-black inline-block animate-pulse shrink-0" />
      )}
      {children}
    </Component>
  );
}
