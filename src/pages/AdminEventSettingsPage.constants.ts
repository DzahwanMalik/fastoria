import type { EventSettingsSection } from "@/components/molecules/EventSettingsForms";
import { EVENT_INFO_DEFAULTS } from "@/components/molecules/EventSettingsForms";
import type { EventSettingsValues } from "@/utils/eventSettings";

export interface EventSettingsSectionMeta {
  title: string;
  description: string;
}

export const EVENT_SETTINGS_SECTION_META: Record<
  EventSettingsSection,
  EventSettingsSectionMeta
> = {
  info: {
    title: "Informasi Event",
    description: "Nama, deskripsi, total hadiah, dan lokasi event.",
  },
  contact: {
    title: "Kontak",
    description: "Nomor dan email yang bisa dihubungi peserta.",
  },
  timeline: {
    title: "Timeline",
    description: "Tahapan kegiatan yang tampil di halaman publik.",
  },
  social_media: {
    title: "Sosial Media",
    description: "Tautan kanal resmi event yang tampil di footer.",
  },
};

/**
 * Placeholder shown while the `event_settings` row does not exist yet. Every
 * card stays visible, so each section can create the row on its own.
 */
export const EMPTY_EVENT_SETTINGS_VALUES: EventSettingsValues = {
  info: EVENT_INFO_DEFAULTS,
  contact: [],
  timeline: [],
  social_media: [],
};
