import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: { host: '127.0.0.1', watch: { ignored: ['**/dist/**'] }, fs: { allow: [fileURLToPath(new URL('..', import.meta.url))] } },
  plugins: [{
    name: 'original-study-addresses',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (/^\/00[1-5]-[^/]+(?:\/|$)/.test(req.url || '')) {
          res.writeHead(302, { Location: '/neon-studies' + req.url }); res.end();
        } else next();
      });
    }
  }]
});
