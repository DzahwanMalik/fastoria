import type { Ref, TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  error?: string;
  className?: string;
  /** Grow the field with its content using CSS `field-sizing`. Defaults to `true`. */
  autoSize?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
}
