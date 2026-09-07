export class ConfigService {
  private static getBaseUrl() {
    if (typeof window !== 'undefined' && window.location?.origin) {
      return window.location.origin;
    }

    if (import.meta.env.VITE_BASE_URL) {
      return import.meta.env.VITE_BASE_URL;
    }

    return 'http://localhost:3000';
  }

  public static getAppConfig() {
    return {
      app: {
        name: 'CircleUp',
        version: '2.0.0',
        environment: import.meta.env.VITE_APP_ENV || 'development',
        baseUrl: this.getBaseUrl()
      },
      features: {
        auth: true,
        presentations: true,
        analytics: false
      },
      limits: {
        maxSlidesPerPresentation: 50,
        maxPresentationsPerDay: 5,
        maxDescriptionLength: 5000
      }
    };
  }
  
  public static getGitHubConfig() {
    const baseUrl = this.getBaseUrl();
    
    return {
      github: {
        app: {
          clientId: import.meta.env.VITE_GITHUB_APP_CLIENT_ID || '',
          redirectUri: `${baseUrl}/auth/callback`,
          scopes: ['read:user', 'user:email']
        },
        api: {
          baseUrl: 'https://api.github.com',
          version: '2022-11-28',
          timeout: 30000
        },
        repository: {
          owner: import.meta.env.VITE_GITHUB_REPO_OWNER || 'wearecircleup',
          name: import.meta.env.VITE_GITHUB_REPO_NAME || 'wearecircleup'
        }
      }
    };
  }
}
