import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    nodePolyfills({
      // Whether to polyfill `global`.
      global: true,
      // Whether to polyfill `process`.
      process: true,
      // Whether to polyfill `Buffer`.
      buffer: true,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]", // Ensure static assets get hashed filenames
      },
    },
  },
  worker: {
    format: "es", // Ensure workers are treated as ES modules
  },
  server: {
    host: true,
    cors: true, // Enable CORS to prevent cross-origin issues
    watch: {
      usePolling: true, // Ensures changes are detected in all environments
    },
  },
});
