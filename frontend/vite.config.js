import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy /api calls to Spring Boot backend running on port 8181
      '/api': {
        target: 'http://localhost:8181',
        changeOrigin: true,
      },
    },
  },
});
