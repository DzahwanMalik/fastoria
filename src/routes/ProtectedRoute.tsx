import type { JSX } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "@/hooks/useAuth";

/**
 * Route guard for authenticated (admin) areas. Anonymous visitors are sent to
 * the login page, preserving the attempted path for a post-login redirect.
 */
export default function ProtectedRoute(): JSX.Element {
  const { session, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-bg">
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
          Memuat...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
}
