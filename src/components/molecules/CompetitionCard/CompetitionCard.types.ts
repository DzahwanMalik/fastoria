export type CompetitionCategory = string;

export interface CompetitionFilterTab {
  id: string;
  label: string;
}

export interface CompetitionItem {
  id: string;
  category?: string;
  categoryId?: string | null;
  categorySlug?: string;
  categoryLabel?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
  fee: string;
  feeUnit: string;
  slotBadgeLabel?: string;
  registrationLink?: string;
  guidebookUrl?: string;
}

export interface CompetitionCardProps {
  competition: CompetitionItem;
  onRegisterClick?: (competition: CompetitionItem) => void;
  onGuidebookClick?: (competition: CompetitionItem) => void;
  className?: string;
}
