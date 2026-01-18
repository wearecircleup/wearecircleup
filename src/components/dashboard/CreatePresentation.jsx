import { useState } from "react";
import Button from "../Button";
import { presentationFormSchema } from "../../shared/schemas/presentation.schema";
import { PresentationService } from "../../shared/utils/presentation";

const CreatePresentation = ({ user, onBack, onSuccess }) => {
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
        
        // Save to localStorage
        const presentations = JSON.parse(localStorage.getItem(`presentations_${user.login}`) || '[]');
        presentations.unshift({
          id: result.requestId || crypto.randomUUID(), // Use same ID from workflow
          ...validated,
          status: 'processing',
          createdAt: new Date().toISOString(),
          url: null
        });
        localStorage.setItem(`presentations_${user.login}`, JSON.stringify(presentations));
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          numSlides: 10,
          language: "es-LA",
          theme: "modern",
          model: "gpt-4o"
        });
        
        // Notify parent
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
            Nueva Presentación
          </h2>
          <p className="text-n-4">Genera contenido profesional con AI</p>
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
              Título de la Presentación *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="ej., Acción Climática 2026"
              className={`w-full bg-n-8/50 border ${errors.title ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-n-1 font-medium mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe de qué debería tratar tu presentación..."
              rows="4"
              className={`w-full bg-n-8/50 border ${errors.description ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors resize-none`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Grid for smaller inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Number of Slides */}
            <div>
              <label className="block text-n-1 font-medium mb-2">
                Número de Diapositivas *
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
                Idioma de Salida *
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
                Tema *
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
                Modelo de AI *
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
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando...
                </span>
              ) : (
                'Generar Presentación'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePresentation;
