import type { ChangeEvent, JSX } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FiImage, FiTrash2, FiUpload } from "react-icons/fi";

import Button from "@/components/atoms/Button";
import { ALLOWED_IMAGE_MIME_TYPES, validateImageFile } from "@/utils/storage";

import type { ImageUploadFieldProps } from "./ImageUploadField.types";

const ASPECT_CLASS: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
};

const FIT_CLASS: Record<string, string> = {
  cover: "object-cover",
  contain: "object-contain",
};

export default function ImageUploadField({
  label,
  hint,
  currentUrl = null,
  file,
  onSelectFile,
  onClear,
  aspect = "video",
  fit = "cover",
  disabled = false,
  error,
  className = "",
}: ImageUploadFieldProps): JSX.Element {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const objectUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(
    () => () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    },
    [objectUrl],
  );

  const previewUrl = objectUrl ?? currentUrl;
  const message = error ?? localError;
  const hasError = Boolean(message);

  const borderClass = hasError ? "border-tertiary" : "border-black";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;

    // Reset so picking the same file twice still fires a change event.
    event.target.value = "";

    if (!selected) {
      return;
    }

    const validationError = validateImageFile(selected);

    setLocalError(validationError);

    if (validationError) {
      return;
    }

    onSelectFile(selected);
  };

  const handleClear = () => {
    setLocalError(null);
    onClear();
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <div
        className={`w-full overflow-hidden border-[2.5px] ${borderClass} bg-surface-container ${ASPECT_CLASS[aspect]}`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`Pratinjau ${label.toLowerCase()}`}
            className={`h-full w-full ${FIT_CLASS[fit]}`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-on-surface-variant">
            <FiImage aria-hidden="true" size={28} />
            <p className="font-body-sm text-body-sm">Belum ada gambar.</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          size="sm"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          <FiUpload aria-hidden="true" />
          {previewUrl ? "Ganti Gambar" : "Pilih Gambar"}
        </Button>

        {previewUrl && (
          <Button
            variant="danger"
            size="sm"
            disabled={disabled}
            onClick={handleClear}
          >
            <FiTrash2 aria-hidden="true" />
            Hapus
          </Button>
        )}
      </div>

      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={ALLOWED_IMAGE_MIME_TYPES.join(",")}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
      />

      {message ? (
        <p
          id={errorId}
          role="alert"
          className="font-body-sm text-body-sm text-tertiary"
        >
          {message}
        </p>
      ) : (
        hint && (
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
