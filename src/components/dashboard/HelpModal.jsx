import { useState } from 'react';

const HelpModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const PROMPT = `Aplica la sintaxis de tipografía artística a este slide:

Slide actual:
{
  "message": "Tu mensaje aquí",
  "explanation": "Tu explicación aquí"
}

Sintaxis de tipografía:
- Usa | para marcar palabras con estilo especial: |tamaño:peso|palabra|
- Tamaños disponibles: sm, md, lg, xl
- Pesos disponibles: thin, light, normal, medium, bold, black

REGLAS IMPORTANTES:
1. Máximo 2 palabras pueden usar tamaños grandes (lg o xl)
2. El resto de palabras debe usar tamaños pequeños o medianos (sm o md)
3. NUNCA uses lg o xl en artículos (el, la, los, las, un, una, de, del, en, es, por, para, con, sin)
4. Los artículos y preposiciones deben ser sm o md
5. Reserva lg y xl solo para las palabras más importantes del mensaje

Ejemplo correcto:
"La |xl:black|deforestación| del |lg:bold|Amazonas| es una crisis global"

Devuelve solo el JSON con la sintaxis aplicada.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-n-8/95 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-n-7 border border-n-6 rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-n-4 hover:text-n-1 hover:bg-n-6 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-n-1 mb-2">
              Estiliza tus slides con IA
            </h2>
            <p className="text-n-3 leading-relaxed">
              Copia el prompt y pégalo en tu IA favorita junto con el slide que quieres mejorar. La IA aplicará automáticamente la sintaxis de tipografía artística para crear efectos visuales impactantes.
            </p>
          </div>

          {/* AI platforms */}
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://chatgpt.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-n-6 hover:bg-n-5 text-n-1 rounded-lg text-sm transition-all"
            >
              ChatGPT
            </a>
            <a 
              href="https://claude.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-n-6 hover:bg-n-5 text-n-1 rounded-lg text-sm transition-all"
            >
              Claude
            </a>
            <a 
              href="https://gemini.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-n-6 hover:bg-n-5 text-n-1 rounded-lg text-sm transition-all"
            >
              Gemini
            </a>
          </div>

          {/* Prompt preview */}
          <div className="relative bg-n-8 border border-n-6 rounded-xl p-4">
            <pre className="text-xs text-n-3 whitespace-pre-wrap font-mono overflow-x-auto max-h-48">
              {PROMPT}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-color-1 hover:bg-color-1/80 text-n-8 rounded-lg transition-all"
              title="Copiar prompt"
            >
              {copied ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
