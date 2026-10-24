import type { ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
