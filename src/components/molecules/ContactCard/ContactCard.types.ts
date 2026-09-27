import type { ButtonVariant } from "@/components/atoms/Button";

export interface ContactCardItem {
  id: string;
  categoryTag: string;
  iconName: string;
  iconColorClass?: string;
  name: string;
  description: string;
  contactValue: string;
  actionLabel: string;
  actionHref: string;
  actionVariant?: ButtonVariant;
}

export interface ContactCardProps {
  contact: ContactCardItem;
  className?: string;
}
