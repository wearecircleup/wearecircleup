# CircleUp - Senior Technical Specification
## Implementation Roadmap and Architecture

**Version:** 2.0  
**Target:** GitHub-Only Stack, Zero External Dependencies  
**Approach:** Incremental CI/CD with Validation Gates

---

## IMPLEMENTATION STRATEGY

### Core Principles

1. **Incremental Development**: Each step is independently deployable
2. **Validation Gates**: Unit tests must pass before proceeding
3. **No Backward Compatibility**: Breaking changes allowed during initial development
4. **Config-Driven**: Zero hardcoded values, all configuration externalized
5. **Feature Independence**: No cross-feature dependencies
6. **Caching First**: GitHub Actions caching at every layer
7. **Simple Patterns**: Prefer composition over inheritance
8. **Scalable Design**: Easy to add new features or swap tools

---

## IMPLEMENTATION PHASES

### Phase 1: Foundation and Infrastructure
### Phase 2: Core Backend Services
### Phase 3: Frontend Application
### Phase 4: Integration and Optimization

Each phase has:
- Clear entry criteria
- Implementation steps with validation
- Exit criteria (tests must pass)
- Rollback strategy

---

## PHASE 1: FOUNDATION AND INFRASTRUCTURE

### STEP 1.1: Repository Structure and Configuration

**Entry Criteria:** Empty repository or existing codebase

**Implementation:**

```bash
# Directory structure
.
├── .github/
│   ├── workflows/
│   │   ├── ci-backend.yml
│   │   ├── ci-frontend.yml
│   │   └── deploy.yml
│   └── actions/
│       └── setup-node/
├── config/
│   ├── app.config.json
│   ├── github.config.json
│   ├── models.config.json
│   └── storage.config.json
├── scripts/
│   ├── validate-config.js
│   └── setup-env.js
├── src/
│   └── (to be created in Phase 3)
├── backend/
│   └── (to be created in Phase 2)
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .editorconfig
├── .gitignore
├── .nvmrc
├── package.json
└── tsconfig.json
```

**Configuration Files:**

```json
// config/app.config.json
{
  "app": {
    "name": "CircleUp",
    "version": "2.0.0",
    "environment": "${APP_ENV}",
    "baseUrl": "${BASE_URL}"
  },
  "features": {
    "auth": true,
    "presentations": true,
    "analytics": false
  },
  "limits": {
    "maxSlidesPerPresentation": 50,
    "maxPresentationsPerDay": 5,
    "maxDescriptionLength": 5000
  }
}
```

```json
// config/github.config.json
{
  "github": {
    "app": {
      "clientId": "${GITHUB_APP_CLIENT_ID}",
      "redirectUri": "${GITHUB_APP_REDIRECT_URI}",
      "scopes": ["repo", "workflow"]
    },
    "api": {
      "baseUrl": "https://api.github.com",
      "version": "2022-11-28",
      "timeout": 30000
    },
    "repository": {
      "owner": "${GITHUB_REPO_OWNER}",
      "name": "${GITHUB_REPO_NAME}"
    }
  }
}
```

```json
// config/models.config.json
{
  "models": {
    "endpoint": "https://models.github.ai/inference/chat/completions",
    "primary": {
      "name": "gpt-4o",
      "maxTokens": 4096,
      "temperature": 0.7
    },
    "fallback": [
      {
        "name": "meta-llama/Llama-3.1-70B-Instruct",
        "maxTokens": 4096,
        "temperature": 0.7
      },
      {
        "name": "microsoft/Phi-3-medium-128k-instruct",
        "maxTokens": 2048,
        "temperature": 0.6
      }
    ],
    "retry": {
      "maxAttempts": 3,
      "backoffMs": 1000,
      "backoffMultiplier": 2
    }
  }
}
```

**Validation:**

```javascript
// scripts/validate-config.js
const Ajv = require('ajv');
const fs = require('fs');

const schemas = {
  app: require('../schemas/app.schema.json'),
  github: require('../schemas/github.schema.json'),
  models: require('../schemas/models.schema.json')
};

function validateConfig(configName) {
  const config = JSON.parse(fs.readFileSync(`config/${configName}.config.json`));
  const ajv = new Ajv();
  const validate = ajv.compile(schemas[configName]);
  
  if (!validate(config)) {
    throw new Error(`Invalid ${configName} config: ${JSON.stringify(validate.errors)}`);
  }
  
  return config;
}

module.exports = { validateConfig };
```

**Unit Tests:**

