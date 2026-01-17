import { validateConfig } from '../../scripts/validate-config.js';

describe('Configuration Validation', () => {
  test('app.config.json is valid', () => {
    expect(() => validateConfig('app')).not.toThrow();
  });
  
  test('github.config.json is valid', () => {
    expect(() => validateConfig('github')).not.toThrow();
  });
  
  test('models.config.json is valid', () => {
    expect(() => validateConfig('models')).not.toThrow();
  });
  
  test('storage.config.json is valid', () => {
    expect(() => validateConfig('storage')).not.toThrow();
  });
  
  test('throws error for non-existent config', () => {
    expect(() => validateConfig('nonexistent')).toThrow('Config file not found');
  });
});
