import type { JSX } from "react";
import { useMemo } from "react";

import Badge from "@/components/atoms/Badge";
import type { TimelineStepItem } from "@/components/molecules/TimelineStepCard";
import TimelineStepCard, {
  isTimelineStepActive,
} from "@/components/molecules/TimelineStepCard";
import { toEventSettingsValues } from "@/utils/eventSettings";

import { DEFAULT_TIMELINE_STEPS } from "./TimelineSection.constants";
import type { TimelineSectionProps } from "./TimelineSection.types";

export default function TimelineSection({
  settings,
  steps: propSteps,
  currentDate,
  className = "",
}: TimelineSectionProps = {}): JSX.Element {
  const referenceDate = useMemo(() => currentDate ?? new Date(), [currentDate]);

  const effectiveSteps: TimelineStepItem[] = useMemo(() => {
    if (propSteps) {
      return propSteps;
    }

    if (settings) {
      const values = toEventSettingsValues(settings);
      if (values.timeline.length > 0) {
        return values.timeline.map((item, index) => ({
          stepNumber: Number(item.step) || index + 1,
          title: item.title,
          description: item.description,
          startDate: item.start_date,
          endDate: item.end_date || undefined,
        }));
      }
    }

    return DEFAULT_TIMELINE_STEPS;
  }, [propSteps, settings]);

  const gridColsClass = useMemo(() => {
    const count = effectiveSteps.length;
    if (count <= 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
  }, [effectiveSteps.length]);

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
            pendaftaran, technical meeting, dan hari perlombaan.
          </p>
        </div>

        {/* Stepper Grid with Dynamic Responsive Columns & Active State */}
        <div className={`grid ${gridColsClass} gap-6`}>
          {effectiveSteps.map((step: TimelineStepItem) => {
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
      </div>
    </section>
  );
}
