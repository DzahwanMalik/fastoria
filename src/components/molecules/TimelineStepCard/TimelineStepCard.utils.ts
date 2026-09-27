import { formatTimelineDate, formatTimelineDateRange } from "@/utils/date";

import type { TimelineStepItem } from "./TimelineStepCard.types";

export { formatTimelineDate, formatTimelineDateRange };

/**
 * Checks whether a timeline step is currently active based on an optional reference date.
 * - If `step.isActive` is explicitly defined, that boolean is respected.
 * - If `step.date` is provided without `endDate` (single-day event), it checks if `referenceDate`
 *   falls on the same calendar day.
 * - If `startDate` and/or `endDate` are provided (date range), it checks if `referenceDate`
 *   falls within [startDate, endDate].
 */
export function isTimelineStepActive(
  step: TimelineStepItem,
  referenceDate: Date = new Date()
): boolean {
  if (typeof step.isActive === "boolean") {
    return step.isActive;
  }

  // Single date event (match calendar day)
  if (step.date && !step.endDate) {
    const eventDate = new Date(step.date);
    if (Number.isNaN(eventDate.getTime())) {
      return false;
    }

    return (
      referenceDate.getFullYear() === eventDate.getFullYear() &&
      referenceDate.getMonth() === eventDate.getMonth() &&
      referenceDate.getDate() === eventDate.getDate()
    );
  }

  // Date range event
  const startStr = step.startDate ?? step.date;
  if (!startStr && !step.endDate) {
    return false;
  }

  const now = referenceDate.getTime();
  const start = startStr ? new Date(startStr).getTime() : -Infinity;
  const end = step.endDate ? new Date(step.endDate).getTime() : Infinity;

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return false;
  }

  return now >= start && now <= end;
}
