import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base:
    process.env.GH_PAGES === "true" ||
    process.env.npm_lifecycle_event === "predeploy"
      ? "/axirova/"
      : "/",

  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          const modulePath = id.replace(/\\/g, "/");
          if (
            modulePath.includes("commonjsHelpers.js") ||
            /\/node_modules\/(react|react-dom|scheduler)\//.test(modulePath)
          )
            return "react-vendor";
          if (
            /\/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(
              modulePath,
            )
          )
            return "framer-motion";
        },
      },
    },
  },
});
