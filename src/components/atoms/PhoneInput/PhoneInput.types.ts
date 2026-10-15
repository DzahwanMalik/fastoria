import type { InputHTMLAttributes, Ref } from "react";

export interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  label: string;
  /** Country code shown as a static prefix block. */
  prefix?: string;
  hint?: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}
