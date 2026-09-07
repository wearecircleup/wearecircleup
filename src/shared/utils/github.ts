import { ConfigService } from './config';

export class GitHubAuthService {
  private static readonly STATE_KEY = 'github_oauth_state';
  private static readonly STATE_BACKUP_KEY = 'github_oauth_state_backup';

  static getAuthUrl(): string {
    const config = ConfigService.getGitHubConfig();
    const params = new URLSearchParams({
      client_id: config.github.app.clientId,
      redirect_uri: config.github.app.redirectUri,
      scope: config.github.app.scopes.join(' '),
      state: this.generateState()
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  private static generateState(): string {
    const state = crypto.randomUUID();

    sessionStorage.setItem(this.STATE_KEY, state);
    localStorage.setItem(this.STATE_BACKUP_KEY, state);

    return state;
  }

  static validateState(state: string): boolean {
    const sessionState = sessionStorage.getItem(this.STATE_KEY);
    const backupState = localStorage.getItem(this.STATE_BACKUP_KEY);

    sessionStorage.removeItem(this.STATE_KEY);
    localStorage.removeItem(this.STATE_BACKUP_KEY);

    return state === sessionState || state === backupState;
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
