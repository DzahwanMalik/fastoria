import type { JSX } from "react";
import { FiClock } from "react-icons/fi";

import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import CountdownCard from "@/components/atoms/CountdownCard";
import { useCountdown } from "@/hooks/useCountdown";

import type { CountdownTimerProps } from "./CountdownTimer.types";

// Default target: 14 days, 8 hours, 40 minutes, 50 seconds from now
const DEFAULT_COUNTDOWN_TARGET =
  Date.now() + (14 * 24 * 3600 + 8 * 3600 + 40 * 60 + 50) * 1000;

export default function CountdownTimer({
  targetTimestamp = DEFAULT_COUNTDOWN_TARGET,
  headerTitle = "Pendaftaran Gelombang 2 Berakhir Dalam:",
  dDayLabel = "H-Day: 25 FEBRUARI 2025",
  className = "",
}: CountdownTimerProps = {}): JSX.Element {
  const { timeLeft, formatNumber } = useCountdown(targetTimestamp);

  return (
    <Card
      bgColor="canvas"
      shadow="md"
      borderWidth="normal"
      className={`mb-8 p-4 sm:p-5 ${className}`.trim()}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <FiClock className="text-tertiary text-lg shrink-0" />
          <span className="font-headline-sm text-xs sm:text-sm uppercase tracking-wide font-bold">
            {headerTitle}
          </span>
        </div>
        <Badge
          color="punch-coral"
          size="sm"
          shadow="xs"
          className="self-start sm:self-auto"
        >
          {dDayLabel}
        </Badge>
      </div>

      <div
        className="grid grid-cols-4 gap-2 sm:gap-3 max-w-lg"
        id="countdown-grid"
      >
        <CountdownCard value={formatNumber(timeLeft.days)} label="HARI" />
        <CountdownCard value={formatNumber(timeLeft.hours)} label="JAM" />
        <CountdownCard value={formatNumber(timeLeft.minutes)} label="MENIT" />
        <CountdownCard
          value={formatNumber(timeLeft.seconds)}
          label="DETIK"
          variant="danger"
          pulse
        />
      </div>
    </Card>
  );
}
