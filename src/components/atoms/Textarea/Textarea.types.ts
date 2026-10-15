import type { Ref,TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  error?: string;
  className?: string;
  ref?: Ref<HTMLTextAreaElement>;
}
