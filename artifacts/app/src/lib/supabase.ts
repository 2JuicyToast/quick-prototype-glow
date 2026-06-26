import { createClient } from "@supabase/supabase-js";

const isBrowser = typeof window !== "undefined";

if (!isBrowser && !("WebSocket" in globalThis)) {
  class ServerWebSocket extends EventTarget {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
    readyState = 3;
    constructor(_url?: string, _protocols?: string | string[]) {
      super();
      Promise.resolve().then(() => {
        this.dispatchEvent(Object.assign(new Event("close"), { code: 1000, reason: "", wasClean: true }));
      });
    }
    send() {}
    close() { this.readyState = 3; }
  }
  (globalThis as any).WebSocket = ServerWebSocket;
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
      params: {
        eventsPerSecond: isBrowser ? 10 : -1,
      },
    },
  },
);
