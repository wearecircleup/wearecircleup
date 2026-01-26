import { useState } from 'react';
import Button from '../Button';

const ImportPresentationModal = ({ onClose, onImport, user }) => {
  const [jsonContent, setJsonContent] = useState('');
  const [error, setError] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    setError(null);
    
    try {
      // Validate JSON structure
      const parsed = JSON.parse(jsonContent);
      
      // Validate required fields
      if (!Array.isArray(parsed.slides)) {
        setError('El JSON debe contener un campo "slides" con un array de slides');
        return;
      }

      if (parsed.slides.length === 0) {
        setError('El JSON debe contener al menos 1 slide');
        return;
      }

      // Validate each slide
      for (let i = 0; i < parsed.slides.length; i++) {
        const slide = parsed.slides[i];
        if (!slide.message && !slide.title) {
          setError(`Slide ${i + 1} debe tener "message" o "title"`);
          return;
        }
        if (!slide.explanation && !slide.content) {
          setError(`Slide ${i + 1} debe tener "explanation" o "content"`);
          return;
        }
      }

      setIsImporting(true);

      // Create new presentation object with current user as owner
      const newPresentation = {
        id: crypto.randomUUID(),
        title: parsed.title || 'Presentación Importada',
        description: parsed.description || 'Presentación compartida',
        slides: parsed.slides,
        metadata: {
          theme: parsed.metadata?.theme || 'modern',
          model: parsed.metadata?.model || 'imported',
          language: parsed.metadata?.language || 'es-LA',
          slideCount: parsed.slides.length,
          username: user.login
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'completed'
      };

      // Call parent handler to save
      await onImport(newPresentation);
      
      onClose();
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('JSON inválido. Verifica la sintaxis.');
      } else {
        setError(err.message || 'Error al importar presentación');
      }
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-n-8/90 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-n-7 border border-n-6 rounded-2xl shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-n-6">
          <div>
            <h2 className="text-2xl font-bold text-n-1">
              Importar presentación compartida
            </h2>
            <p className="text-sm text-n-4 mt-1">
              Pega el JSON de una presentación compartida
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-n-4 hover:text-n-1 hover:bg-n-6 transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* JSON Editor */}
        <div className="flex-1 overflow-auto p-6">
          <textarea
            value={jsonContent}
            onChange={(e) => setJsonContent(e.target.value)}
            placeholder='Pega aquí el JSON compartido...'
            className="w-full h-full min-h-[400px] bg-n-8 border border-n-6 rounded-xl p-4 text-n-1 font-mono text-sm focus:outline-none focus:border-color-1 resize-none"
            spellCheck={false}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-n-6">
          <Button
            onClick={onClose}
            className="px-6"
            disabled={isImporting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleImport}
            className="px-6"
            white
            disabled={isImporting || !jsonContent.trim()}
          >
            {isImporting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-n-1 border-t-transparent rounded-full animate-spin"></div>
                <span>Importando...</span>
              </div>
            ) : (
              'Importar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportPresentationModal;
