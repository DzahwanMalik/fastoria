import type { JSX } from "react";
import { useId } from "react";

import type { InputProps } from "./Input.types";

export default function Input({
  label,
  error,
  id,
  className = "",
  ref,
  ...restProps
}: InputProps): JSX.Element {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  const borderClass = hasError ? "border-tertiary" : "border-black";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <input
        id={inputId}
        ref={ref}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full bg-surface-white text-on-surface font-body-md text-body-md px-3.5 py-3 border-[2.5px] ${borderClass} shadow-neo-xs outline-none transition-shadow placeholder:text-on-surface-variant focus:shadow-neo-sm disabled:opacity-60`}
        {...restProps}
      />

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