```javascript
// tests/unit/config.test.js
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
});
```

**Exit Criteria:**
- All config files validate against schemas
- Unit tests pass
- CI pipeline runs successfully

---

### STEP 1.2: CI/CD Pipeline Foundation

**Entry Criteria:** Step 1.1 complete

**Implementation:**

```yaml
# .github/workflows/ci-backend.yml
name: CI Backend

on:
  push:
    branches: [main, develop]
    paths:
      - 'backend/**'
      - 'config/**'
      - 'scripts/**'
  pull_request:
    branches: [main, develop]
    paths:
      - 'backend/**'
      - 'config/**'
      - 'scripts/**'

jobs:
  validate-config:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      
      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate configuration
        run: npm run validate:config
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
          flags: backend

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run TypeScript check
        run: npm run type-check
```

**Validation:**
- Pipeline runs on every push
- All jobs must pass
- Code coverage threshold: 80%

**Exit Criteria:**
- CI pipeline green
- All linters pass
- TypeScript compiles without errors

---

### STEP 1.3: File System Conventions

**Entry Criteria:** Step 1.2 complete

**Naming Conventions:**

```
Files:
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS.ts)
- Config: kebab-case (app.config.json)
- Tests: *.test.ts or *.spec.ts

Directories:
- Features: kebab-case (user-profile/)
- Shared: kebab-case (shared-components/)
- Config: kebab-case (config/)

Exports:
- Named exports preferred
- Index files for barrel exports
- No default exports except for pages/routes
```

**Module Resolution:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["config/*"],
      "@backend/*": ["backend/*"],
      "@shared/*": ["src/shared/*"],
      "@features/*": ["src/features/*"],
      "@tests/*": ["tests/*"]
    }
  }
}
```

**Exit Criteria:**
- All files follow naming conventions
- Module resolution works
- No relative imports beyond one level

---

## PHASE 2: CORE BACKEND SERVICES

### STEP 2.1: Configuration Loader Service

**Entry Criteria:** Phase 1 complete

**Implementation:**

```typescript
// backend/services/config/ConfigLoader.ts
import { readFileSync } from 'fs';
import { join } from 'path';

interface Config {
  app: AppConfig;
  github: GitHubConfig;
  models: ModelsConfig;
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
      app: this.loadJsonConfig(join(configDir, 'app.config.json')),
      github: this.loadJsonConfig(join(configDir, 'github.config.json')),
      models: this.loadJsonConfig(join(configDir, 'models.config.json'))
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
}
```

**Unit Tests:**

```typescript
// tests/unit/backend/services/ConfigLoader.test.ts
describe('ConfigLoader', () => {
  beforeEach(() => {
    process.env.APP_ENV = 'test';
    process.env.BASE_URL = 'http://localhost:3000';
  });
  
  test('loads configuration correctly', () => {
    const loader = ConfigLoader.getInstance();
    const appConfig = loader.get('app');
    
    expect(appConfig.environment).toBe('test');
    expect(appConfig.baseUrl).toBe('http://localhost:3000');
  });
  
  test('interpolates environment variables', () => {
    const loader = ConfigLoader.getInstance();
    const githubConfig = loader.get('github');
    
    expect(githubConfig.app.clientId).toBeDefined();
    expect(githubConfig.app.clientId).not.toContain('${');
  });
  
  test('singleton pattern works', () => {
    const loader1 = ConfigLoader.getInstance();
    const loader2 = ConfigLoader.getInstance();
    
    expect(loader1).toBe(loader2);
  });
});
```

**Exit Criteria:**
- ConfigLoader tests pass (100% coverage)
- No hardcoded values in code
- Environment variable interpolation works

---

### STEP 2.2: GitHub API Client

**Entry Criteria:** Step 2.1 complete

**Implementation:**

```typescript
// backend/services/github/GitHubClient.ts
import { Octokit } from '@octokit/rest';
import { ConfigLoader } from '../config/ConfigLoader';

export class GitHubClient {
  private octokit: Octokit;
  private config: GitHubConfig;
  
  constructor(token: string) {
    this.config = ConfigLoader.getInstance().get('github');
    
    this.octokit = new Octokit({
      auth: token,
      baseUrl: this.config.api.baseUrl,
      headers: {
        'X-GitHub-Api-Version': this.config.api.version
      },
      request: {
        timeout: this.config.api.timeout
      }
    });
  }
  
  async dispatchEvent(eventType: string, payload: any): Promise<void> {
    await this.octokit.repos.createDispatchEvent({
      owner: this.config.repository.owner,
      repo: this.config.repository.name,
      event_type: eventType,
      client_payload: payload
    });
  }
  
