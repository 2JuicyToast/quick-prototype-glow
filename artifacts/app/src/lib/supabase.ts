import { createClient } from "@supabase/supabase-js";

const isBrowser = typeof window !== "undefined";

class NoopWebSocket extends EventTarget {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  readyState = NoopWebSocket.CLOSED;
  constructor() {
    super();
  }
  send() {}
  close() {}
}

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
      transport: isBrowser ? undefined : (NoopWebSocket as unknown as typeof WebSocket),
      params: {
        eventsPerSecond: isBrowser ? 10 : -1,
      },
    },
  },
);
