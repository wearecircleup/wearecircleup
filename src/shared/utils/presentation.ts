import { ConfigService } from './config';
import { GitHubAuthService } from './github';

export class PresentationService {
  private static config = ConfigService.getGitHubConfig();

  static async generatePresentation(formData: any): Promise<{ success: boolean; message: string }> {
    const user = GitHubAuthService.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const payload = {
      event_type: 'generate_presentation',
      client_payload: {
        user: {
          id: user.id,
          username: user.username
        },
        presentation: {
          title: formData.title,
          description: formData.description,
          numSlides: formData.numSlides,
          theme: formData.theme,
          model: formData.model,
          options: formData.options
        },
        request_id: crypto.randomUUID()
      }
    };

    try {
      // Note: This requires a GitHub Personal Access Token with repo scope
      // For MVP, we'll use the code from OAuth (stored in user object)
      // In production, this should be handled by a backend endpoint
      
      const response = await fetch(
        `https://api.github.com/repos/${this.config.github.repository.owner}/${this.config.github.repository.name}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${(user as any).code}`, // Using OAuth code temporarily
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub API Error:', errorText);
        throw new Error(`Failed to trigger workflow: ${response.status} ${response.statusText}`);
      }

      return {
        success: true,
        message: 'Presentación en proceso de generación. Te notificaremos cuando esté lista.'
      };
    } catch (error) {
      console.error('Error generating presentation:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido al generar presentación'
      };
    }
  }
}
