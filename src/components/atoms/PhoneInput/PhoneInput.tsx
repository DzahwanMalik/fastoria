import type { ChangeEvent, JSX } from "react";
import { useId } from "react";

import { PHONE_COUNTRY_CODE } from "@/utils/phone";

import type { PhoneInputProps } from "./PhoneInput.types";

/**
 * Phone field with a fixed country-code prefix. The bound value only holds the
 * local part (e.g. `85693415051`); callers expand it with
 * `toInternationalPhone` before persisting.
 */
export default function PhoneInput({
  label,
  prefix = PHONE_COUNTRY_CODE,
  hint,
  error,
  id,
  className = "",
  ref,
  ...restProps
}: PhoneInputProps): JSX.Element {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  const borderClass = hasError ? "border-tertiary" : "border-black";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "");

    if (digits !== event.target.value) {
      event.target.value = digits;
    }

    restProps.onChange?.(event);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <div className="flex items-stretch">
        <span className="inline-flex shrink-0 items-center border-[2.5px] border-r-0 border-black bg-surface-container px-3 font-body-md text-body-md text-on-surface">
          {prefix}
        </span>

        <input
          id={inputId}
          ref={ref}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={`w-full bg-surface-white text-on-surface font-body-md text-body-md px-3.5 py-3 border-[2.5px] ${borderClass} shadow-neo-xs outline-none transition-shadow placeholder:text-on-surface-variant focus:shadow-neo-sm disabled:opacity-60`}
          {...restProps}
          onChange={handleChange}
        />
      </div>

      {hint && !hasError && (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {hint}
        </p>
      )}

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="font-body-sm text-body-sm text-tertiary"
        >
          {error}
        </p>
      )}
    </div>
  );
}
