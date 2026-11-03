import { MONTH_NAMES } from "./DatePicker.constants";

export interface ParsedDate {
  year: number;
  month: number;
  day: number;
}

export interface CalendarCell {
  year: number;
  month: number;
  day: number;
  iso: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

export function parseIsoDate(val?: string): ParsedDate | null {
  if (!val) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(val.trim());
  if (!match) return null;
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return null;
  }
  return { year, month, day };
}

export function formatIsoDate(year: number, month: number, day: number): string {
  const y = String(year).padStart(4, "0");
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(val?: string): string {
  const parts = parseIsoDate(val);
  if (!parts) return "";
  return `${parts.day} ${MONTH_NAMES[parts.month]} ${parts.year}`;
}

export function generateCalendarDays(
  viewYear: number,
  viewMonth: number,
  selectedIso: string,
  minIso?: string,
  maxIso?: string,
): CalendarCell[] {
  const today = new Date();
  const todayIso = formatIsoDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells: CalendarCell[] = [];

  // Trailing days from previous month
  const prevMonthIndex = viewMonth === 0 ? 11 : viewMonth - 1;
  const prevMonthYear = viewMonth === 0 ? viewYear - 1 : viewYear;
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const iso = formatIsoDate(prevMonthYear, prevMonthIndex, day);
    const isDisabled = Boolean(
      (minIso && iso < minIso) || (maxIso && iso > maxIso),
    );
    cells.push({
      year: prevMonthYear,
      month: prevMonthIndex,
      day,
      iso,
      isCurrentMonth: false,
      isToday: iso === todayIso,
      isSelected: iso === selectedIso,
      isDisabled,
    });
  }

  // Days in current month
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const iso = formatIsoDate(viewYear, viewMonth, day);
    const isDisabled = Boolean(
      (minIso && iso < minIso) || (maxIso && iso > maxIso),
    );
    cells.push({
      year: viewYear,
      month: viewMonth,
      day,
      iso,
      isCurrentMonth: true,
      isToday: iso === todayIso,
      isSelected: iso === selectedIso,
      isDisabled,
    });
  }

  // Leading days from next month to complete the 7-column row
  const remainder = cells.length % 7;
  if (remainder > 0) {
    const nextMonthDays = 7 - remainder;
    const nextMonthIndex = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    for (let day = 1; day <= nextMonthDays; day++) {
      const iso = formatIsoDate(nextMonthYear, nextMonthIndex, day);
      const isDisabled = Boolean(
        (minIso && iso < minIso) || (maxIso && iso > maxIso),
      );
      cells.push({
        year: nextMonthYear,
        month: nextMonthIndex,
        day,
        iso,
        isCurrentMonth: false,
        isToday: iso === todayIso,
        isSelected: iso === selectedIso,
        isDisabled,
      });
    }
  }

  return cells;
}
