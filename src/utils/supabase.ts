import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

/**
 * Shared browser Supabase client.
 *
 * Uses the publishable/anon key only — never the service_role key — and
 * persists the auth session in localStorage by default.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
