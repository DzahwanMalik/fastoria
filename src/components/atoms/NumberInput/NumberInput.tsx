import type { JSX } from "react";
import { useCallback, useId, useRef } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

import {
  DEFAULT_DECREASE_LABEL,
  DEFAULT_INCREASE_LABEL,
} from "./NumberInput.constants";
import type { NumberInputProps } from "./NumberInput.types";

export default function NumberInput({
  label,
  error,
  id,
  leftElement,
  leftElementClassName = "",
  step = 1,
  increaseLabel = DEFAULT_INCREASE_LABEL,
  decreaseLabel = DEFAULT_DECREASE_LABEL,
  inputMode = "numeric",
  className = "",
  ref,
  ...restProps
}: NumberInputProps): JSX.Element {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  const resolvedStep = Number.isFinite(step) && step > 0 ? step : 1;

  const handleStep = (direction: 1 | -1) => {
    const input = inputRef.current;

    if (!input || input.disabled || input.readOnly) {
      return;
    }

    const minValue = Number(input.min);
    const maxValue = Number(input.max);
    const min =
      input.min !== "" && Number.isFinite(minValue)
        ? minValue
        : Number.NEGATIVE_INFINITY;
    const max =
      input.max !== "" && Number.isFinite(maxValue)
        ? maxValue
        : Number.POSITIVE_INFINITY;
    const current = input.value === "" ? Number.NaN : Number(input.value);
    const base = Number.isNaN(current)
      ? Number.isFinite(min)
        ? min
        : 0
      : current + direction * resolvedStep;
    const next = Math.min(max, Math.max(min, base));

    // Bypass React's value tracker so the synthetic `onChange` fires.
    const valueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set;

    valueSetter?.call(input, String(next));
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const borderClass = hasError ? "border-tertiary" : "border-black";
  const isStepperDisabled = Boolean(restProps.disabled || restProps.readOnly);
  const paddingClass = leftElement ? "pl-11 pr-3.5" : "px-3.5";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
      >
        {label}
      </label>

      <div
        className={`relative flex w-full items-stretch border-[2.5px] ${borderClass} bg-surface-white shadow-neo-xs transition-shadow focus-within:shadow-neo-sm ${restProps.disabled ? "opacity-60" : ""}`}
        onClick={(event) => {
          if (
            !(event.target as HTMLElement).closest("button") &&
            document.activeElement !== inputRef.current
          ) {
            inputRef.current?.focus();
          }
        }}
      >
        <input
          id={inputId}
          ref={setInputRef}
          type="number"
          step={resolvedStep}
          inputMode={inputMode}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={`w-full min-w-0 bg-transparent text-on-surface font-body-md text-body-md py-3 outline-none placeholder:text-on-surface-variant [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${paddingClass}`}
          {...restProps}
        />

        {leftElement && (
          <span
            className={`pointer-events-none absolute inset-y-0 left-3.5 flex items-center font-body-md text-body-md text-on-surface-variant ${leftElementClassName}`.trim()}
          >
            {leftElement}
          </span>
        )}

        <div
          className={`flex w-10 shrink-0 flex-col border-l-[2.5px] ${borderClass}`}
        >
          <button
            type="button"
            onClick={() => handleStep(1)}
            disabled={isStepperDisabled}
            aria-label={increaseLabel}
            className={`flex flex-1 cursor-pointer items-center justify-center border-b-[2.5px] ${borderClass} bg-surface-container text-on-surface transition-colors hover:bg-electric-yellow active:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <FiPlus aria-hidden="true" size={14} />
          </button>

          <button
            type="button"
            onClick={() => handleStep(-1)}
            disabled={isStepperDisabled}
            aria-label={decreaseLabel}
            className="flex flex-1 cursor-pointer items-center justify-center bg-surface-container text-on-surface transition-colors hover:bg-electric-yellow active:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiMinus aria-hidden="true" size={14} />
          </button>
        </div>
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
