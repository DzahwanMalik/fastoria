import type { TimelineStepItem } from "@/components/molecules/TimelineStepCard";

export interface TimelineSectionProps {
  steps?: TimelineStepItem[];
  currentDate?: Date | string;
  onRulebookDownload?: () => void;
  className?: string;
}
