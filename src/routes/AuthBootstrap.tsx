import type { JSX } from "react";
import { Outlet } from "react-router";

import { useAuthInit } from "@/hooks/useAuthInit";

/**
 * Route boundary for the authentication area (login + admin). Bootstraps the
 * Supabase auth store here so it only runs for authenticated-area routes and
 * the public landing page stays untouched.
 */
export default function AuthBootstrap(): JSX.Element {
  useAuthInit();

  return <Outlet />;
}
