import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
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
    cors: true, // Enable CORS to prevent cross-origin issues
    watch: {
      usePolling: true, // Ensures changes are detected in all environments
    },
  },
});
