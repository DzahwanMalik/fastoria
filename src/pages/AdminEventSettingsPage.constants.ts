import type { EventSettingsSection } from "@/components/molecules/EventSettingsForms";

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
