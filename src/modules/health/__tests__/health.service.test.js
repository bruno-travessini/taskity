import { describe, it, expect } from 'vitest';
import { getHealth } from '../health.service.js';

describe('health.service', () => {
  it('deve retornar status OK', () => {
    const result = getHealth();
    expect(result.status).toBe('OK');
  });

  it('deve retornar mensagem contendo "saudavel"', () => {
    const result = getHealth();
    expect(result.message).toContain('saudavel');
  });

  it('deve ter propriedade timestamp', () => {
    const result = getHealth();
    expect(result).toHaveProperty('timestamp');
    expect(typeof result.timestamp).toBe('string');
  });

  it('deve ter propriedade version', () => {
    const result = getHealth();
    expect(result).toHaveProperty('version');
    expect(typeof result.version).toBe('string');
  });
});
