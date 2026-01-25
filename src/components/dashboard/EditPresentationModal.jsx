import { useState } from 'react';
import Button from '../Button';
import HelpModal from './HelpModal';

const EditPresentationModal = ({ presentation, onClose, onSave }) => {
  const [jsonContent, setJsonContent] = useState(
    JSON.stringify(presentation, null, 2)
  );
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleSave = async () => {
    setError(null);
    
    try {
      // Validate JSON structure
      const parsed = JSON.parse(jsonContent);
      
      // Validate required fields
      if (!parsed.id || !parsed.title || !Array.isArray(parsed.slides)) {
        setError('JSON inválido: debe contener id, title y slides (array)');
        return;
      }

      // Validate slides structure
      for (let i = 0; i < parsed.slides.length; i++) {
        const slide = parsed.slides[i];
        if (!slide.message && !slide.title) {
          setError(`Slide ${i + 1}: debe contener "message" o "title"`);
          return;
        }
        if (!slide.explanation && !slide.content) {
          setError(`Slide ${i + 1}: debe contener "explanation" o "content"`);
          return;
        }
      }

      setIsSaving(true);
      await onSave(parsed);
      
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Error de sintaxis JSON: ' + err.message);
      } else {
        setError('Error al guardar: ' + err.message);
      }
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-n-8/90 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-n-7 border border-n-6 rounded-2xl shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-n-6">
          <div>
            <h2 className="text-2xl font-bold text-n-1">
              Dale tu toque personal
            </h2>
            <p className="text-sm text-n-4 mt-1">
              Edita el contenido y usa IA para aplicar estilos visuales increíbles
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
            className="w-full h-full min-h-[400px] bg-n-8 border border-n-6 rounded-xl p-4 text-n-1 font-mono text-sm focus:border-color-1 focus:outline-none resize-none"
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
        <div className="flex items-center justify-between p-6 border-t border-n-6">
          {/* Help button */}
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-2 px-4 py-2 text-n-3 hover:text-n-1 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Ayuda</span>
          </button>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onClose}
              className="px-6"
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="px-6"
              white
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-n-1 border-t-transparent rounded-full animate-spin"></div>
                  <span>Guardando...</span>
                </div>
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default EditPresentationModal;
