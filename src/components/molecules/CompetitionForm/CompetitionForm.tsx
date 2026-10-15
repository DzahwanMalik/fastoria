import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";

import type { CompetitionFormValues } from "./CompetitionForm.schema";
import {
  COMPETITION_FORM_DEFAULTS,
  competitionSchema,
} from "./CompetitionForm.schema";
import type { CompetitionFormProps } from "./CompetitionForm.types";

export default function CompetitionForm({
  onSubmit,
  categories,
  defaultValues = COMPETITION_FORM_DEFAULTS,
  submitLabel = "Simpan Lomba",
  isLoading = false,
  onCancel,
  className = "",
}: CompetitionFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompetitionFormValues>({
    resolver: zodResolver(competitionSchema),
    defaultValues,
  });

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
        label="Judul Lomba"
        placeholder="UI/UX Design Challenge"
        disabled={isLoading}
        error={errors.title?.message}
        {...register("title")}
      />

      <Textarea
        label="Deskripsi"
        rows={3}
        placeholder="Deskripsi singkat yang tampil di halaman publik."
        disabled={isLoading}
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Biaya Pendaftaran (Rp)"
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="120000"
          disabled={isLoading}
          error={errors.registration_fee?.message}
          {...register("registration_fee")}
        />

        <Input
          label="Anggota per Tim"
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="Kosongkan bila individu"
          disabled={isLoading}
          error={errors.teams?.message}
          {...register("teams")}
        />
      </div>

      <Input
        label="Link Pendaftaran"
        type="url"
        placeholder="https://forms.gle/..."
        disabled={isLoading}
        error={errors.registration_link?.message}
        {...register("registration_link")}
      />

      <Input
        label="Link Guidebook"
        type="url"
        placeholder="https://drive.google.com/..."
        disabled={isLoading}
        error={errors.guidebook_link?.message}
        {...register("guidebook_link")}
      />

      <Select
        label="Kategori"
        placeholder="Tanpa kategori"
        options={categories}
        disabled={isLoading}
        error={errors.category_id?.message}
        {...register("category_id")}
      />

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
