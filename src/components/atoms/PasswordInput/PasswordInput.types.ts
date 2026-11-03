import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  label: string;
  /** Custom styled element rendered inside the field on the left. */
  leftElement?: ReactNode;
  /** Optional custom class name for the left element container span. */
  leftElementClassName?: string;
  error?: string;
  className?: string;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  ref?: Ref<HTMLInputElement>;
}
