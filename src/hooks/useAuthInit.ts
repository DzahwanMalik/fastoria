import { useEffect } from "react";

import { initAuth } from "@/store/authStore";

/**
 * Bootstraps the Supabase auth store for the authentication area (login and
 * admin). It subscribes to auth events on mount and unsubscribes on unmount,
 * so public routes such as the landing page never touch Supabase auth.
 */
export function useAuthInit(): void {
  useEffect(() => initAuth(), []);
}
