import type { BadgeColor } from "@/components/atoms/Badge";
import type { CardBgColor } from "@/components/atoms/Card";

export interface TimelineStepBadge {
  label: string;
  color: BadgeColor;
}

export interface TimelineStepItem {
  stepNumber: string;
  title: string;
  description: string;
  /**
   * For single-day events (e.g. "2026-10-05T00:00:00+07:00")
   */
  date?: string | Date;
  /**
   * For multi-day range events (e.g. "2026-09-01T00:00:00+07:00")
   */
  startDate?: string | Date;
  /**
   * End boundary for multi-day range events (e.g. "2026-09-30T23:59:59+07:00")
   */
  endDate?: string | Date;
  isActive?: boolean;
  bgColor?: CardBgColor;
  numberBgColor?: CardBgColor;
  dateColorClass?: string;
  badge?: TimelineStepBadge;
  className?: string;
}

export interface TimelineStepCardProps {
  step: TimelineStepItem;
  isActive?: boolean;
  className?: string;
}
