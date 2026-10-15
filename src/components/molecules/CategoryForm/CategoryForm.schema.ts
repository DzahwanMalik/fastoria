import { z } from "zod";

export const categorySchema = z.object({
  label: z.string().min(1, "Nama kategori wajib diisi."),
  slug: z
    .string()
    .min(1, "Slug wajib diisi.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Gunakan huruf kecil, angka, dan tanda hubung (-).",
    ),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const CATEGORY_FORM_DEFAULTS: CategoryFormValues = {
  label: "",
  slug: "",
};
