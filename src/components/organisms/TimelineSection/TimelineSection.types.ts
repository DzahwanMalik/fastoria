import type { TimelineStepItem } from "@/components/molecules/TimelineStepCard";
import type { Tables } from "@/types/database";

export interface TimelineSectionProps {
  settings?: Tables<"event_settings"> | null;
  steps?: TimelineStepItem[];
  currentDate?: Date | string;
  className?: string;
}
