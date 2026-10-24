import type { JSX } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EventSettingsFormActions from "./EventSettingsFormActions";
import type { SocialMediaListValues } from "./EventSettingsForms.schema";
import {
  SOCIAL_MEDIA_ITEM_DEFAULTS,
  socialMediaListSchema,
} from "./EventSettingsForms.schema";
import type { SocialMediaFormProps } from "./EventSettingsForms.types";
import SocialMediaFields from "./SocialMediaFields";

export default function SocialMediaForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  className = "",
}: SocialMediaFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SocialMediaListValues>({
    resolver: zodResolver(socialMediaListSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "social_media",
  });

  const items = useWatch({ control, name: "social_media" });

  const submitForm = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form
      noValidate
      onSubmit={submitForm}
      className={`flex flex-col gap-5 ${className}`.trim()}
    >
      <SocialMediaFields
        register={register}
        errors={errors.social_media}
        fields={fields}
        platforms={items?.map((item) => item.platform)}
        disabled={isLoading}
        onAdd={() => append(SOCIAL_MEDIA_ITEM_DEFAULTS)}
        onRemove={remove}
      />

      <EventSettingsFormActions
        submitLabel="Simpan Sosial Media"
        isLoading={isLoading}
        onCancel={onCancel}
      />
    </form>
  );
}
