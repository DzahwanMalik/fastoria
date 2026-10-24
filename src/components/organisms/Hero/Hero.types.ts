import type { Tables } from "@/types/database";

export interface HeroProps {
  settings?: Tables<"event_settings"> | null;
  onRegisterClick?: () => void;
  onGuidebookClick?: () => void;
}
