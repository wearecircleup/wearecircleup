import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: string;
    baseUrl: string;
  };
  features: {
    auth: boolean;
    presentations: boolean;
    analytics: boolean;
  };
  limits: {
    maxSlidesPerPresentation: number;
    maxPresentationsPerDay: number;
    maxDescriptionLength: number;
  };
}

interface GitHubConfig {
  github: {
    app: {
      clientId: string;
      redirectUri: string;
      scopes: string[];
    };
    api: {
      baseUrl: string;
      version: string;
      timeout: number;
    };
    repository: {
      owner: string;
      name: string;
    };
  };
}

interface ModelConfig {
  name: string;
  maxTokens: number;
  temperature: number;
}

interface ModelsConfig {
  models: {
    endpoint: string;
    primary: ModelConfig;
    fallback: ModelConfig[];
    retry: {
      maxAttempts: number;
      backoffMs: number;
      backoffMultiplier: number;
    };
  };
}

interface StorageConfig {
  storage: {
    presentationsPath: string;
    indexPath: string;
    templatesPath: string;
    maxFileSize: number;
    allowedExtensions: string[];
    versioning: {
      enabled: boolean;
      maxVersions: number;
    };
  };
}

interface Config {
  app: AppConfig;
  github: GitHubConfig;
  models: ModelsConfig;
  storage: StorageConfig;
}

export class ConfigLoader {
  private static instance: ConfigLoader;
  private config: Config;
  
  private constructor() {
    this.config = this.loadConfig();
  }
  
  public static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }
  
  private loadConfig(): Config {
    const configDir = process.env.CONFIG_DIR || join(__dirname, '../../../config');
    
    return {
      app: this.loadJsonConfig<AppConfig>(join(configDir, 'app.config.json')),
      github: this.loadJsonConfig<GitHubConfig>(join(configDir, 'github.config.json')),
      models: this.loadJsonConfig<ModelsConfig>(join(configDir, 'models.config.json')),
      storage: this.loadJsonConfig<StorageConfig>(join(configDir, 'storage.config.json'))
    };
  }
  
  private loadJsonConfig<T>(path: string): T {
    const content = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(content);
    return this.interpolateEnvVars(parsed);
  }
  
  private interpolateEnvVars(obj: any): any {
    if (typeof obj === 'string') {
      return obj.replace(/\$\{(\w+)\}/g, (_, key) => process.env[key] || '');
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.interpolateEnvVars(item));
    }
    
    if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = this.interpolateEnvVars(obj[key]);
        return acc;
      }, {} as any);
    }
    
    return obj;
  }
  
  public get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }
  
  public reload(): void {
    this.config = this.loadConfig();
  }
}
