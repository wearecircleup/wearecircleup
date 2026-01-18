import { useEffect, useState } from 'react';
import { PresentationsAPI } from '../shared/utils/presentations-api';
import Button from '../components/Button';

const PresentationViewer = () => {
  // Extract userId and presentationId from URL
  const pathname = window.location.pathname;
  const match = pathname.match(/^\/p\/([^/]+)\/([^/]+)/);
  const userId = match ? match[1] : null;
  const presentationId = match ? match[2] : null;
  const [slides, setSlides] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fontSize, setFontSize] = useState('normal'); // small, normal, large
  const [fontFamily, setFontFamily] = useState('sans'); // sans, serif, mono
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [menuLanguage, setMenuLanguage] = useState('es'); // en, es, pt

  const loadPresentation = async () => {
    try {
      setLoading(true);
      const content = await PresentationsAPI.getPresentationContent(userId, presentationId);
      
      if (!content || !content.slides) {
        throw new Error('Invalid presentation format');
      }

      setSlides(content.slides);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPresentation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, presentationId]);

  const nextSlide = () => {
    if (slides && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (slides && currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setCurrentSlide(currentSlide - 1);
        }
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(slides?.length - 1 || 0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slides, currentSlide]);


  if (loading) {
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-color-1 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-n-4">Cargando presentación...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error al cargar la presentación</p>
          <p className="text-n-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="min-h-screen bg-n-8 flex items-center justify-center">
        <p className="text-n-4">No hay slides disponibles</p>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-n-8 via-n-7 to-n-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-color-1 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-color-2 rounded-full blur-3xl"></div>
      </div>

      {/* Main content - Full screen */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-20">
        <div className="w-full h-full max-w-7xl flex items-center justify-center">
          {/* Slide content - Responsive sizing with accessibility */}
          <div 
            className={`w-full h-full flex flex-col justify-center bg-n-7/50 backdrop-blur-xl border border-n-6/50 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-2xl ${
              fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
            }`}
          >
            <h1 className={`font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent leading-tight ${
              fontSize === 'small'
                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
                : fontSize === 'large'
                ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
            }`}>
              {slide.title}
            </h1>
            
            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 flex-1 flex flex-col justify-center">
              {slide.content.map((point, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 sm:gap-4 text-n-2 animate-fadeIn ${
                    fontSize === 'small'
                      ? 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
                      : fontSize === 'large'
                      ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'
                      : 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-color-1 font-bold flex-shrink-0">•</span>
                  <p className="leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Navigation controls - Bottom center */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-n-7/90 backdrop-blur-xl border border-n-6/50 rounded-2xl px-6 py-3 shadow-2xl">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-2 bg-n-6 hover:bg-n-5 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
        >
          <svg className="w-5 h-5 text-n-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-n-3 text-sm font-medium whitespace-nowrap">
            {currentSlide + 1} / {slides.length}
          </span>
          <div className="w-32 sm:w-48 md:w-64 h-2 bg-n-6 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-color-1 to-color-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-2 bg-n-6 hover:bg-n-5 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
        >
          <svg className="w-5 h-5 text-n-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Back to Dashboard button */}
      <div className="fixed top-6 left-6 z-[100]">
        <Button onClick={() => window.location.href = '/dashboard'} white>
          ← Volver al Dashboard
        </Button>
      </div>

      {/* Accessibility Button */}
      <button
        onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
        className="fixed top-6 right-6 z-[100] group relative bg-n-1 hover:bg-n-2 text-n-8 rounded-xl p-3 shadow-2xl transition-all"
        title="Accessibility Settings"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="absolute -bottom-1 -right-1 bg-color-1 text-n-1 text-xs font-bold px-1.5 py-0.5 rounded-full">Aa</span>
      </button>

      {/* Accessibility Controls Panel */}
      {showAccessibilityMenu && (
      <div className="fixed top-20 right-6 z-[100] bg-n-8/95 backdrop-blur-xl border border-n-6/50 rounded-2xl p-6 shadow-2xl w-80 animate-fadeIn">
        {/* Language Selector */}
        <div className="flex justify-end gap-1 mb-4">
          <button
            onClick={() => setMenuLanguage('en')}
            className={`px-2 py-1 text-xs font-medium rounded transition-all ${
              menuLanguage === 'en' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setMenuLanguage('es')}
            className={`px-2 py-1 text-xs font-medium rounded transition-all ${
              menuLanguage === 'es' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setMenuLanguage('pt')}
            className={`px-2 py-1 text-xs font-medium rounded transition-all ${
              menuLanguage === 'pt' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
            }`}
          >
            PT
          </button>
        </div>

        {/* Font Family Section */}
        <div className="mb-6">
          <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
            {menuLanguage === 'en' ? 'FONT FAMILY' : menuLanguage === 'pt' ? 'FAMÍLIA DA FONTE' : 'FAMILIA DE FUENTE'}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFontFamily('sans')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                fontFamily === 'sans'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              Sans Serif
            </button>
            <button
              onClick={() => setFontFamily('serif')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                fontFamily === 'serif'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              Serif
            </button>
          </div>
        </div>

        {/* Font Size Section */}
        <div className="mb-6">
          <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
            {menuLanguage === 'en' ? 'FONT SIZE' : menuLanguage === 'pt' ? 'TAMANHO DA FONTE' : 'TAMAÑO DE FUENTE'}
          </h3>
          
          {/* Size Slider */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'small' : fontSize === 'large' ? 'normal' : 'small')}
              className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <div className="flex-1 mx-4 text-center">
              <div className="text-n-1 font-semibold">
                {fontSize === 'small' 
                  ? (menuLanguage === 'en' ? 'Small' : menuLanguage === 'pt' ? 'Pequeno' : 'Pequeño')
                  : fontSize === 'large' 
                  ? (menuLanguage === 'en' ? 'Large' : menuLanguage === 'pt' ? 'Grande' : 'Grande')
                  : (menuLanguage === 'en' ? 'Medium' : menuLanguage === 'pt' ? 'Médio' : 'Mediano')}
              </div>
              <div className="text-n-4 text-xs">
                {fontSize === 'small' ? '14px' : fontSize === 'large' ? '20px' : '16px'}
              </div>
            </div>
            <button
              onClick={() => setFontSize(fontSize === 'small' ? 'normal' : fontSize === 'normal' ? 'large' : 'large')}
              className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Size Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFontSize('small')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                fontSize === 'small'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              {menuLanguage === 'en' ? 'Small' : menuLanguage === 'pt' ? 'Pequeno' : 'Pequeño'}
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                fontSize === 'normal'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              {menuLanguage === 'en' ? 'Medium' : menuLanguage === 'pt' ? 'Médio' : 'Mediano'}
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                fontSize === 'large'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              {menuLanguage === 'en' ? 'Large' : menuLanguage === 'pt' ? 'Grande' : 'Grande'}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
            {menuLanguage === 'en' ? 'PREVIEW' : menuLanguage === 'pt' ? 'VISUALIZAÇÃO' : 'VISTA PREVIA'}
          </h3>
          <div className={`p-4 bg-n-7 rounded-xl ${
            fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
          }`}>
            <p className={`text-n-2 ${
              fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}>
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </div>
      )}

      {/* CircleUp branding */}
      <div className="absolute bottom-6 right-6 text-n-4 text-sm opacity-50">
        CircleUp AI
      </div>
    </div>
  );
};

export default PresentationViewer;
