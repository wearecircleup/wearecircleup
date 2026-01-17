import { describe, test, expect, beforeEach, vi } from 'vitest';
import { GitHubClient } from '../../../../backend/services/github/GitHubClient';

vi.mock('@octokit/rest', () => {
  const mockOctokit = {
    repos: {
      createDispatchEvent: vi.fn(),
      createCommitStatus: vi.fn(),
      get: vi.fn()
    },
    actions: {
      listWorkflowRuns: vi.fn()
    }
  };
  
  return {
    Octokit: vi.fn(() => mockOctokit)
  };
});

describe('GitHubClient', () => {
  let client: GitHubClient;
  
  beforeEach(() => {
    process.env.GITHUB_REPO_OWNER = 'test_owner';
    process.env.GITHUB_REPO_NAME = 'test_repo';
    client = new GitHubClient('test-token');
  });
  
  test('initializes with correct configuration', () => {
    expect(client).toBeDefined();
  });
  
  test('dispatches event correctly', async () => {
    const mockDispatch = vi.fn().mockResolvedValue({});
    client['octokit'].repos.createDispatchEvent = mockDispatch;
    
    await client.dispatchEvent('test-event', { data: 'test' });
    
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        event_type: 'test-event',
        client_payload: { data: 'test' }
      })
    );
  });
  
  test('creates commit status correctly', async () => {
    const mockStatus = vi.fn().mockResolvedValue({});
    client['octokit'].repos.createCommitStatus = mockStatus;
    
    await client.createCommitStatus('abc123', 'success', 'Test passed');
    
    expect(mockStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        sha: 'abc123',
        state: 'success',
        description: 'Test passed',
        context: 'circleup/presentation-generator'
      })
    );
  });
  
  test('creates commit status with target URL', async () => {
    const mockStatus = vi.fn().mockResolvedValue({});
    client['octokit'].repos.createCommitStatus = mockStatus;
    
    await client.createCommitStatus(
      'abc123',
      'success',
      'Test passed',
      'https://example.com'
    );
    
    expect(mockStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        target_url: 'https://example.com'
      })
    );
  });
  
  test('gets repository information', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: { name: 'test_repo', owner: { login: 'test_owner' } }
    });
    client['octokit'].repos.get = mockGet;
    
    const repo = await client.getRepository();
    
    expect(mockGet).toHaveBeenCalled();
    expect(repo).toBeDefined();
  });
  
  test('lists workflow runs', async () => {
    const mockList = vi.fn().mockResolvedValue({
      data: { workflow_runs: [] }
    });
    client['octokit'].actions.listWorkflowRuns = mockList;
    
    const runs = await client.listWorkflowRuns('test-workflow');
    
    expect(mockList).toHaveBeenCalledWith(
      expect.objectContaining({
        workflow_id: 'test-workflow'
      })
    );
    expect(runs).toBeDefined();
  });
});
