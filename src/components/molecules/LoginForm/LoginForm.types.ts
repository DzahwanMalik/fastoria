import type { LoginFormValues } from "./LoginForm.schema";

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}
