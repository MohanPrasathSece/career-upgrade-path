// Force Vercel SSR preset during production builds
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  process.env.NITRO_PRESET = "vercel";
  process.env.SERVER_PRESET = "vercel";
}

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
});
