import type { JSX } from "react";
import { useId } from "react";

import type { TextareaProps } from "./Textarea.types";

export default function Textarea({
  label,
  error,
  id,
  rows = 4,
  className = "",
  ref,
  ...restProps
}: TextareaProps): JSX.Element {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const errorId = `${textareaId}-error`;
  const hasError = Boolean(error);

  const borderClass = hasError ? "border-tertiary" : "border-black";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={textareaId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <textarea
        id={textareaId}
        ref={ref}
        rows={rows}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full resize-y bg-surface-white text-on-surface font-body-md text-body-md px-3.5 py-3 border-[2.5px] ${borderClass} shadow-neo-xs outline-none transition-shadow placeholder:text-on-surface-variant focus:shadow-neo-sm disabled:opacity-60`}
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
