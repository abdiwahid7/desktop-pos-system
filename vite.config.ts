import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});