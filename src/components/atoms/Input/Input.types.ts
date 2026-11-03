import type { InputHTMLAttributes, ReactNode, Ref } from "react";

/** Text-like input types; numeric and password fields use their own atoms. */
export type InputType = "text" | "email" | "url" | "date";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  type?: InputType;
  label: string;
  /** Custom styled element rendered inside the field on the left. */
  leftElement?: ReactNode;
  /** Optional custom class name for the left element container span. */
  leftElementClassName?: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}
