import { GitHubAuthService } from './github';

export class PresentationService {
  /**
   * Generate presentation and save to DynamoDB
   */
  static async generatePresentation(formData: any): Promise<{ success: boolean; message: string; requestId?: string; url?: string; html?: string }> {
    const user = GitHubAuthService.getUser();
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    try {
      console.log('Generating presentation and saving to DynamoDB...');
      
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
            id: user.id,
            node_id: (user as any).node_id
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', response.status, errorData);
        
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
          message: 'Presentación generada y guardada exitosamente'
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

  /**
   * Get all presentations for current user
   */
  static async getUserPresentations(): Promise<any[]> {
    const user = GitHubAuthService.getUser();
    
    if (!user) {
      return [];
    }

    try {
      const userId = user.id || (user as any).node_id;
      const response = await fetch(`/api/list-presentations?userId=${userId}`);
      
      if (!response.ok) {
        console.error('Error fetching presentations:', response.status);
        return [];
      }

      const result = await response.json();
      return result.presentations || [];
    } catch (error) {
      console.error('Error fetching presentations:', error);
      return [];
    }
  }

  /**
   * Get single presentation by ID
   */
  static async getPresentation(presentationId: string): Promise<any | null> {
    try {
      const response = await fetch(`/api/get-presentation?presentationId=${presentationId}`);
      
      if (!response.ok) {
        return null;
      }

      const result = await response.json();
      return result.presentation || null;
    } catch (error) {
      console.error('Error fetching presentation:', error);
      return null;
    }
  }

  /**
   * Delete presentation
   */
  static async deletePresentation(presentationId: string): Promise<boolean> {
    const user = GitHubAuthService.getUser();
    
    if (!user) {
      return false;
    }

    try {
      const userId = user.id || (user as any).node_id;
      const response = await fetch('/api/delete-presentation', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          presentationId,
          userId
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting presentation:', error);
      return false;
    }
  }
}
