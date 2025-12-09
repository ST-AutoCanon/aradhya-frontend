
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 1573,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    allowedHosts: [
      'dakseyu.info',        // your new domain
      'localhost',           // optional, for local dev
      'www.dakseyu.info',           // optional, for local dev
    ],
    hmr: {
      protocol: 'ws',
      host: 'www.dakseyu.info',  // match your browser access
    },
  },
});