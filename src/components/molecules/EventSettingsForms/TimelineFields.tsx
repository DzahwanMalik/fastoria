import type { JSX } from "react";
import { Controller, useWatch } from "react-hook-form";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import Button from "@/components/atoms/Button";
import DatePicker from "@/components/atoms/DatePicker";
import Input from "@/components/atoms/Input";
import NumberInput from "@/components/atoms/NumberInput";
import Textarea from "@/components/atoms/Textarea";

import type { TimelineFieldsProps } from "./EventSettingsForms.types";

export default function TimelineFields({
  register,
  control,
  errors,
  fields,
  onAdd,
  onRemove,
  disabled = false,
  className = "",
}: TimelineFieldsProps): JSX.Element {
  const timelineValues = useWatch({ control, name: "timeline" });

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
          Belum ada tahapan.
        </p>
      )}

      <ul className="flex flex-col gap-5">
        {fields.map((field, index) => {
          const startDate = timelineValues?.[index]?.start_date;

          return (
            <li
              key={field.id}
              className="flex flex-col gap-4 border-t-2 border-black/10 pt-5 first:border-t-0 first:pt-0"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <NumberInput
                  label="Urutan"
                  min={1}
                  placeholder="1"
                  disabled={disabled}
                  error={errors?.[index]?.step?.message}
                  {...register(`timeline.${index}.step`)}
                />

                <Input
                  label="Judul Tahapan"
                  placeholder="Technical Meeting"
                  className="sm:col-span-2"
                  disabled={disabled}
                  error={errors?.[index]?.title?.message}
                  {...register(`timeline.${index}.title`)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Controller
                  control={control}
                  name={`timeline.${index}.start_date`}
                  render={({ field: dateField, fieldState }) => (
                    <DatePicker
                      {...dateField}
                      label="Tanggal Mulai"
                      placeholder="Pilih tanggal mulai"
                      disabled={disabled}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`timeline.${index}.end_date`}
                  render={({ field: dateField, fieldState }) => (
                    <DatePicker
                      {...dateField}
                      label="Tanggal Selesai (opsional)"
                      placeholder="Pilih tanggal selesai"
                      minDate={startDate || undefined}
                      disabled={disabled}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              <Textarea
                label="Deskripsi"
                rows={2}
                placeholder="Briefing teknis untuk seluruh peserta."
                disabled={disabled}
                error={errors?.[index]?.description?.message}
                {...register(`timeline.${index}.description`)}
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
          );
        })}
      </ul>
    </div>
  );
}
