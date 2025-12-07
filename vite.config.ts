import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: `${Deno.env.get("PROTO")}://${Deno.env.get("HOST")}`,
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "client/main.ts",
    },
  },
});
