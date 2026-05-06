export function getHealth() {
  return {
    status: 'OK',
    message: 'API saudavel e operacional',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  };
}
