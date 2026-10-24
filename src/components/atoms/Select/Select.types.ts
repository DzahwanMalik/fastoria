import type { ReactNode, Ref, SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "className" | "children"
  > {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  /** Decorative glyph rendered before the selected value (e.g. a brand icon). */
  leadingIcon?: ReactNode;
  error?: string;
  className?: string;
  ref?: Ref<HTMLSelectElement>;
}
