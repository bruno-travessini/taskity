import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getHealth } from './modules/health/health.service.js';
import { registerUser, loginUser } from './modules/user/user.service.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Arquivo não encontrado');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); }
      catch { reject(new Error('JSON inválido')); }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export async function router(req, res) {
  const { method, url } = req;
  const parsedUrl = new URL(url, 'http://localhost');
  const pathname = parsedUrl.pathname;

  if (pathname.startsWith('/public/')) {
    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    serveFile(res, filePath, contentType);
    return;
  }

  if (method === 'GET' && pathname === '/api/health') {
    sendJSON(res, 200, getHealth());
    return;
  }

  if (method === 'POST' && pathname === '/api/users/register') {
    try {
      const { name, email, password } = await readBody(req);
      const user = await registerUser(name, email, password);
      sendJSON(res, 201, { success: true, user });
    } catch (err) {
      sendJSON(res, 400, { success: false, message: err.message });
    }
    return;
  }

  if (method === 'POST' && pathname === '/api/users/login') {
    try {
      const { email, password } = await readBody(req);
      const user = await loginUser(email, password);
      sendJSON(res, 200, { success: true, user });
    } catch (err) {
      sendJSON(res, 401, { success: false, message: err.message });
    }
    return;
  }

  if (method === 'GET' && pathname === '/') {
    serveFile(res, path.join(__dirname, 'views', 'index.html'), 'text/html');
    return;
  }

  sendJSON(res, 404, { success: false, message: 'Rota não encontrada' });
}
