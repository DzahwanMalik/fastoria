export type ContactActionVariant = "whatsapp" | "email";

export interface ContactCardItem {
  id: string;
  categoryTag: string;
  name: string;
  description: string;
  contactValue: string;
  actionLabel: string;
  actionHref: string;
  actionVariant?: ContactActionVariant;
}

export interface ContactCardProps {
  contact: ContactCardItem;
  className?: string;
}
