import type { JSX } from "react";

import type { FooterSocialLinkProps } from "./FooterSocialLink.types";

export default function FooterSocialLink({
  label,
  href,
  icon,
  hoverColorClass = "hover:bg-electric-yellow",
  ariaLabel,
  className = "",
}: FooterSocialLinkProps): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || label}
      className={`inline-flex items-center gap-2 font-headline-sm text-xs font-bold uppercase tracking-wider bg-surface-white text-on-surface px-3 py-1.5 border-2 border-black shadow-neo-xs hover:-translate-x-px hover:-translate-y-px hover:shadow-neo-sm active:translate-x-px active:translate-y-px active:shadow-none transition-all cursor-pointer select-none ${hoverColorClass} ${className}`.trim()}
    >
      <span className="shrink-0 flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
