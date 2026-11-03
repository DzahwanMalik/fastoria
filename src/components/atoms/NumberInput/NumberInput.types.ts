import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export interface NumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "step" | "type"
  > {
  label: string;
  error?: string;
  className?: string;
  /** Custom styled element rendered inside the field on the left, e.g. `Rp`. */
  leftElement?: ReactNode;
  /** Optional custom class name for the left element container span. */
  leftElementClassName?: string;
  /** Amount applied by the stepper buttons and the native step behaviour. */
  step?: number;
  increaseLabel?: string;
  decreaseLabel?: string;
  ref?: Ref<HTMLInputElement>;
}
