import type {
  CompetitionCategory,
  CompetitionItem,
} from "@/components/molecules/CompetitionCard";

export interface CompetitionFilterTab {
  id: CompetitionCategory;
  label: string;
}

export interface CompetitionSectionProps {
  competitions?: CompetitionItem[];
  onRegisterClick?: (competition: CompetitionItem) => void;
  onGuidebookClick?: (competition: CompetitionItem) => void;
  className?: string;
}
