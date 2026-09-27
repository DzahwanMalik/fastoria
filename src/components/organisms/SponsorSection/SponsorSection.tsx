import type { JSX } from "react";

import SponsorLogo from "@/components/molecules/SponsorLogo";

import { DEFAULT_SPONSORS } from "./SponsorSection.constants";
import type { SponsorSectionProps } from "./SponsorSection.types";

export default function SponsorSection({
  title = "// DIDUKUNG OLEH MITRA INDUSTRI & MEDIA //",
  className = "",
}: SponsorSectionProps): JSX.Element {
  // Duplicate sponsors within each track to ensure seamless infinite looping on ultra-wide displays
  const trackSponsors = [...DEFAULT_SPONSORS, ...DEFAULT_SPONSORS];

  return (
    <section
      id="sponsor"
      aria-label="Mitra & Sponsor"
      className={`w-full bg-surface-white border-t-[3px] border-black py-12 overflow-hidden select-none ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <span className="font-label-md text-xs sm:text-sm text-on-surface-variant tracking-widest uppercase font-bold">
          {title}
        </span>
      </div>

      <div className="w-full overflow-hidden group py-4">
        <div className="ticker-track flex items-center py-2">
          {/* Track 1 */}
          <div className="flex items-center gap-12 sm:gap-16 lg:gap-20 shrink-0 pr-12 sm:pr-16 lg:pr-20">
            {trackSponsors.map((sponsor, idx) => (
              <SponsorLogo
                key={`sponsor-t1-${sponsor.id}-${idx}`}
                name={sponsor.name}
                url={sponsor.url}
              >
                {sponsor.logo}
              </SponsorLogo>
            ))}
          </div>

          {/* Track 2 (seamless duplication for infinite loop) */}
          <div
            className="flex items-center gap-12 sm:gap-16 lg:gap-20 shrink-0 pr-12 sm:pr-16 lg:pr-20"
            aria-hidden="true"
          >
            {trackSponsors.map((sponsor, idx) => (
              <SponsorLogo
                key={`sponsor-t2-${sponsor.id}-${idx}`}
                name={sponsor.name}
                url={sponsor.url}
              >
                {sponsor.logo}
              </SponsorLogo>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
