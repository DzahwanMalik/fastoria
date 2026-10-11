import type { JSX } from "react";

import type { SponsorLogoProps } from "./SponsorLogo.types";

export default function SponsorLogo({
  name,
  children,
  logoSrc,
  url,
  className = "",
}: SponsorLogoProps): JSX.Element {
  const baseClasses =
    "flex items-center justify-center cursor-pointer transition-all duration-300 grayscale contrast-75 opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-125 select-none";

  const combinedClasses = `${baseClasses} ${className}`.trim();

  const content = logoSrc ? (
    <img
      src={logoSrc}
      alt={name}
      className="h-8 w-auto max-w-[140px] object-contain"
      loading="lazy"
    />
  ) : (
    children
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={name}
        aria-label={name}
        className={combinedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <div title={name} aria-label={name} className={combinedClasses}>
      {content}
    </div>
  );
}
