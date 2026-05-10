import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  // Load .env / .env.local for local dev. On Cloudflare Pages,
  // VITE_* env vars are set in the dashboard (Settings → Environment Variables).
  loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      // Target browsers that Cloudflare's edge supports well
      target: 'es2020',
      // Cloudflare Pages has a 25 MB per-file limit; warn earlier
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-three': ['three'],
            'vendor-charts': ['recharts'],
            'vendor-motion': ['motion'],
            'vendor-genai': ['@google/genai'],
          },
        },
      },
    },
  };
});
