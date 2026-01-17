export interface PresentationMetadata {
  id: string;
  title: string;
  description: string;
  author: string;
  theme: string;
  model: string;
  slides_count: number;
  created_at: string;
  status: 'completed' | 'processing' | 'failed';
  url: string;
  thumbnail?: string;
}

export class PresentationsAPI {
  /**
   * Fetch all presentations for a user from GitHub repository
   */
  static async getUserPresentations(username: string): Promise<PresentationMetadata[]> {
    try {
      const owner = import.meta.env.VITE_GITHUB_REPO_OWNER || 'wearecircleup';
      const repo = import.meta.env.VITE_GITHUB_REPO_NAME || 'wearecircleup';
      const metadataPath = `presentations/metadata/${username}`;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${metadataPath}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          // User has no presentations yet
          return [];
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const files = await response.json();
      
      if (!Array.isArray(files)) {
        return [];
      }

      // Fetch each YAML file and parse metadata
      const presentations = await Promise.all(
        files
          .filter((file: any) => file.name.endsWith('.yaml'))
          .map(async (file: any) => {
            try {
              const fileResponse = await fetch(file.download_url);
              const yamlContent = await fileResponse.text();
              
              return this.parseYAML(yamlContent);
            } catch (error) {
              console.error(`Error fetching ${file.name}:`, error);
              return null;
            }
          })
      );

      return presentations
        .filter((p): p is PresentationMetadata => p !== null)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
    } catch (error) {
      console.error('Error fetching presentations:', error);
      return [];
    }
  }

  /**
   * Parse YAML content to PresentationMetadata
   */
  private static parseYAML(yamlContent: string): PresentationMetadata | null {
    try {
      const lines = yamlContent.split('\n');
      const metadata: any = {};
      
      lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim().replace(/^"|"$/g, '');
        
        if (key && value) {
          metadata[key] = value;
        }
      });

      const owner = import.meta.env.VITE_GITHUB_REPO_OWNER || 'wearecircleup';
      const repo = import.meta.env.VITE_GITHUB_REPO_NAME || 'wearecircleup';
      
      return {
        id: metadata.id || '',
        title: metadata.title || 'Untitled',
        description: '', // Not stored in YAML, could be added
        author: metadata.author || '',
        theme: metadata.theme || 'modern',
        model: metadata.model || 'gpt-4o',
        slides_count: parseInt(metadata.slides_count) || 0,
        created_at: metadata.created_at || new Date().toISOString(),
        status: metadata.status || 'completed',
        url: `https://${owner}.github.io/${repo}${metadata.url}`,
        thumbnail: undefined
      };
    } catch (error) {
      console.error('Error parsing YAML:', error);
      return null;
    }
  }

  /**
   * Get presentation content (slides JSON)
   */
  static async getPresentationContent(username: string, presentationId: string): Promise<any> {
    try {
      const owner = import.meta.env.VITE_GITHUB_REPO_OWNER || 'wearecircleup';
      const repo = import.meta.env.VITE_GITHUB_REPO_NAME || 'wearecircleup';
      const contentPath = `presentations/content/${username}/${presentationId}.json`;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${contentPath}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const contentResponse = await fetch(data.download_url);
      return await contentResponse.json();
      
    } catch (error) {
      console.error('Error fetching presentation content:', error);
      return null;
    }
  }
}
