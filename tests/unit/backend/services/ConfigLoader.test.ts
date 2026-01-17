import { describe, test, expect, beforeEach } from 'vitest';
import { ConfigLoader } from '../../../../backend/services/config/ConfigLoader';

describe('ConfigLoader', () => {
  beforeEach(() => {
    process.env.APP_ENV = 'test';
    process.env.BASE_URL = 'http://localhost:3000';
    process.env.GITHUB_APP_CLIENT_ID = 'test_client_id';
    process.env.GITHUB_APP_REDIRECT_URI = 'http://localhost:3000/callback';
    process.env.GITHUB_REPO_OWNER = 'test_owner';
    process.env.GITHUB_REPO_NAME = 'test_repo';
  });
  
  test('loads configuration correctly', () => {
    const loader = ConfigLoader.getInstance();
    const appConfig = loader.get('app');
    
    expect(appConfig.app.environment).toBe('test');
    expect(appConfig.app.baseUrl).toBe('http://localhost:3000');
  });
  
  test('interpolates environment variables', () => {
    const loader = ConfigLoader.getInstance();
    const githubConfig = loader.get('github');
    
    expect(githubConfig.github.app.clientId).toBe('test_client_id');
    expect(githubConfig.github.app.clientId).not.toContain('${');
  });
  
  test('singleton pattern works', () => {
    const loader1 = ConfigLoader.getInstance();
    const loader2 = ConfigLoader.getInstance();
    
    expect(loader1).toBe(loader2);
  });
  
  test('loads all config types', () => {
    const loader = ConfigLoader.getInstance();
    
    expect(loader.get('app')).toBeDefined();
    expect(loader.get('github')).toBeDefined();
    expect(loader.get('models')).toBeDefined();
    expect(loader.get('storage')).toBeDefined();
  });
  
  test('models config has fallback array', () => {
    const loader = ConfigLoader.getInstance();
    const modelsConfig = loader.get('models');
    
    expect(Array.isArray(modelsConfig.models.fallback)).toBe(true);
    expect(modelsConfig.models.fallback.length).toBeGreaterThan(0);
  });
  
  test('storage config has versioning settings', () => {
    const loader = ConfigLoader.getInstance();
    const storageConfig = loader.get('storage');
    
    expect(storageConfig.storage.versioning.enabled).toBeDefined();
    expect(storageConfig.storage.versioning.maxVersions).toBeGreaterThan(0);
  });
});
