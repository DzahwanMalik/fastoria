import type { ReactNode, Ref } from "react";

export interface DatePickerProps {
  label: string;
  /** ISO date string "YYYY-MM-DD" or empty string */
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  /** Minimum selectable ISO date "YYYY-MM-DD" */
  minDate?: string;
  /** Maximum selectable ISO date "YYYY-MM-DD" */
  maxDate?: string;
  /** Decorative or custom element inside the field on the left. Defaults to calendar icon. */
  leftElement?: ReactNode;
  /** Optional custom class name for the left element container span. */
  leftElementClassName?: string;
  className?: string;
  triggerClassName?: string;
  popupClassName?: string;
  ref?: Ref<HTMLButtonElement>;
}
