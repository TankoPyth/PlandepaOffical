import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // manualChunks only applies to the client build; the SSR build is prerender-only
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'framer-motion': ['framer-motion'],
          'chart': ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
}));
