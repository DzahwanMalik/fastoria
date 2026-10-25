import type { ContactCardItem } from "@/components/molecules/ContactCard";
import type { Tables } from "@/types/database";

export interface ContactSectionProps {
  settings?: Tables<"event_settings"> | null;
  contacts?: ContactCardItem[];
  className?: string;
}
