import type { BadgeColor } from "@/components/atoms/Badge";

export type CompetitionCategory = "all" | "design" | "tech" | "business";

export interface CompetitionSlotBadge {
  label: string;
  color: BadgeColor;
}

export interface CompetitionItem {
  id: string;
  category: "design" | "tech" | "business";
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageBgColor: string;
  tags: string[];
  fee: string;
  feeUnit: string;
  slotBadge: CompetitionSlotBadge;
  guidebookUrl?: string;
}

export interface CompetitionCardProps {
  competition: CompetitionItem;
  onRegisterClick?: (competition: CompetitionItem) => void;
  onGuidebookClick?: (competition: CompetitionItem) => void;
  className?: string;
}
