import { formatTimelineDate } from "@/utils/date";

import type { TimelineStepItem } from "./TimelineStepCard.types";

export { formatTimelineDate };

/**
 * Checks whether a timeline step is currently active based on an optional reference date.
 * - If `step.isActive` is explicitly defined, that boolean is respected.
 * - If `step.endDate` is omitted (single-day event), it checks if `referenceDate`
 *   falls on the same calendar day as `step.startDate`.
 * - If `step.endDate` is provided (date range), it checks if `referenceDate`
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
  if (!step.endDate) {
    const eventDate = new Date(step.startDate);
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
  const start = new Date(step.startDate).getTime();
  const end = new Date(step.endDate).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return false;
  }

  const now = referenceDate.getTime();
  return now >= start && now <= end;
}
