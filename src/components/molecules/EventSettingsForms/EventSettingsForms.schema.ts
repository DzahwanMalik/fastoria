import { z } from "zod";

import { isPhoneContactType, PHONE_LOCAL_PATTERN } from "@/utils/phone";
import { SOCIAL_MEDIA_PLATFORMS } from "@/utils/socialMedia";

/**
 * Numeric fields stay as strings in the form and are converted in the payload
 * builders, so empty inputs never coerce to `0`.
 *
 * Phone rows hold the local part only (the `+62` code is a fixed prefix in the
 * input), while every other type stays free text — e.g. an email.
 */
export const contactItemSchema = z
  .object({
    type: z.string().min(1, "Tipe kontak wajib diisi."),
    label: z.string().min(1, "Label kontak wajib diisi."),
    value: z.string().min(1, "Nilai kontak wajib diisi."),
  })
  .refine(
    (item) => !isPhoneContactType(item.type) || PHONE_LOCAL_PATTERN.test(item.value),
    {
      path: ["value"],
      message: "Nomor harus 8-13 digit angka, tanpa awalan +62 atau 0.",
    },
  );

export const timelineItemSchema = z.object({
  step: z.string().regex(/^\d+$/, "Urutan harus berupa angka."),
  title: z.string().min(1, "Judul tahapan wajib diisi."),
  start_date: z.string().min(1, "Tanggal mulai wajib diisi."),
  end_date: z.string(),
  description: z.string().min(1, "Deskripsi tahapan wajib diisi."),
});

export const socialMediaItemSchema = z.object({
  // The union keeps the persisted value strict while still allowing a freshly
  // added row to start blank; the refine rejects that blank on submit. The
  // predicate avoids the `.trim()` type-narrowing so the output type still
  // accepts `""` (the form's unselected state).
  platform: z
    .enum(SOCIAL_MEDIA_PLATFORMS)
    .or(z.literal(""))
    .refine((value) => value.trim().length > 0, {
      message: "Platform wajib dipilih.",
    }),
  label: z.string().min(1, "Label sosial media wajib diisi."),
  url: z.string().min(1, "URL wajib diisi.").url("Format URL tidak valid."),
});

/**
 * Info section. These are the only `event_settings` columns without a default,
 * so this section is also what creates the singleton row.
 */
export const eventInfoSchema = z.object({
  event_name: z.string().min(1, "Nama event wajib diisi."),
  event_description: z.string().min(1, "Deskripsi event wajib diisi."),
  prize_pool: z
    .string()
    .min(1, "Total hadiah wajib diisi.")
    .regex(/^\d+$/, "Total hadiah harus berupa angka bulat."),
  venue_name: z.string().min(1, "Nama venue wajib diisi."),
  address: z.string().min(1, "Alamat wajib diisi."),
  /** Storage URL; managed by `ImageUploadField`, not by a text input. */
  logo_url: z.string(),
});

export const contactListSchema = z.object({ contact: z.array(contactItemSchema) });
export const timelineListSchema = z.object({
  timeline: z.array(timelineItemSchema),
});
export const socialMediaListSchema = z.object({
  social_media: z.array(socialMediaItemSchema),
});

export type ContactItemValues = z.infer<typeof contactItemSchema>;
export type TimelineItemValues = z.infer<typeof timelineItemSchema>;
export type SocialMediaItemValues = z.infer<typeof socialMediaItemSchema>;
export type EventInfoValues = z.infer<typeof eventInfoSchema>;
export type ContactListValues = z.infer<typeof contactListSchema>;
export type TimelineListValues = z.infer<typeof timelineListSchema>;
export type SocialMediaListValues = z.infer<typeof socialMediaListSchema>;

export const EVENT_INFO_DEFAULTS: EventInfoValues = {
  event_name: "",
  event_description: "",
  prize_pool: "",
  venue_name: "",
  address: "",
  logo_url: "",
};

export const CONTACT_ITEM_DEFAULTS: ContactItemValues = {
  type: "",
  label: "",
  value: "",
};

export const TIMELINE_ITEM_DEFAULTS: TimelineItemValues = {
  step: "",
  title: "",
  start_date: "",
  end_date: "",
  description: "",
};

export const SOCIAL_MEDIA_ITEM_DEFAULTS: SocialMediaItemValues = {
  platform: "",
  label: "",
  url: "",
};
