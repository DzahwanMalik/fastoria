import type { JSX } from "react";

import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { formatTimelineDate } from "@/utils/date";

import type { TimelineStepCardProps } from "./TimelineStepCard.types";

export default function TimelineStepCard({
  step,
  isActive: isActiveProp,
  className = "",
}: TimelineStepCardProps): JSX.Element {
  const active = isActiveProp ?? step.isActive ?? false;

  const cardBgColor = active ? "yellow" : (step.bgColor ?? "white");
  const numberBgColor = active ? "white" : (step.numberBgColor ?? "container");
  const dateColorClass = active
    ? "text-on-surface font-black"
    : (step.dateColorClass ?? "text-on-surface-variant font-bold");
  const descColorClass = active ? "text-on-surface" : "text-on-surface-variant";
  const shadow = active ? "lg" : "md";

  const formattedDate = formatTimelineDate(step);

  return (
    <Card
      bgColor={cardBgColor}
      borderWidth="normal"
      shadow={shadow}
      className={`p-5 flex flex-col justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-neo-lg ${className}`.trim()}
    >
      <div>
        {/* Step Number Indicator */}
        <Card
          bgColor={numberBgColor}
          borderWidth="thin"
          shadow="xs"
          className="w-8 h-8 flex items-center justify-center font-headline-sm text-headline-sm mb-4"
        >
          {step.stepNumber}
        </Card>

        {/* Milestone Date (Auto-formatted for single date or range) */}
        <span
          className={`font-label-caps text-label-caps block uppercase ${dateColorClass}`}
        >
          {formattedDate}
        </span>

        {/* Milestone Title */}
        <h4 className="font-headline-sm text-headline-sm text-on-surface uppercase mt-1 mb-2">
          {step.title}
        </h4>

        {/* Milestone Description */}
        <p className={`font-body-sm text-body-sm ${descColorClass}`}>
          {step.description}
        </p>
      </div>

      {/* Dynamic Phase Status Badge */}
      {active ? (
        <div className="mt-4">
          <Badge
            color="white"
            size="sm"
            pulse
            shadow="none"
            borderWidth="normal"
          >
            SEDANG BERLANGSUNG
          </Badge>
        </div>
      ) : (
        step.badge &&
        step.badge.label !== "SEDANG BERLANGSUNG" && (
          <div className="mt-4">
            <Badge
              color={step.badge.color}
              size="sm"
              shadow="none"
              borderWidth="normal"
            >
              {step.badge.label}
            </Badge>
          </div>
        )
      )}
    </Card>
  );
}
