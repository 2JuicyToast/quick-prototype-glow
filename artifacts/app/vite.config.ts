import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const port = parseInt(process.env.PORT || "3000", 10);

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    react(),
  ],
  build: {
    target: "esnext",
  },
  environments: {
    ssr: {
      build: { target: "esnext" },
    },
    server: {
      build: { target: "esnext" },
    },
    client: {
      build: { target: "esnext" },
    },
  },
  server: {
    host: "0.0.0.0",
    port,
    strictPort: true,
    allowedHosts: true,
  },
});
