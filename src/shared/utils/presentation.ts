import { ConfigService } from './config';
import { GitHubAuthService } from './github';

export class PresentationService {
  static async generatePresentation(formData: any): Promise<{ success: boolean; message: string }> {
    const user = GitHubAuthService.getUser();
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const config = ConfigService.getGitHubConfig();
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
      // Trigger GitHub Actions workflow via repository_dispatch
      const response = await fetch(
        `https://api.github.com/repos/${config.github.repository.owner}/${config.github.repository.name}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_PUBLIC_TOKEN || ''}`,
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub API Error:', response.status, errorText);
        
        // Fallback: Store in localStorage
        const presentations = JSON.parse(localStorage.getItem('pending_presentations') || '[]');
        presentations.push({
          ...payload.client_payload,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('pending_presentations', JSON.stringify(presentations));
        
        return {
          success: false,
          message: `Error al disparar workflow (${response.status}). ` +
                   `Verifica que VITE_GITHUB_PUBLIC_TOKEN esté configurado correctamente en las variables de entorno.`
        };
      }

      // repository_dispatch returns 204 No Content on success
      return {
        success: true,
        message: `¡Presentación en proceso! El workflow se está ejecutando. ` +
                 `Recibirás una notificación cuando esté lista (aprox. 2-3 minutos).`
      };
    } catch (error) {
      console.error('Error generating presentation:', error);
      
      // Store locally as fallback
      const presentations = JSON.parse(localStorage.getItem('pending_presentations') || '[]');
      presentations.push({
        ...payload.client_payload,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('pending_presentations', JSON.stringify(presentations));
      
      return {
        success: false,
        message: 'Error de conexión. Tu presentación se guardó localmente. ' +
                 'Revisa la consola del navegador para más detalles.'
      };
    }
  }
}
