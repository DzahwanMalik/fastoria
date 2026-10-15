import { z } from "zod";

/**
 * Numeric fields stay as strings in the form and are converted in the page
 * before hitting the database, so empty inputs never coerce to `0`.
 */
export const competitionSchema = z.object({
  title: z.string().min(1, "Judul lomba wajib diisi."),
  description: z.string().min(1, "Deskripsi wajib diisi."),
  registration_fee: z
    .string()
    .min(1, "Biaya pendaftaran wajib diisi.")
    .regex(/^\d+$/, "Biaya harus berupa angka bulat."),
  registration_link: z
    .string()
    .min(1, "Link pendaftaran wajib diisi.")
    .url("Format link pendaftaran tidak valid."),
  guidebook_link: z
    .string()
    .min(1, "Link guidebook wajib diisi.")
    .url("Format link guidebook tidak valid."),
  teams: z.string().regex(/^\d*$/, "Jumlah anggota harus berupa angka."),
  category_id: z.string(),
  /** Storage URL; managed by `ImageUploadField`, not by a text input. */
  image_url: z.string(),
});

export type CompetitionFormValues = z.infer<typeof competitionSchema>;

export const COMPETITION_FORM_DEFAULTS: CompetitionFormValues = {
  title: "",
  description: "",
  registration_fee: "",
  registration_link: "",
  guidebook_link: "",
  teams: "",
  category_id: "",
  image_url: "",
};
