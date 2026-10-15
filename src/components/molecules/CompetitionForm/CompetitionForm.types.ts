import type { SelectOption } from "@/components/atoms/Select";

import type { CompetitionFormValues } from "./CompetitionForm.schema";

export interface CompetitionFormProps {
  onSubmit: (values: CompetitionFormValues) => void | Promise<void>;
  categories: SelectOption[];
  /** Prefilled values for edit mode; defaults to an empty create form. */
  defaultValues?: CompetitionFormValues;
  submitLabel?: string;
  isLoading?: boolean;
  onCancel?: () => void;
  className?: string;
}
