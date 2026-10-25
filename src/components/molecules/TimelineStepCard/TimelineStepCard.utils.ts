import { formatTimelineDate } from "@/utils/date";

import type { TimelineStepItem } from "./TimelineStepCard.types";

export { formatTimelineDate };

/**
 * Extracts a normalized calendar date string "YYYY-MM-DD" from a string or Date object.
 * When provided a pure date string (e.g. "2026-10-25"), it preserves the exact calendar date
 * without any timezone offset shifts.
 */
export function getCalendarDateStr(
  value?: string | Date | null,
): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
  }

  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Checks whether a timeline step is currently active based on a reference date (defaults to today).
 * - If `step.isActive` is explicitly defined as boolean, that boolean is respected.
 * - If `step.endDate` is omitted (single-day event), it checks if referenceDate falls on the exact calendar day.
 * - If `step.endDate` is provided (date range or single-day range), it checks if referenceDate
 *   falls within [startDate, endDate] inclusive (from start day through the end of the end day).
 */
export function isTimelineStepActive(
  step: TimelineStepItem,
  referenceDate: Date | string = new Date(),
): boolean {
  if (typeof step.isActive === "boolean") {
    return step.isActive;
  }

  const refDateStr = getCalendarDateStr(referenceDate);
  const startDateStr = getCalendarDateStr(step.startDate);
  const endDateStr = getCalendarDateStr(step.endDate);

  if (!refDateStr || !startDateStr) {
    return false;
  }

  // Single date event (match calendar day)
  if (!endDateStr) {
    return refDateStr === startDateStr;
  }

  // Date range event (inclusive of start date and end date)
  const minDate = startDateStr <= endDateStr ? startDateStr : endDateStr;
  const maxDate = startDateStr <= endDateStr ? endDateStr : startDateStr;

  return refDateStr >= minDate && refDateStr <= maxDate;
}
