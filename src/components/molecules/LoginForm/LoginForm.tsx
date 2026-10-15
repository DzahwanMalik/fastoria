import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import type { LoginFormValues } from "./LoginForm.schema";
import { loginSchema } from "./LoginForm.schema";
import type { LoginFormProps } from "./LoginForm.types";

export default function LoginForm({
  onSubmit,
  isLoading = false,
  className = "",
}: LoginFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submitForm = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form
      noValidate
      onSubmit={submitForm}
      className={`flex flex-col gap-5 ${className}`.trim()}
    >
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="admin@fastoria.id"
        disabled={isLoading}
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="password"
        disabled={isLoading}
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Memproses..." : "Masuk"}
        {!isLoading && <FiLogIn aria-hidden="true" />}
      </Button>
    </form>
  );
}