  async createCommitStatus(sha: string, state: string, description: string, targetUrl?: string): Promise<void> {
    await this.octokit.repos.createCommitStatus({
      owner: this.config.repository.owner,
      repo: this.config.repository.name,
      sha,
      state,
      description,
      context: 'circleup/presentation-generator',
      target_url: targetUrl
    });
  }
}
```

**Unit Tests:**

```typescript
// tests/unit/backend/services/GitHubClient.test.ts
import { GitHubClient } from '@backend/services/github/GitHubClient';

describe('GitHubClient', () => {
  let client: GitHubClient;
  
  beforeEach(() => {
    client = new GitHubClient('test-token');
  });
  
  test('dispatches event correctly', async () => {
    const mockDispatch = jest.fn();
    client['octokit'].repos.createDispatchEvent = mockDispatch;
    
    await client.dispatchEvent('test-event', { data: 'test' });
    
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        event_type: 'test-event',
        client_payload: { data: 'test' }
      })
    );
  });
});
```

**Exit Criteria:**
- GitHubClient tests pass
- API calls use config values
- Error handling implemented

---

### STEP 2.3: LLM Service with Circuit Breaker

**Entry Criteria:** Step 2.2 complete

**Implementation:**

```typescript
// backend/services/llm/CircuitBreaker.ts
export class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private nextAttempt = Date.now();
  
  constructor(
    private threshold: number,
    private timeout: number
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess(): void {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure(): void {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}
```

```typescript
// backend/services/llm/LLMService.ts
import { ConfigLoader } from '../config/ConfigLoader';
import { CircuitBreaker } from './CircuitBreaker';

export class LLMService {
  private config: ModelsConfig;
  private circuitBreaker: CircuitBreaker;
  
  constructor() {
    this.config = ConfigLoader.getInstance().get('models');
    this.circuitBreaker = new CircuitBreaker(
      this.config.retry.maxAttempts,
      this.config.retry.backoffMs * Math.pow(this.config.retry.backoffMultiplier, this.config.retry.maxAttempts)
    );
  }
  
  async generateSlides(description: string, numSlides: number): Promise<Slide[]> {
    const models = [this.config.primary, ...this.config.fallback];
    
    for (const model of models) {
      try {
        return await this.circuitBreaker.execute(() => 
          this.callModel(model, description, numSlides)
        );
      } catch (error) {
        console.error(`Model ${model.name} failed:`, error);
        continue;
      }
    }
    
    throw new Error('All models failed');
  }
  
  private async callModel(model: ModelConfig, description: string, numSlides: number): Promise<Slide[]> {
    const response = await fetch(this.config.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model.name,
        messages: [
          {
            role: 'system',
            content: this.buildSystemPrompt(numSlides)
          },
          {
            role: 'user',
            content: description
          }
        ],
        temperature: model.temperature,
        max_tokens: model.maxTokens
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const data = await response.json();
    return this.parseResponse(data);
  }
  
  private buildSystemPrompt(numSlides: number): string {
    return `Generate exactly ${numSlides} presentation slides in JSON format.`;
  }
  
  private parseResponse(data: any): Slide[] {
    return JSON.parse(data.choices[0].message.content);
  }
}
```

**Unit Tests:**

```typescript
// tests/unit/backend/services/LLMService.test.ts
describe('LLMService', () => {
  test('circuit breaker opens after threshold failures', async () => {
    const service = new LLMService();
    
    // Mock 3 failures
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));
    
    await expect(service.generateSlides('test', 10)).rejects.toThrow();
    
    // Circuit should be open now
    await expect(service.generateSlides('test', 10)).rejects.toThrow('Circuit breaker is OPEN');
  });
  
  test('falls back to secondary model on primary failure', async () => {
    const service = new LLMService();
    
    global.fetch = jest.fn()
      .mockRejectedValueOnce(new Error('Primary failed'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: JSON.stringify([]) } }]
        })
      });
    
    const result = await service.generateSlides('test', 10);
    expect(result).toBeDefined();
  });
});
```

**Exit Criteria:**
- LLMService tests pass
- Circuit breaker works correctly
- Fallback mechanism validated
- No hardcoded model names

---

## PHASE 3: FRONTEND APPLICATION

### STEP 3.1: TypeScript Configuration and Base Setup

**Entry Criteria:** Phase 2 complete

**Implementation:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["config/*"],
      "@shared/*": ["src/shared/*"],
      "@features/*": ["src/features/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_BASE_URL: string
  readonly VITE_GITHUB_APP_CLIENT_ID: string
  readonly VITE_GITHUB_APP_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

**Exit Criteria:**
- TypeScript compiles without errors
- Path aliases work
- Type checking enabled in CI

---

### STEP 3.2: Shared Utilities and Types

**Entry Criteria:** Step 3.1 complete

**Implementation:**

```typescript
// src/shared/types/api.types.ts
export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiMeta {
  timestamp: string;
  requestId: string;
}
```

```typescript
// src/shared/utils/config.ts
import appConfig from '@config/app.config.json';
import githubConfig from '@config/github.config.json';

