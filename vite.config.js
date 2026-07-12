import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel automatically sets `process.env.VERCEL` during every build on its
// platform. Forcing `base` to '/' whenever that variable is present makes
// Vercel deployments immune to the GitHub Pages-only base path ('/axirova/'),
// even if `GH_PAGES` (or any future GitHub Pages-only flag) is ever set by
// mistake in the Vercel project's environment variables. Without this guard,
// a stray `GH_PAGES=true` on Vercel causes every built <script>/<link> tag to
// be emitted as `/axirova/assets/...`, which 404s on the domain root and
// leaves React unable to mount — i.e. a permanent blank/white page.
const isVercel = process.env.VERCEL === '1';
const isGhPagesBuild =
  !isVercel &&
  (process.env.GH_PAGES === 'true' || process.env.npm_lifecycle_event === 'predeploy');

export default defineConfig({
  base: isGhPagesBuild ? '/axirova/' : '/',

  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
});
