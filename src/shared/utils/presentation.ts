import { ConfigService } from './config';
import { GitHubAuthService } from './github';

export class PresentationService {
  static async generatePresentation(formData: any): Promise<{ success: boolean; message: string; requestId?: string; url?: string; html?: string }> {
    const user = GitHubAuthService.getUser();
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    try {
      console.log('Generating presentation via Vercel Function...');
      
      // Call Vercel Function instead of GitHub Actions
      const response = await fetch('/api/generate-presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          slides: formData.numSlides,
          model: formData.model,
          language: formData.language,
          theme: formData.theme,
          user: {
            login: user.login,
            username: user.username,
            id: user.id
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Vercel Function Error:', response.status, errorData);
        
        return {
          success: false,
          message: `Error al generar presentación: ${errorData.error || 'Error desconocido'}`
        };
      }

      const result = await response.json();
      
      if (result.success) {
        return {
          success: true,
          requestId: result.presentationId,
          url: result.url,
          html: result.html,
          message: 'Presentación generada exitosamente. Se está guardando en el repositorio...'
        };
      } else {
        return {
          success: false,
          message: result.error || 'Error al generar presentación'
        };
      }
    } catch (error) {
      console.error('Error generating presentation:', error);
      
      return {
        success: false,
        message: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.'
      };
    }
  }
}