export class ConfigService {
  private static interpolate(value: string): string {
    return value.replace(/\$\{(\w+)\}/g, (_, key) => {
      return import.meta.env[`VITE_${key}`] || '';
    });
  }
  
  private static processConfig<T>(config: any): T {
    if (typeof config === 'string') {
      return this.interpolate(config) as any;
    }
    
    if (Array.isArray(config)) {
      return config.map(item => this.processConfig(item)) as any;
    }
    
    if (typeof config === 'object' && config !== null) {
      return Object.keys(config).reduce((acc, key) => {
        acc[key] = this.processConfig(config[key]);
        return acc;
      }, {} as any);
    }
    
    return config;
  }
  
  public static getAppConfig(): AppConfig {
    return this.processConfig(appConfig);
  }
  
  public static getGitHubConfig(): GitHubConfig {
    return this.processConfig(githubConfig);
  }
}
```

**Unit Tests:**

```typescript
// tests/unit/shared/utils/config.test.ts
describe('ConfigService', () => {
  test('interpolates environment variables', () => {
    import.meta.env.VITE_APP_ENV = 'test';
    
    const config = ConfigService.getAppConfig();
    expect(config.environment).toBe('test');
  });
});
```

**Exit Criteria:**
- Config service tests pass
- No hardcoded environment values
- Type safety enforced

---

## PHASE 4: INTEGRATION AND OPTIMIZATION

### STEP 4.1: GitHub Actions Caching Strategy

**Entry Criteria:** Phase 3 complete

**Implementation:**

```yaml
# .github/workflows/ci-frontend.yml
name: CI Frontend

on:
  push:
    paths:
      - 'src/**'
      - 'public/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
      
      - name: Cache node modules
        id: cache-npm
        uses: actions/cache@v4
        with:
          path: |
            ~/.npm
            node_modules
          key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-npm-
      
      - name: Install dependencies
        if: steps.cache-npm.outputs.cache-hit != 'true'
        run: npm ci
      
      - name: Cache TypeScript build
        uses: actions/cache@v4
        with:
          path: |
            .tsbuildinfo
            dist
          key: ${{ runner.os }}-tsc-${{ hashFiles('src/**/*.ts', 'src/**/*.tsx') }}
      
      - name: Run tests
        run: npm run test:unit
```

**Exit Criteria:**
- Cache hit rate > 80%
- Build time reduced by 50%
- No cache invalidation issues

---

## VALIDATION CHECKLIST

### Per-Step Validation

Each step must pass:
- [ ] Unit tests (100% coverage for critical paths)
- [ ] Integration tests (if applicable)
- [ ] Linting (ESLint, Prettier)
- [ ] Type checking (TypeScript)
- [ ] Config validation
- [ ] CI pipeline green

### Phase Exit Criteria

Each phase must have:
- [ ] All steps completed
- [ ] All tests passing
- [ ] Documentation updated (as final step)
- [ ] No hardcoded values
- [ ] Config-driven implementation
- [ ] Caching implemented
- [ ] No backward compatibility concerns

---

## ROLLBACK STRATEGY

### Per-Step Rollback

```bash
# Revert last commit
git revert HEAD

# Run validation
npm run validate:all

# If validation passes, push
git push origin main
```

### Phase Rollback

```bash
# Revert to last stable phase
git revert <phase-start-commit>..<phase-end-commit>

# Validate
npm run test:all

# Deploy
git push origin main
```

---

## EXECUTION SEQUENCE

1. Execute Phase 1 (Foundation)
2. Validate all Phase 1 steps
3. Execute Phase 2 (Backend)
4. Validate all Phase 2 steps
5. Execute Phase 3 (Frontend)
6. Validate all Phase 3 steps
7. Execute Phase 4 (Integration)
8. Final validation
9. Documentation (last step only)
