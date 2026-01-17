import { useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import { GitHubAuthService } from "../shared/utils/github";
import { presentationFormSchema } from "../shared/schemas/presentation.schema";
import { PresentationService } from "../shared/utils/presentation";

const Dashboard = ({ setCurrentPage }) => {
  const user = GitHubAuthService.getUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    numSlides: 10,
    theme: "modern",
    model: "gpt-4o",
    options: {
      includeSpeakerNotes: true,
      addReferences: false,
      tone: "professional"
    }
  });
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('options.')) {
      const optionKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        options: {
          ...prev.options,
          [optionKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }));
    }
    
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
      
      // Disparar el workflow de GitHub Actions
      const result = await PresentationService.generatePresentation(validated);
      
      setIsGenerating(false);
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: result.message
        });
        
        // Limpiar formulario después de éxito
        setFormData({
          title: "",
          description: "",
          numSlides: 10,
          theme: "modern",
          model: "gpt-4o",
          options: {
            includeSpeakerNotes: true,
            addReferences: false,
            tone: "professional"
          }
        });
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

  const handleLogout = () => {
    GitHubAuthService.logout();
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Stars background */}
      <div className="absolute inset-0 opacity-20">
        <img src="./assets/hero/stars.svg" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 lg:top-20 lg:left-20 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-r from-color-1/20 to-color-2/20 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-16 lg:top-40 lg:right-32 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-color-2/20 to-color-3/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-16 lg:bottom-32 lg:left-32 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-r from-color-3/20 to-color-1/20 rounded-full blur-xl"></div>

      <Section className="min-h-screen py-6 lg:py-10">
        <div className="container max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-n-1 mb-2">
                Crear Presentación{" "}
                <span className="inline-block relative">
                  con AI
                  <svg
                    className="absolute top-full left-0 w-full xl:-mt-2"
                    width="200"
                    height="12"
                    viewBox="0 0 624 28"
                    fill="none"
                  >
                    <path
                      d="M1 26.5C43 13.5 123.5 0.5 312 0.5C500.5 0.5 581 13.5 623 26.5"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="1" y1="26.5" x2="623" y2="26.5">
                        <stop stopColor="#AC6AFF" />
                        <stop offset="1" stopColor="#FFC876" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              <p className="text-n-4 text-base lg:text-lg">
                Bienvenido de nuevo, <span className="text-color-1 font-medium">{user?.username || 'Usuario'}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setCurrentPage('home')} className="text-sm lg:text-base">
                ← Inicio
              </Button>
              <Button onClick={handleLogout} white className="text-sm lg:text-base">
                Cerrar Sesión
              </Button>
            </div>
          </div>

          {/* Notification */}
          {notification && (
            <div className={`mb-6 p-4 rounded-xl border ${
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
          <div className="relative">
            <div className="absolute -top-3 -left-6 w-full h-full bg-n-6/15 rounded-2xl transform rotate-2 shadow-lg hidden lg:block"></div>
            <div className="absolute -top-2 -left-3 w-full h-full bg-n-6/25 rounded-2xl transform rotate-1 shadow-lg hidden lg:block"></div>
            
            <div className="relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-2xl p-6 lg:p-12 shadow-2xl">
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

                  {/* Tone */}
                  <div>
                    <label className="block text-n-1 font-medium mb-2">
                      Tono
                    </label>
                    <select
                      name="options.tone"
                      value={formData.options.tone}
                      onChange={handleInputChange}
                      className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors"
                    >
                      <option value="professional">Profesional</option>
                      <option value="casual">Casual</option>
                      <option value="academic">Académico</option>
                    </select>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="block text-n-1 font-medium mb-2">
                    Opciones Adicionales
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="options.includeSpeakerNotes"
                      checked={formData.options.includeSpeakerNotes}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-n-1/10 bg-n-8/50 text-color-1 focus:ring-color-1"
                    />
                    <span className="text-n-3">Incluir notas del presentador</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="options.addReferences"
                      checked={formData.options.addReferences}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-n-1/10 bg-n-8/50 text-color-1 focus:ring-color-1"
                    />
                    <span className="text-n-3">Agregar referencias</span>
                  </label>
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

        </div>
      </Section>
    </div>
  );
};

export default Dashboard;
