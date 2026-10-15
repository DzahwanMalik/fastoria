import type { JSX } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import type { LoginFormValues } from "@/components/molecules/LoginForm";
import LoginForm from "@/components/molecules/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import AuthLayout from "@/layouts/AuthLayout";

interface LocationState {
  from?: string;
}

export default function LoginPage(): JSX.Element {
  const { session, isInitializing, isSubmitting, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? "/admin";

  if (isInitializing) {
    return (
      <AuthLayout>
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant text-center">
          Memuat...
        </p>
      </AuthLayout>
    );
  }

  if (session) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (values: LoginFormValues) => {
    const errorMessage = await signIn(values.email, values.password);

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    toast.success("Berhasil masuk. Selamat datang!");
    navigate(from, { replace: true });
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </AuthLayout>
  );
}
