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
 */
export function formatTimelineDateRange(
  startDateStr: string | Date,
  endDateStr?: string | Date
): string {
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
 * Unified timeline date formatter supporting both single dates and date ranges.
 */
export function formatTimelineDate(step: {
  date?: string | Date;
  startDate?: string | Date;
  endDate?: string | Date;
}): string {
  // If single date
  if (step.date && !step.endDate) {
    const d = new Date(step.date);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getDate()} ${ID_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }

  // If date range
  const startStr = step.startDate ?? step.date;
  if (!startStr) return "";

  return formatTimelineDateRange(startStr, step.endDate);
}
