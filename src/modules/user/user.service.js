import { createHash, randomUUID } from 'crypto';

const users = [];

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

function sanitize(user) {
  const { password: _, ...safe } = user;
  return safe;
}

export async function registerUser(name, email, password) {
  if (!name || !email || !password) {
    throw new Error('Campos obrigatórios');
  }

  if (users.find(u => u.email === email)) {
    throw new Error('Email já cadastrado');
  }

  const user = {
    id: randomUUID(),
    name,
    email,
    password: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return sanitize(user);
}

export async function loginUser(email, password) {
  const user = users.find(u => u.email === email);

  if (!user || user.password !== hashPassword(password)) {
    throw new Error('Credenciais inválidas');
  }

  return sanitize(user);
}

export function clearUsers() {
  users.length = 0;
}
