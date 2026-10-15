import type { JSX } from "react";
import { useId } from "react";

import type { SelectProps } from "./Select.types";

export default function Select({
  label,
  options,
  placeholder,
  error,
  id,
  className = "",
  ref,
  ...restProps
}: SelectProps): JSX.Element {
  const autoId = useId();
  const selectId = id ?? autoId;
  const errorId = `${selectId}-error`;
  const hasError = Boolean(error);

  const borderClass = hasError ? "border-tertiary" : "border-black";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={selectId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <select
        id={selectId}
        ref={ref}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full bg-surface-white text-on-surface font-body-md text-body-md px-3.5 py-3 border-[2.5px] ${borderClass} shadow-neo-xs outline-none transition-shadow focus:shadow-neo-sm disabled:opacity-60`}
        {...restProps}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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
