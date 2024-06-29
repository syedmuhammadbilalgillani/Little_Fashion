import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/port': {
        target: 'http://localhost:3000', // Your backend target
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/port/, ''),
        // Additional configurations like secure flag can be added if needed
        // secure: false,
      },
    },
  },
  plugins: [react()],
});
