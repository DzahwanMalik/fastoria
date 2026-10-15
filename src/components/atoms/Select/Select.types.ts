import type { Ref, SelectHTMLAttributes } from "react";

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
  error?: string;
  className?: string;
  ref?: Ref<HTMLSelectElement>;
}
