import type { JSX } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EventSettingsFormActions from "./EventSettingsFormActions";
import type { TimelineListValues } from "./EventSettingsForms.schema";
import {
  TIMELINE_ITEM_DEFAULTS,
  timelineListSchema,
} from "./EventSettingsForms.schema";
import type { TimelineFormProps } from "./EventSettingsForms.types";
import TimelineFields from "./TimelineFields";

export default function TimelineForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  className = "",
}: TimelineFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TimelineListValues>({
    resolver: zodResolver(timelineListSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeline",
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
      <TimelineFields
        register={register}
        errors={errors.timeline}
        fields={fields}
        disabled={isLoading}
        onAdd={() => append(TIMELINE_ITEM_DEFAULTS)}
        onRemove={remove}
      />

      <EventSettingsFormActions
        submitLabel="Simpan Timeline"
        isLoading={isLoading}
        onCancel={onCancel}
      />
    </form>
  );
}
