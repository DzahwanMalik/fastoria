import type { ContactCardItem } from "@/components/molecules/ContactCard";
import type { FaqItem } from "@/components/molecules/FaqAccordion";

export interface ContactSectionProps {
  contacts?: ContactCardItem[];
  faqs?: FaqItem[];
  className?: string;
}
