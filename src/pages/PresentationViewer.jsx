import { useEffect, useState, useRef } from 'react';
import { PresentationsAPI } from '../shared/utils/presentations-api';
import Button from '../components/Button';
import Logo from '../components/Logo';
import ParticleLogo from '../components/presentation/ParticleLogo';

const PresentationViewer = ({ setCurrentPage }) => {
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const menuRef = useRef(null);

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
    // Total slides = 1 (ParticleLogo) + slides.length
    if (currentSlide < slides.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && showAccessibilityMenu) {
        setShowAccessibilityMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAccessibilityMenu]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (slides && currentSlide < slides.length) {
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

  // Adjust for ParticleLogo as first slide
  const slide = currentSlide === 0 ? null : slides[currentSlide - 1];
  const totalSlides = slides.length + 1; // +1 for ParticleLogo
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      {/* Show ParticleLogo as first slide (slide 0) */}
      {currentSlide === 0 ? (
        <div className="relative z-10 h-screen">
          <ParticleLogo />
        </div>
      ) : (
        <>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-color-1 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-color-2 rounded-full blur-3xl"></div>
          </div>

          {/* Main content - FULL VIEWPORT - Professional & Responsive */}
          <div 
            className={`fixed inset-0 z-10 flex flex-col justify-center bg-gradient-to-br from-n-8 via-n-8/95 to-n-7/90 backdrop-blur-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 overflow-y-auto overflow-x-hidden animate-scaleIn ${
              fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-pink-500 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
            </div>
            
            {/* Professional Design - Responsive & Clean */}
            <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5 relative z-10 px-4">
              {/* Main message - Bold & Readable */}
              <h1 className={`font-black leading-[1.1] text-center uppercase bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-fadeInUp break-words ${
                fontSize === 'small'
                  ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'
                  : fontSize === 'large'
                  ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                  : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
              }`} style={{ letterSpacing: '-0.03em', wordSpacing: '0.05em', textShadow: '0 0 80px rgba(168,85,247,0.3)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {slide.title}
              </h1>
              
              {/* Content - Clean & Readable */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 max-w-3xl mx-auto">
                {slide.content.map((point, index) => (
                  <p
                    key={index}
                    className={`text-center font-light text-n-2/90 animate-fadeIn break-words ${
                      fontSize === 'small'
                        ? 'text-xs sm:text-sm'
                        : fontSize === 'large'
                        ? 'text-sm sm:text-base md:text-lg lg:text-xl'
                        : 'text-xs sm:text-sm md:text-base lg:text-lg'
                    }`}
                    style={{ animationDelay: `${index * 0.15 + 0.3}s`, letterSpacing: '0.01em', lineHeight: '1.6', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                  >
                    {point}
                  </p>
                ))}
              </div>
            </div>

            {/* Logo - Bottom Left inside presentation */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20">
              <Logo 
                logoSize={{ width: 24, height: 24 }}
                textSize="text-xs"
                className="opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </>
      )}

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
            {currentSlide + 1} / {totalSlides}
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
          disabled={currentSlide === totalSlides - 1}
          className="p-2 bg-n-6 hover:bg-n-5 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
        >
          <svg className="w-5 h-5 text-n-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Back to Dashboard button */}
      <div className="fixed top-6 left-6 z-[100]">
        <Button onClick={() => setCurrentPage('dashboard')} white>
          ← Volver al Dashboard
        </Button>
      </div>

      {/* Accessibility Button */}
      <div className="fixed top-6 right-6 z-[100]" ref={menuRef}>
        <Button 
          onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
          white
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-semibold">Aa</span>
          </span>
        </Button>

        {/* Accessibility Controls Panel */}
        {showAccessibilityMenu && (
        <div className="absolute top-full mt-2 right-0 bg-n-8/95 backdrop-blur-xl border border-n-6/50 rounded-2xl p-6 shadow-2xl w-80 animate-fadeIn">
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
              className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                fontSize === 'small'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              {menuLanguage === 'en' ? 'Small' : menuLanguage === 'pt' ? 'Pequeno' : 'Pequeño'}
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                fontSize === 'normal'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              {menuLanguage === 'en' ? 'Medium' : menuLanguage === 'pt' ? 'Médio' : 'Mediano'}
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                fontSize === 'large'
                  ? 'bg-n-1 text-n-8'
                  : 'bg-n-7 text-n-3 hover:bg-n-6'
              }`}
            >
              {menuLanguage === 'en' ? 'Large' : menuLanguage === 'pt' ? 'Grande' : 'Grande'}
            </button>
          </div>
        </div>

      </div>
      )}
      </div>

      {/* Circle Up branding */}
      <div className="absolute bottom-6 right-6 text-n-4 text-sm opacity-50">
        Circle Up AI
      </div>
    </div>
  );
};

export default PresentationViewer;
