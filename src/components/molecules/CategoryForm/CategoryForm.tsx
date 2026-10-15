import type { JSX } from "react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { slugify } from "@/utils/slug";

import type { CategoryFormValues } from "./CategoryForm.schema";
import { CATEGORY_FORM_DEFAULTS, categorySchema } from "./CategoryForm.schema";
import type { CategoryFormProps } from "./CategoryForm.types";

export default function CategoryForm({
  onSubmit,
  defaultValues = CATEGORY_FORM_DEFAULTS,
  submitLabel = "Simpan Kategori",
  autoGenerateSlug = false,
  isLoading = false,
  onCancel,
  className = "",
}: CategoryFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, dirtyFields },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  const label = useWatch({ control, name: "label", defaultValue: "" });
  const isSlugDirty = Boolean(dirtyFields.slug);

  // Mirror the label into the slug until the admin edits the slug by hand, so
  // a deliberate slug is never overwritten.
  useEffect(() => {
    if (!autoGenerateSlug || isSlugDirty) {
      return;
    }

    setValue("slug", slugify(label));
  }, [autoGenerateSlug, isSlugDirty, label, setValue]);

  const submitForm = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form
      noValidate
      onSubmit={submitForm}
      className={`flex flex-col gap-5 ${className}`.trim()}
    >
      <Input
        label="Nama Kategori"
        placeholder="UI/UX Design"
        disabled={isLoading}
        error={errors.label?.message}
        {...register("label")}
      />

      <Input
        label="Slug"
        placeholder="ui-ux-design"
        autoComplete="off"
        disabled={isLoading}
        error={errors.slug?.message}
        {...register("slug")}
      />

      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Slug dipakai sebagai penanda kategori pada URL dan harus unik.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : submitLabel}
          {!isLoading && <FiSave aria-hidden="true" />}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onCancel}
            disabled={isLoading}
          >
            Batal
          </Button>
        )}
      </div>
    </form>
  );
}
