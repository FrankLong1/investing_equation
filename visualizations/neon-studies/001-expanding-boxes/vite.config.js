import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
const here = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  root: fileURLToPath(new URL('../..', import.meta.url)),
  base: './',
  server: { host: '127.0.0.1', watch: { ignored: ['**/dist/**'] }, fs: { allow: [fileURLToPath(new URL('../../..', import.meta.url))] } },
  build: { outDir: here + 'dist', emptyOutDir: true, rollupOptions: { input: here + 'index.html' } }
});
