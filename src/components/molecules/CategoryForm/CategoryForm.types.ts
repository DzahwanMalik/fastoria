import type { CategoryFormValues } from "./CategoryForm.schema";

export interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void | Promise<void>;
  /** Prefilled values for edit mode; defaults to an empty create form. */
  defaultValues?: CategoryFormValues;
  submitLabel?: string;
  /**
   * When enabled, the slug mirrors the label until the user edits the slug
   * field manually. Should stay off in edit mode so existing URLs survive.
   */
  autoGenerateSlug?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  className?: string;
}
