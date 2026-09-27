import type { JSX } from "react";
import { useMemo } from "react";

import Badge from "@/components/atoms/Badge";
import RulebookBanner from "@/components/molecules/RulebookBanner";
import type { TimelineStepItem } from "@/components/molecules/TimelineStepCard";
import TimelineStepCard, {
  isTimelineStepActive,
} from "@/components/molecules/TimelineStepCard";

import { DEFAULT_TIMELINE_STEPS } from "./TimelineSection.constants";
import type { TimelineSectionProps } from "./TimelineSection.types";

export default function TimelineSection({
  steps = DEFAULT_TIMELINE_STEPS,
  currentDate,
  onRulebookDownload,
  className = "",
}: TimelineSectionProps): JSX.Element {
  const referenceDate = useMemo(() => {
    if (!currentDate) return new Date();
    return typeof currentDate === "string" ? new Date(currentDate) : currentDate;
  }, [currentDate]);

  return (
    <section
      id="timeline"
      className={`w-full bg-surface-white border-y-[3px] border-black py-16 scroll-mt-24 ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            color="electric-cyan"
            rotate="right"
            shadow="xs"
            className="mb-3"
          >
            AGENDA RESMI
          </Badge>

          <h2 className="font-headline-xl text-headline-xl text-on-surface uppercase">
            TIMELINE &amp; JADWAL PERLOMBAAN
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Catat setiap milestone penting agar tim kamu tidak melewatkan tenggat
            pengumpulan berkas dan penjurian.
          </p>
        </div>

        {/* 5-Step Horizontal/Responsive Stepper Grid with Conditional Active State */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step: TimelineStepItem) => {
            const isActive = isTimelineStepActive(step, referenceDate);
            return (
              <TimelineStepCard
                key={step.stepNumber}
                step={step}
                isActive={isActive}
              />
            );
          })}
        </div>

        {/* Rulebook Download Banner */}
        <RulebookBanner onDownloadClick={onRulebookDownload} />
      </div>
    </section>
  );
}
