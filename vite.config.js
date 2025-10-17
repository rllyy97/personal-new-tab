import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: '/personal-new-tab/',
    define: {
      'process.env': {},
			APP_VERSION: JSON.stringify(process.env.npm_package_version),
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