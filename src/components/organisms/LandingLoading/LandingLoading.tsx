import type { JSX } from "react";

import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { useEventSettings } from "@/hooks/useEventSettings";

import type { LandingLoadingProps } from "./LandingLoading.types";

export default function LandingLoading({
  title = "MEMUAT FASTORIA...",
  message = "Menghubungkan ke server dan menyiapkan data kompetisi terbaru...",
  className = "",
  logoUrl: propLogoUrl,
}: LandingLoadingProps = {}): JSX.Element {
  const { settings } = useEventSettings();
  const logoUrl = propLogoUrl !== undefined ? propLogoUrl : settings?.logo_url;
  const eventName = settings?.event_name || "Fastoria";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`min-h-screen bg-canvas-bg flex items-center justify-center p-4 selection:bg-primary-container selection:text-on-surface ${className}`.trim()}
    >
      <Card
        bgColor="white"
        borderWidth="thick"
        shadow="xl"
        className="max-w-md w-full p-8 text-center relative overflow-hidden"
      >
        <div className="flex justify-center mb-6">
          <Badge color="electric-yellow" rotate="left" borderWidth="thick">
            MEMUAT SISTEM
          </Badge>
        </div>

        {/* Brand Logo Plate */}
        <div className="flex justify-center mb-6">
          <div className="h-16 border-[2.5px] border-black px-4 py-2 bg-surface-white shadow-neo-sm flex items-center justify-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={eventName}
                className="h-full w-auto object-contain block animate-pulse"
              />
            ) : (
              <span className="font-headline-md text-base font-black uppercase tracking-tight animate-pulse">
                THE.FASTORIA
              </span>
            )}
          </div>
        </div>

        {/* Neo-Brutalist Animated Progress Bar */}
        <div className="w-full h-4 border-2 border-black bg-surface-container overflow-hidden mb-6 p-0.5 shadow-neo-xs">
          <div className="h-full bg-primary-container border border-black animate-pulse w-4/5 transition-all duration-500" />
        </div>

        <h2 className="font-headline-md text-xl sm:text-2xl uppercase font-black tracking-tight text-on-surface mb-2">
          {title}
        </h2>

        <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
          {message}
        </p>

        <p className="mt-6 font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">
          FAST &bull; ART &bull; SPORT // THE FASTORIA
        </p>
      </Card>
    </div>
  );
}
