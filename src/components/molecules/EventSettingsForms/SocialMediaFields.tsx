import type { JSX } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import type { SocialMediaFieldsProps } from "./EventSettingsForms.types";

export default function SocialMediaFields({
  register,
  errors,
  fields,
  onAdd,
  onRemove,
  disabled = false,
  className = "",
}: SocialMediaFieldsProps): JSX.Element {
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
          Belum ada sosial media.
        </p>
      )}

      <ul className="flex flex-col gap-5">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="flex flex-col gap-4 border-t-2 border-black/10 pt-5 first:border-t-0 first:pt-0"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Platform"
                placeholder="instagram"
                disabled={disabled}
                error={errors?.[index]?.platform?.message}
                {...register(`social_media.${index}.platform`)}
              />

              <Input
                label="Label"
                placeholder="IG @fastoria"
                disabled={disabled}
                error={errors?.[index]?.label?.message}
                {...register(`social_media.${index}.label`)}
              />
            </div>

            <Input
              label="URL"
              type="url"
              placeholder="https://instagram.com/fastoria"
              disabled={disabled}
              error={errors?.[index]?.url?.message}
              {...register(`social_media.${index}.url`)}
            />

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
        ))}
      </ul>
    </div>
  );
}
