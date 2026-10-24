import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

import LandingError from "@/components/organisms/LandingError";

import type { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.types";

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <LandingError
          title={this.props.fallbackTitle ?? "Terjadi Kesalahan Aplikasi"}
          message={
            this.props.fallbackMessage ??
            "Komponen halaman mengalami kendala saat memproses tampilan. Silakan muat ulang halaman."
          }
          onRetry={() => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}
