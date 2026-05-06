import { describe, it, expect, beforeEach } from 'vitest';
import { registerUser, loginUser, clearUsers } from '../user.service.js';

beforeEach(() => {
  clearUsers();
});

describe('registerUser', () => {
  it('deve retornar usuário com id, name e email', async () => {
    const user = await registerUser('Ana', 'ana@email.com', 'senha123');
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Ana');
    expect(user.email).toBe('ana@email.com');
  });

  it('não deve expor a senha no retorno', async () => {
    const user = await registerUser('Ana', 'ana@email.com', 'senha123');
    expect(user).not.toHaveProperty('password');
  });

  it('deve lançar erro se email já cadastrado', async () => {
    await registerUser('Ana', 'ana@email.com', 'senha123');
    await expect(registerUser('Ana2', 'ana@email.com', 'outrasenha')).rejects.toThrow('Email já cadastrado');
  });

  it('deve lançar erro se campos obrigatórios estiverem ausentes', async () => {
    await expect(registerUser('', 'ana@email.com', 'senha123')).rejects.toThrow('Campos obrigatórios');
    await expect(registerUser('Ana', '', 'senha123')).rejects.toThrow('Campos obrigatórios');
    await expect(registerUser('Ana', 'ana@email.com', '')).rejects.toThrow('Campos obrigatórios');
  });
});

describe('loginUser', () => {
  it('deve retornar usuário com credenciais válidas', async () => {
    await registerUser('Ana', 'ana@email.com', 'senha123');
    const user = await loginUser('ana@email.com', 'senha123');
    expect(user.email).toBe('ana@email.com');
    expect(user).not.toHaveProperty('password');
  });

  it('deve lançar erro se email não encontrado', async () => {
    await expect(loginUser('naoexiste@email.com', 'senha123')).rejects.toThrow('Credenciais inválidas');
  });

  it('deve lançar erro se senha incorreta', async () => {
    await registerUser('Ana', 'ana@email.com', 'senha123');
    await expect(loginUser('ana@email.com', 'senhaerrada')).rejects.toThrow('Credenciais inválidas');
  });
});
