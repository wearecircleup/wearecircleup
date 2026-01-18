import { ConfigService } from './config';

export class GitHubAuthService {
  private static config = ConfigService.getGitHubConfig();

  static getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.github.app.clientId,
      redirect_uri: this.config.github.app.redirectUri,
      scope: this.config.github.app.scopes.join(' '),
      state: this.generateState()
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  private static generateState(): string {
    const state = crypto.randomUUID();
    sessionStorage.setItem('github_oauth_state', state);
    return state;
  }

  static validateState(state: string): boolean {
    const storedState = sessionStorage.getItem('github_oauth_state');
    sessionStorage.removeItem('github_oauth_state');
    return state === storedState;
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('github_user');
  }

  static getUser(): { id: string; login: string; username: string; email?: string; avatarUrl: string; accessToken?: string } | null {
    const user = localStorage.getItem('github_user');
    return user ? JSON.parse(user) : null;
  }

  static setUser(user: { id: string; login: string; username: string; email?: string; avatarUrl: string; accessToken?: string }): void {
    localStorage.setItem('github_user', JSON.stringify(user));
  }
  
  static getUserToken(): string | null {
    const user = this.getUser();
    return user?.accessToken || null;
  }

  static logout(): void {
    localStorage.removeItem('github_user');
    sessionStorage.clear();
  }
}
