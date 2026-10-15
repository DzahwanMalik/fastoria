import type { InputHTMLAttributes, Ref } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}
