import type { JSX } from "react";

import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  target,
  rel,
  ariaLabel,
  "aria-label": ariaLabelProp,
}: ButtonProps): JSX.Element {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 uppercase tracking-wider font-bold transition-all cursor-pointer select-none font-headline-sm";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs border-2 border-black shadow-neo-xs hover:-translate-x-px hover:-translate-y-px hover:shadow-neo-sm active:translate-x-px active:translate-y-px active:shadow-none",
    md: "px-5 py-2.5 text-xs sm:text-sm border-[2.5px] border-black shadow-neo-md hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-xs",
    lg: "px-6 py-3.5 text-sm sm:text-base border-[2.5px] border-black shadow-neo-md hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-xs",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-electric-yellow text-on-surface hover:bg-primary-container",
    secondary: "bg-surface-white text-on-surface hover:bg-surface-container",
    danger: "bg-punch-coral text-surface-white hover:bg-tertiary",
    ghost: "bg-transparent text-on-surface hover:bg-surface-container-low border-none shadow-none",
    lime: "bg-primary-container text-on-surface hover:bg-electric-yellow",
    mint: "bg-vivid-mint text-on-surface hover:bg-primary-container",
    cyan: "bg-electric-cyan text-on-surface hover:bg-electric-yellow",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();
  const label = ariaLabel ?? ariaLabelProp;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={label}
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={label}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
