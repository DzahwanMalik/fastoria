import type { EventSettingsSection } from "@/components/molecules/EventSettingsForms";
import type { EventSettingsValues } from "@/utils/eventSettings";

export interface EventSettingsSummaryProps {
  values: EventSettingsValues;
  onEditSection: (section: EventSettingsSection) => void;
  className?: string;
}
