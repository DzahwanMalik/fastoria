import type {
  CompetitionFilterTab,
  CompetitionItem,
} from "@/components/molecules/CompetitionCard";

export type { CompetitionFilterTab };

export interface CompetitionSectionProps {
  competitions?: CompetitionItem[];
  categories?: CompetitionFilterTab[];
  className?: string;
}
