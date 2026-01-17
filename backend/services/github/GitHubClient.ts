import { Octokit } from '@octokit/rest';
import { ConfigLoader } from '../config/ConfigLoader.js';

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

export class GitHubClient {
  private octokit: Octokit;
  private config: GitHubConfig['github'];
  
  constructor(token: string) {
    const configLoader = ConfigLoader.getInstance();
    this.config = configLoader.get('github').github;
    
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
  
  async createCommitStatus(
    sha: string,
    state: 'error' | 'failure' | 'pending' | 'success',
    description: string,
    targetUrl?: string
  ): Promise<void> {
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
  
  async getRepository(): Promise<any> {
    const response = await this.octokit.repos.get({
      owner: this.config.repository.owner,
      repo: this.config.repository.name
    });
    return response.data;
  }
  
  async listWorkflowRuns(workflowId: string | number): Promise<any> {
    const response = await this.octokit.actions.listWorkflowRuns({
      owner: this.config.repository.owner,
      repo: this.config.repository.name,
      workflow_id: workflowId
    });
    return response.data;
  }
}
