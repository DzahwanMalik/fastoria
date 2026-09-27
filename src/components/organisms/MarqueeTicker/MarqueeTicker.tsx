import type { JSX } from "react";

import type { MarqueeTickerProps } from "./MarqueeTicker.types";

const DEFAULT_TICKER_ITEMS = [
  "✦ UI/UX DESIGN CHALLENGE",
  "✦ FULL-STACK HACKATHON 48-HOURS",
  "✦ BRANDING & VISUAL IDENTITY",
  "✦ BUSINESS PITCH INNOVATION",
  "✦ SERTIFIKAT TINGKAT NASIONAL",
  "✦ TOTAL HADIAH RP 75.000.000",
  "✦ NETWORKING DENGAN TOP TECH LEADERS",
  "✦ MENTORING EKSKLUSIF",
];

export default function MarqueeTicker({
  items = DEFAULT_TICKER_ITEMS,
}: MarqueeTickerProps): JSX.Element {
  return (
    <div className="w-full bg-primary-container border-y-[3px] border-black py-3 overflow-hidden shadow-neo-sm select-none group">
      <div className="ticker-track flex items-center font-label-lg text-sm sm:text-base text-on-surface uppercase tracking-wider font-extrabold">
        {/* Track 1 */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {items.map((item, idx) => (
            <span key={`t1-${idx}`} className="hover:text-tertiary transition-colors">
              {item}
            </span>
          ))}
        </div>
        {/* Track 2 (seamless duplication) */}
        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`t2-${idx}`} className="hover:text-tertiary transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
