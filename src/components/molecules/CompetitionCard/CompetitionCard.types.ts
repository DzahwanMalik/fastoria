export type CompetitionCategory = "all" | "design" | "tech" | "business";

export interface CompetitionItem {
  id: string;
  category: "design" | "tech" | "business";
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
  fee: string;
  feeUnit: string;
  slotBadgeLabel?: string;
  guidebookUrl?: string;
}

export interface CompetitionCardProps {
  competition: CompetitionItem;
  onRegisterClick?: (competition: CompetitionItem) => void;
  onGuidebookClick?: (competition: CompetitionItem) => void;
  className?: string;
}
