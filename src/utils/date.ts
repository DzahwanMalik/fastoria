const ID_MONTHS = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER",
];

/**
 * Parses a Date or string safely into calendar year, month, and day.
 * When given a pure YYYY-MM-DD string, extracts parts directly to avoid UTC-offset timezone shifts.
 */
function parseDateParts(
  value?: string | Date
): { day: number; month: number; year: number } | null {
  if (!value) return null;
  if (typeof value === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
    if (match) {
      return {
        year: parseInt(match[1], 10),
        month: parseInt(match[2], 10) - 1,
        day: parseInt(match[3], 10),
      };
    }
  }
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return null;
  return {
    year: d.getFullYear(),
    month: d.getMonth(),
    day: d.getDate(),
  };
}

/**
 * Formats a startDate and optional endDate timestamptz into standard uppercase Indonesian date strings.
 * Supports both single dates ("5 OKTOBER 2026") and ranges ("1 - 30 SEPTEMBER 2026").
 */
export function formatTimelineDate(
  startDateStr?: string | Date,
  endDateStr?: string | Date
): string {
  const startParts = parseDateParts(startDateStr);
  if (!startParts) {
    return "";
  }

  const startDay = startParts.day;
  const startMonth = ID_MONTHS[startParts.month];
  const startYear = startParts.year;

  if (!endDateStr) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  const endParts = parseDateParts(endDateStr);
  if (!endParts) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  const endDay = endParts.day;
  const endMonth = ID_MONTHS[endParts.month];
  const endYear = endParts.year;

  // Same single day
  if (
    startDay === endDay &&
    startMonth === endMonth &&
    startYear === endYear
  ) {
    return `${endDay} ${endMonth} ${endYear}`;
  }

  // Same month & year: "1 - 30 SEPTEMBER 2026"
  if (startMonth === endMonth && startYear === endYear) {
    return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
  }

  // Different month, same year: "28 FEBRUARI - 5 MARET 2026"
  if (startYear === endYear) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
  }

  // Different year
  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
}

/**
 * Formats a timestamptz into a readable Indonesian date + time string,
 * e.g. "15 Oktober 2026 pukul 22.27". Returns an empty string for invalid
 * input so callers can omit the line entirely.
 */
export function formatDateTime(value?: string | Date): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const datePart = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return `${datePart} pukul ${timePart}`;
}
