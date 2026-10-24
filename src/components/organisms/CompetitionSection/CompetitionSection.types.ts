import type {
  CompetitionFilterTab,
  CompetitionItem,
} from "@/components/molecules/CompetitionCard";

export type { CompetitionFilterTab };

export interface CompetitionSectionProps {
  competitions?: CompetitionItem[];
  categories?: CompetitionFilterTab[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onRegisterClick?: (competition: CompetitionItem) => void;
  onGuidebookClick?: (competition: CompetitionItem) => void;
  className?: string;
}
