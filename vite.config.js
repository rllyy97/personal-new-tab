import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    define: {
      'process.env': {},
    },
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
    },
    plugins: [
      react()
    ],
  };
});