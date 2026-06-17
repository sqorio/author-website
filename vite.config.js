import { defineConfig } from 'vite';
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:        path.resolve(__dirname, 'index.html'),
        officeHours: path.resolve(__dirname, 'office-hours/index.html'),
      },
    },
  },
  plugins: [
    {
      name: 'save-layout',
      // Dev-only middleware: lets the playground POST directly to grid-layout.js
      configureServer(server) {
        // /office-hours without trailing slash serves the wrong page in dev
        server.middlewares.use((req, res, next) => {
          if (req.url === '/office-hours' || req.url.startsWith('/office-hours?')) {
            const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
            res.writeHead(301, { Location: `/office-hours/${qs}` });
            res.end();
            return;
          }
          next();
        });

        server.middlewares.use('/api/save-layout', (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end('Method not allowed');
            return;
          }
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { content } = JSON.parse(body);
              const filePath = path.resolve(__dirname, 'grid-layout.js');
              fs.writeFileSync(filePath, content, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({ ok: true }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: e.message }));
            }
          });
        });
      },
    },
  ],
});
