import { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import Logo from '../Logo';
import ParticleLogo from '../presentation/ParticleLogo';

const PresentationViewerComponent = ({ presentation, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fontSize, setFontSize] = useState('normal'); // small, normal, large
  const [fontFamily, setFontFamily] = useState('sans'); // sans, serif, mono
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [menuLanguage, setMenuLanguage] = useState('es'); // en, es, pt
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const menuRef = useRef(null);

  const slides = presentation.slides || [];

  const nextSlide = () => {
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < slides.length) {
          setCurrentSlide(currentSlide + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setCurrentSlide(currentSlide - 1);
        }
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slides, currentSlide]);

  const slide = currentSlide === 0 ? null : slides[currentSlide - 1];
  const totalSlides = slides.length + 1; // +1 for ParticleLogo
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-n-8 via-n-7 to-n-8 overflow-hidden z-50">
      {/* Show ParticleLogo as first slide */}
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

          {/* Main content */}
          <div 
            className="relative z-10 h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-20"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full h-full max-w-7xl flex items-center justify-center">
              <div 
                className={`relative w-full h-full flex flex-col justify-center bg-n-7/50 backdrop-blur-xl border border-n-6/50 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-2xl ${
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

                {/* Logo */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <Logo 
                    logoSize={{ width: 24, height: 24 }}
                    textSize="text-xs"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Navigation controls */}
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

      {/* Back button */}
      <div className="fixed top-6 left-6 z-[100]">
        <Button onClick={onBack} white>
          ← Volver
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

        {/* Accessibility Menu */}
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

            {/* Font Family */}
            <div className="mb-6">
              <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                {menuLanguage === 'en' ? 'FONT FAMILY' : menuLanguage === 'pt' ? 'FAMÍLIA DA FONTE' : 'FAMILIA DE FUENTE'}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontFamily('sans')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    fontFamily === 'sans' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                  }`}
                >
                  Sans Serif
                </button>
                <button
                  onClick={() => setFontFamily('serif')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    fontFamily === 'serif' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                  }`}
                >
                  Serif
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                {menuLanguage === 'en' ? 'FONT SIZE' : menuLanguage === 'pt' ? 'TAMANHO DA FONTE' : 'TAMAÑO DE FUENTE'}
              </h3>
              
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

              <div className="flex gap-2">
                <button
                  onClick={() => setFontSize('small')}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    fontSize === 'small' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                  }`}
                >
                  {menuLanguage === 'en' ? 'Small' : menuLanguage === 'pt' ? 'Pequeno' : 'Pequeño'}
                </button>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    fontSize === 'normal' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                  }`}
                >
                  {menuLanguage === 'en' ? 'Medium' : menuLanguage === 'pt' ? 'Médio' : 'Mediano'}
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    fontSize === 'large' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                  }`}
                >
                  {menuLanguage === 'en' ? 'Large' : menuLanguage === 'pt' ? 'Grande' : 'Grande'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Branding */}
      <div className="absolute bottom-6 right-6 text-n-4 text-sm opacity-50">
        Circle Up AI
      </div>
    </div>
  );
};

export default PresentationViewerComponent;
