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
 * Formats a startDate and optional endDate timestamptz into standard uppercase Indonesian date strings.
 * Supports both single dates ("5 OKTOBER 2026") and ranges ("1 - 30 SEPTEMBER 2026").
 */
export function formatTimelineDate(
  startDateStr?: string | Date,
  endDateStr?: string | Date
): string {
  if (!startDateStr) {
    return "";
  }

  const start = new Date(startDateStr);
  if (Number.isNaN(start.getTime())) {
    return "";
  }

  const startDay = start.getDate();
  const startMonth = ID_MONTHS[start.getMonth()];
  const startYear = start.getFullYear();

  if (!endDateStr) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  const end = new Date(endDateStr);
  if (Number.isNaN(end.getTime())) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  const endDay = end.getDate();
  const endMonth = ID_MONTHS[end.getMonth()];
  const endYear = end.getFullYear();

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
