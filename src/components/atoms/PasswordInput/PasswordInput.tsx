import type { JSX } from "react";
import { useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import {
  DEFAULT_HIDE_PASSWORD_LABEL,
  DEFAULT_SHOW_PASSWORD_LABEL,
} from "./PasswordInput.constants";
import type { PasswordInputProps } from "./PasswordInput.types";

export default function PasswordInput({
  label,
  error,
  id,
  leftElement,
  leftElementClassName = "",
  showPasswordLabel = DEFAULT_SHOW_PASSWORD_LABEL,
  hidePasswordLabel = DEFAULT_HIDE_PASSWORD_LABEL,
  className = "",
  ref,
  ...restProps
}: PasswordInputProps): JSX.Element {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);
  const [isVisible, setIsVisible] = useState(false);

  const borderClass = hasError ? "border-tertiary" : "border-black";
  const paddingClass = leftElement ? "pl-11 pr-12" : "pl-3.5 pr-12";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          type={isVisible ? "text" : "password"}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={`w-full bg-surface-white text-on-surface font-body-md text-body-md ${paddingClass} py-3 border-[2.5px] ${borderClass} shadow-neo-xs outline-none transition-shadow placeholder:text-on-surface-variant focus:shadow-neo-sm disabled:opacity-60`}
          {...restProps}
        />

        {leftElement && (
          <span
            className={`pointer-events-none absolute inset-y-0 left-3.5 flex items-center font-body-md text-body-md text-on-surface-variant ${leftElementClassName}`.trim()}
          >
            {leftElement}
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          disabled={restProps.disabled}
          aria-label={isVisible ? hidePasswordLabel : showPasswordLabel}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3.5 text-on-surface-variant transition-colors hover:text-on-surface focus-visible:text-on-surface disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isVisible ? (
            <FiEyeOff aria-hidden="true" size={18} />
          ) : (
            <FiEye aria-hidden="true" size={18} />
          )}
        </button>
      </div>

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
