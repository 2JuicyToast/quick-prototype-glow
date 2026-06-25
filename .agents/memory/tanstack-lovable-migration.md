---
name: TanStack Start Lovable Migration
description: Fixes required when migrating a Lovable-generated TanStack Start project to Replit.
---

# TanStack Start Lovable Migration Fixes

## Issues and fixes

1. **Node.js version**: TanStack Start requires Node 22+. Install `nodejs-22` via `installProgrammingLanguage`.

2. **Vite version**: Must use Vite 7 (not 6 or 8). `@tanstack/react-start` peer requires `>=7.0.0`. Vite 6 causes esbuild `es2020` destructuring errors. Vite 8 was what Lovable used but it's too new.

3. **Remove `@lovable.dev/vite-tanstack-config`**: Replace with a standard `vite.config.ts` using `@tanstack/react-start/plugin/vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths`. Remove from `devDependencies`.

4. **Remove `@tanstack/start-server-core` override**: The `package.json` override pins it to `1.167.30` which is incompatible with the newer `start-plugin-core`. Remove this override and let npm resolve the correct version.

5. **Missing `#tanstack-start-plugin-adapters` import**: After resolving packages, `@tanstack/start-server-core` `1.169.x` uses `#tanstack-start-plugin-adapters` as a package import but doesn't declare it in `package.json` `imports`. Patch the file: add `"#tanstack-start-plugin-adapters": { "default": "./dist/esm/empty-plugin-adapters.js" }` to its `imports` field.

6. **Supabase secrets**: App uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` — request these from the user via `requestEnvVar`.

**Why**: The Lovable platform uses a proprietary config wrapper and specific package version pins that don't work outside the Lovable sandbox.

**How to apply**: Any time a Lovable TanStack Start project is imported.
