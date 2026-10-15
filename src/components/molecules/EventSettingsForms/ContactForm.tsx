import type { JSX } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ContactFields from "./ContactFields";
import EventSettingsFormActions from "./EventSettingsFormActions";
import type { ContactListValues } from "./EventSettingsForms.schema";
import {
  CONTACT_ITEM_DEFAULTS,
  contactListSchema,
} from "./EventSettingsForms.schema";
import type { ContactFormProps } from "./EventSettingsForms.types";

export default function ContactForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  className = "",
}: ContactFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactListValues>({
    resolver: zodResolver(contactListSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "contact" });

  // One subscription for the whole list, so each row can swap to the phone
  // input as soon as its `type` becomes phone-like.
  const contactValues = useWatch({ control, name: "contact" });
  const types = (contactValues ?? []).map((item) => item.type ?? "");

  const submitForm = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form
      noValidate
      onSubmit={submitForm}
      className={`flex flex-col gap-5 ${className}`.trim()}
    >
      <ContactFields
        register={register}
        errors={errors.contact}
        fields={fields}
        types={types}
        disabled={isLoading}
        onAdd={() => append(CONTACT_ITEM_DEFAULTS)}
        onRemove={remove}
      />

      <EventSettingsFormActions
        submitLabel="Simpan Kontak"
        isLoading={isLoading}
        onCancel={onCancel}
      />
    </form>
  );
}
