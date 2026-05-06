import 'dotenv/config';
import http from 'http';
import { router } from './router.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  router(req, res).catch(err => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Erro interno do servidor' }));
    console.error(err);
  });
});

server.listen(PORT, () => {
  console.log(`Taskify rodando em http://localhost:${PORT}`);
});
