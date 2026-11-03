import type { JSX } from "react";
import { Controller } from "react-hook-form";
import { FiMail, FiPlus, FiTrash2 } from "react-icons/fi";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import PhoneInput from "@/components/atoms/PhoneInput";
import type { SelectOption } from "@/components/atoms/Select";
import Select from "@/components/atoms/Select";

import type { ContactFieldsProps } from "./EventSettingsForms.types";

const CONTACT_TYPE_OPTIONS: SelectOption[] = [
  { value: "Whatsapp", label: "WhatsApp" },
  { value: "Email", label: "Email" },
];

export default function ContactFields({
  register,
  control,
  errors,
  fields,
  types,
  onAdd,
  onRemove,
  disabled = false,
  className = "",
}: ContactFieldsProps): JSX.Element {
  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      <div className="flex justify-end">
        <Button variant="secondary" size="sm" disabled={disabled} onClick={onAdd}>
          <FiPlus aria-hidden="true" />
          Tambah
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Belum ada kontak.
        </p>
      )}

      <ul className="flex flex-col gap-5">
        {fields.map((field, index) => {
          const type = types?.[index] ?? "";
          const isWhatsapp = type === "Whatsapp";
          const isEmail = type === "Email";
          const valueField = register(`contact.${index}.value`);

          return (
            <li
              key={field.id}
              className="flex flex-col gap-4 border-t-2 border-black/10 pt-5 first:border-t-0 first:pt-0"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Controller
                  control={control}
                  name={`contact.${index}.type`}
                  render={({ field: selectField, fieldState }) => (
                    <Select
                      {...selectField}
                      label="Tipe"
                      placeholder="Pilih tipe"
                      options={CONTACT_TYPE_OPTIONS}
                      disabled={disabled}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                <Input
                  label="Label"
                  placeholder="CP Teknis"
                  disabled={disabled}
                  error={errors?.[index]?.label?.message}
                  {...register(`contact.${index}.label`)}
                />
              </div>

              {isWhatsapp ? (
                <PhoneInput
                  label="Nilai"
                  hint="Tanpa awalan +62 atau 0."
                  placeholder="85693415051"
                  disabled={disabled}
                  error={errors?.[index]?.value?.message}
                  {...valueField}
                />
              ) : (
                <Input
                  label="Nilai"
                  type={isEmail ? "email" : "text"}
                  placeholder={
                    isEmail ? "halo@fastoria.id" : "Masukkan email atau nomor"
                  }
                  leftElement={
                    isEmail ? (
                      <FiMail aria-hidden="true" size={18} />
                    ) : undefined
                  }
                  disabled={disabled}
                  error={errors?.[index]?.value?.message}
                  {...valueField}
                />
              )}

              <Button
                variant="danger"
                size="sm"
                className="self-start"
                disabled={disabled}
                onClick={() => onRemove(index)}
              >
                <FiTrash2 aria-hidden="true" />
                Hapus
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
