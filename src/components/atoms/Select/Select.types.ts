import type { ReactNode, Ref } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectRenderState {
  isActive: boolean;
  isSelected: boolean;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  /** Currently selected option value; `""` means nothing is selected. */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  placeholder?: string;
  /** Decorative glyph rendered before the selected value (e.g. a brand icon). */
  leadingIcon?: ReactNode;
  error?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  /** Fully replace the trigger content (receives the selected option, if any). */
  renderValue?: (option: SelectOption | undefined) => ReactNode;
  /** Fully replace an option row's content. */
  renderOption?: (option: SelectOption, state: SelectRenderState) => ReactNode;
  ref?: Ref<HTMLButtonElement>;
}
