import { useState } from 'react';
import Button from '../Button';

const EXAMPLE_PROMPT = `Aplica la sintaxis de tipografía artística a este slide:

Slide actual:
{
  "message": "Tu mensaje aquí",
  "explanation": "Tu explicación aquí"
}

Sintaxis de tipografía:
- Usa | para marcar palabras con estilo especial: |tamaño:peso|palabra|
- Tamaños: xs, sm, md, lg, xl
- Pesos: thin, light, normal, medium, bold, black

Ejemplo:
"El |xl:black|futuro| es |lg:bold|ahora|"

Devuelve solo el JSON con la sintaxis aplicada.`;

const EditPresentationModal = ({ presentation, onClose, onSave }) => {
  const [jsonContent, setJsonContent] = useState(
    JSON.stringify(presentation, null, 2)
  );
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
        <div className="flex flex-col gap-4 p-6 border-t border-n-6">
          {/* Help section */}
          <div className="flex items-start gap-3 p-4 bg-n-8/50 border border-n-6/30 rounded-xl">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-n-1 mb-2">Tipografía artística</h3>
              <p className="text-xs text-n-4 mb-3">
                Usa IA para aplicar estilos visuales. Copia el prompt y pégalo en ChatGPT con tu slide.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <code className="px-2 py-1 bg-n-7 border border-n-6 rounded text-color-1">|xl:black|palabra|</code>
                <span className="text-n-5">→</span>
                <span className="text-n-3">Extra grande y negrita</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs mt-1">
                <code className="px-2 py-1 bg-n-7 border border-n-6 rounded text-color-2">|sm:light|texto|</code>
                <span className="text-n-5">→</span>
                <span className="text-n-3">Pequeño y delgado</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                navigator.clipboard.writeText(EXAMPLE_PROMPT);
                // Visual feedback
                const btn = e.currentTarget;
                const originalText = btn.textContent;
                btn.textContent = 'Copiado';
                setTimeout(() => {
                  btn.textContent = originalText;
                }, 2000);
              }}
              className="px-4 py-2 bg-color-1 hover:bg-color-1/80 text-n-8 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
              title="Copiar prompt de ejemplo"
            >
              Copiar prompt
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3">
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
    </div>
  );
};

export default EditPresentationModal;
