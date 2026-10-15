import type { JSX } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import ImageUploadField from "@/components/molecules/ImageUploadField";
import { useImageField } from "@/hooks/useImageField";
import { MAX_IMAGE_LABEL } from "@/utils/storage";

import EventSettingsFormActions from "./EventSettingsFormActions";
import type { EventInfoValues } from "./EventSettingsForms.schema";
import { eventInfoSchema } from "./EventSettingsForms.schema";
import type { EventInfoFormProps } from "./EventSettingsForms.types";

export default function EventInfoForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan Perubahan",
  isLoading = false,
  onCancel,
  className = "",
}: EventInfoFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventInfoValues>({
    resolver: zodResolver(eventInfoSchema),
    defaultValues,
  });

  const [isUploading, setIsUploading] = useState(false);
  const logo = useImageField(defaultValues.logo_url, "event-settings");
  const isBusy = isLoading || isUploading;

  const submitForm = handleSubmit(async (values) => {
    setIsUploading(true);
    const { url, error: uploadError } = await logo.resolve();
    setIsUploading(false);

    if (uploadError) {
      toast.error(uploadError);
      return;
    }

    await onSubmit({ ...values, logo_url: url ?? "" });
  });

  return (
    <form
      noValidate
      onSubmit={submitForm}
      className={`flex flex-col gap-5 ${className}`.trim()}
    >
      <Input
        label="Nama Event"
        placeholder="Fastoria 2026"
        disabled={isBusy}
        error={errors.event_name?.message}
        {...register("event_name")}
      />

      <Textarea
        label="Deskripsi Event"
        rows={3}
        placeholder="Deskripsi singkat event yang tampil di halaman publik."
        disabled={isBusy}
        error={errors.event_description?.message}
        {...register("event_description")}
      />

      <ImageUploadField
        label="Logo Event"
        hint={`JPG, PNG, WEBP, atau SVG. Maksimal ${MAX_IMAGE_LABEL}.`}
        aspect="square"
        fit="contain"
        currentUrl={logo.currentUrl}
        file={logo.file}
        onSelectFile={logo.selectFile}
        onClear={logo.clear}
        disabled={isBusy}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Total Hadiah (Rp)"
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="45000000"
          disabled={isBusy}
          error={errors.prize_pool?.message}
          {...register("prize_pool")}
        />

        <Input
          label="Nama Venue"
          placeholder="Gedung Serbaguna Fastoria"
          disabled={isBusy}
          error={errors.venue_name?.message}
          {...register("venue_name")}
        />
      </div>

      <Input
        label="Alamat"
        placeholder="Jl. Merdeka No. 10, Jakarta"
        disabled={isBusy}
        error={errors.address?.message}
        {...register("address")}
      />

      <EventSettingsFormActions
        submitLabel={submitLabel}
        isLoading={isBusy}
        onCancel={onCancel}
      />
    </form>
  );
}
