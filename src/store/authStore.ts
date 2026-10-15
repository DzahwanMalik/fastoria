import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

import { getAuthErrorMessage } from "@/utils/authError";
import { supabase } from "@/utils/supabase";

export interface AuthState {
  session: Session | null;
  user: User | null;
  isInitializing: boolean;
  isSubmitting: boolean;
  /** Resolves to an error message on failure, or `null` on success. */
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

/**
 * Global auth store. Any authenticated Supabase user is treated as an admin,
 * so no extra role lookup is required.
 */
export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isInitializing: true,
  isSubmitting: false,

  signIn: async (email, password) => {
    set({ isSubmitting: true });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ isSubmitting: false });
      return getAuthErrorMessage(error.message);
    }

    // `onAuthStateChange` (see initAuth) syncs session/user afterwards.
    set({ isSubmitting: false });
    return null;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));

/**
 * Bootstraps auth state once at app start: hydrates the persisted session and
 * keeps the store in sync with Supabase auth events.
 *
 * @returns an unsubscribe function that stops listening to auth events.
 */
export function initAuth(): () => void {
  void supabase.auth.getSession().then(({ data }) => {
    useAuthStore.setState({
      session: data.session,
      user: data.session?.user ?? null,
      isInitializing: false,
    });
  });

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({
      session,
      user: session?.user ?? null,
      isInitializing: false,
    });
  });

  return () => data.subscription.unsubscribe();
}
