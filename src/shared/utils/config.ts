export class ConfigService {
  public static getAppConfig() {
    return {
      app: {
        name: 'CircleUp',
        version: '2.0.0',
        environment: import.meta.env.VITE_APP_ENV || 'development',
        baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:5173'
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
    return {
      github: {
        app: {
          clientId: import.meta.env.VITE_GITHUB_APP_CLIENT_ID || '',
          redirectUri: import.meta.env.VITE_GITHUB_APP_REDIRECT_URI || 'http://localhost:5173/auth/callback',
          scopes: ['repo', 'workflow']
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
