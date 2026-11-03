import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  label: string;
  /** Custom styled element rendered inside the field on the left, defaulting to the `+62` country code. */
  leftElement?: ReactNode;
  /** Optional custom class name for the left element container span. */
  leftElementClassName?: string;
  hint?: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}
