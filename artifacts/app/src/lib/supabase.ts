import { createClient } from "@supabase/supabase-js";

const isBrowser = typeof window !== "undefined";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
      detectSessionInUrl: isBrowser,
    },
    realtime: {
      params: {
        eventsPerSecond: isBrowser ? 10 : -1,
      },
    },
  },
);
