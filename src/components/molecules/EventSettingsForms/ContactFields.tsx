import type { JSX } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import PhoneInput from "@/components/atoms/PhoneInput";
import { isPhoneContactType } from "@/utils/phone";

import type { ContactFieldsProps } from "./EventSettingsForms.types";

export default function ContactFields({
  register,
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
          const isPhone = isPhoneContactType(type);
          const valueField = register(`contact.${index}.value`);

          return (
            <li
              key={field.id}
              className="flex flex-col gap-4 border-t-2 border-black/10 pt-5 first:border-t-0 first:pt-0"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Tipe"
                  placeholder="whatsapp"
                  disabled={disabled}
                  error={errors?.[index]?.type?.message}
                  {...register(`contact.${index}.type`)}
                />

                <Input
                  label="Label"
                  placeholder="CP Teknis"
                  disabled={disabled}
                  error={errors?.[index]?.label?.message}
                  {...register(`contact.${index}.label`)}
                />
              </div>

              {isPhone ? (
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
                  placeholder="halo@fastoria.id"
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
