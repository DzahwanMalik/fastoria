import { useShallow } from "zustand/react/shallow";

import type { AuthState } from "@/store/authStore";
import { useAuthStore } from "@/store/authStore";

/**
 * Reads the auth store with a shallow comparison, so consumers only re-render
 * when one of the selected fields actually changes.
 */
export function useAuth(): AuthState {
  return useAuthStore(
    useShallow((state) => ({
      session: state.session,
      user: state.user,
      isInitializing: state.isInitializing,
      isSubmitting: state.isSubmitting,
      signIn: state.signIn,
      signOut: state.signOut,
    })),
  );
}
