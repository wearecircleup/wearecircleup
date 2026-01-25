import { useState } from "react";
import Button from "../Button";
import { presentationFormSchema } from "../../shared/schemas/presentation.schema";
import { PresentationService } from "../../shared/utils/presentation";

const CreatePresentation = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    numSlides: 10,
    language: "es-LA",
    theme: "modern",
    model: "gpt-4o"
  });
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate word count for description
    const wordCount = formData.description.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 50) {
      setErrors({ description: 'Tu historia merece más. Comparte al menos 50 palabras para que podamos crear algo increíble juntos.' });
      return;
    }
    if (wordCount > 200) {
      setErrors({ description: 'Menos es más. Mantengamos el enfoque en lo esencial: máximo 200 palabras.' });
      return;
    }
    
    try {
      const validated = presentationFormSchema.parse(formData);
      setErrors({});
      setIsGenerating(true);
      setNotification(null);
      
      const result = await PresentationService.generatePresentation(validated);
      
      setIsGenerating(false);
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: result.message
        });
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          numSlides: 10,
          language: "es-LA",
          theme: "modern",
          model: "gpt-4o"
        });
        
        // Notify parent to refresh presentations list
        if (onSuccess) onSuccess();
      } else {
        setNotification({
          type: 'error',
          message: result.message
        });
      }
      
    } catch (error) {
      setIsGenerating(false);
      
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        setNotification({
          type: 'error',
          message: 'Error al validar el formulario'
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-n-6 text-n-4 hover:border-color-1/50 hover:text-n-1 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-n-1">
            Crea algo memorable
          </h2>
          <p className="text-n-4">Tu historia, amplificada por IA</p>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`p-4 rounded-xl border ${
          notification.type === 'success' 
            ? 'bg-green-500/10 border-green-500/50 text-green-400' 
            : 'bg-red-500/10 border-red-500/50 text-red-400'
        } backdrop-blur-sm`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              )}
            </div>
            <p className="flex-1">{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-2xl p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-n-1 font-medium mb-2">
              Dale un nombre a tu historia
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="El futuro que queremos construir"
              className={`w-full bg-n-8/50 border ${errors.title ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-n-1 font-medium mb-2">
              ¿Qué quieres que recuerden?
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Imagina que estás en un escenario. ¿Qué mensajes clave quieres que tu audiencia se lleve a casa? Escribe como si estuvieras conversando, no leyendo. Tus slides serán el arte visual que acompaña tu voz."
              rows="5"
              className={`w-full bg-n-8/50 border ${errors.description ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors resize-none`}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-n-4">
                {formData.description.split(/\s+/).filter(w => w.length > 0).length} palabras
                {formData.description.split(/\s+/).filter(w => w.length > 0).length < 50 && (
                  <span className="text-color-1 ml-2">Comparte al menos 50 para crear magia</span>
                )}
                {formData.description.split(/\s+/).filter(w => w.length > 0).length > 200 && (
                  <span className="text-color-2 ml-2">Mantengamos el enfoque: máximo 200</span>
                )}
              </p>
            </div>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Grid for smaller inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Number of Slides */}
            <div>
              <label className="block text-n-1 font-medium mb-2">
                ¿Cuántos momentos?
              </label>
              <input
                type="number"
                name="numSlides"
                value={formData.numSlides}
                onChange={handleInputChange}
                min="5"
                max="50"
                className={`w-full bg-n-8/50 border ${errors.numSlides ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors`}
              />
              {errors.numSlides && <p className="text-red-500 text-sm mt-1">{errors.numSlides}</p>}
            </div>

            {/* Language */}
            <div>
              <label className="block text-n-1 font-medium mb-2">
                Tu idioma
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors"
              >
                <option value="es-LA">Español (Latino)</option>
                <option value="en-US">Inglés (USA)</option>
                <option value="pt-BR">Português (Brasil)</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-n-1 font-medium mb-2">
                Estilo visual
              </label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors"
              >
                <option value="modern">Moderno</option>
                <option value="academic">Académico</option>
                <option value="minimal">Minimalista</option>
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-n-1 font-medium mb-2">
                Cerebro creativo
              </label>
              <select
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors"
              >
                <option value="gpt-4o">GPT-4o (Recomendado)</option>
                <option value="meta-llama/Llama-3.1-70B-Instruct">Llama 3.1 70B</option>
                <option value="microsoft/Phi-3-medium-128k-instruct">Phi-3 Medium</option>
              </select>
            </div>
          </div>


          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              white
              disabled={isGenerating}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-n-1 border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando tu obra maestra...</span>
                </div>
              ) : (
                'Crear Presentación'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePresentation;
