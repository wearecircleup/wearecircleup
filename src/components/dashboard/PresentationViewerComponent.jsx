import { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import Logo from '../Logo';
import ParticleLogo from '../presentation/ParticleLogo';

// Parse message with asterisk emphasis markers
const parseMessageWithEmphasis = (message) => {
  if (!message) return [];
  
  // Split by asterisk patterns while preserving them
  const parts = [];
  let currentText = '';
  let i = 0;
  
  while (i < message.length) {
    // Check for 4 asterisks (****word****)
    if (message.substr(i, 4) === '****') {
      if (currentText) parts.push({ text: currentText, weight: 'normal' });
      currentText = '';
      i += 4;
      let emphasisText = '';
      while (i < message.length && message.substr(i, 4) !== '****') {
        emphasisText += message[i];
        i++;
      }
      if (emphasisText) parts.push({ text: emphasisText, weight: 'black' });
      i += 4;
    }
    // Check for 3 asterisks (***word***)
    else if (message.substr(i, 3) === '***') {
      if (currentText) parts.push({ text: currentText, weight: 'normal' });
      currentText = '';
      i += 3;
      let emphasisText = '';
      while (i < message.length && message.substr(i, 3) !== '***') {
        emphasisText += message[i];
        i++;
      }
      if (emphasisText) parts.push({ text: emphasisText, weight: 'bold' });
      i += 3;
    }
    // Check for 2 asterisks (**word**)
    else if (message.substr(i, 2) === '**') {
      if (currentText) parts.push({ text: currentText, weight: 'normal' });
      currentText = '';
      i += 2;
      let emphasisText = '';
      while (i < message.length && message.substr(i, 2) !== '**') {
        emphasisText += message[i];
        i++;
      }
      if (emphasisText) parts.push({ text: emphasisText, weight: 'medium' });
      i += 2;
    }
    // Check for 1 asterisk (*word*)
    else if (message[i] === '*') {
      if (currentText) parts.push({ text: currentText, weight: 'normal' });
      currentText = '';
      i++;
      let emphasisText = '';
      while (i < message.length && message[i] !== '*') {
        emphasisText += message[i];
        i++;
      }
      if (emphasisText) parts.push({ text: emphasisText, weight: 'light' });
      i++;
    }
    else {
      currentText += message[i];
      i++;
    }
  }
  
  if (currentText) parts.push({ text: currentText, weight: 'normal' });
  return parts;
};

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
  
  // Support both old format (title + content) and new format (message + explanation)
  if (slide && !slide.message && slide.title) {
    slide.message = slide.title;
    slide.explanation = slide.content ? slide.content.join('. ') : '';
  }
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
                {/* Main impactful message - 70% of space */}
                <div className="flex-[7] flex items-center justify-center mb-6 sm:mb-8">
                  <h1 className={`leading-tight text-center ${
                    fontSize === 'small'
                      ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                      : fontSize === 'large'
                      ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl'
                      : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                  }`}>
                    {parseMessageWithEmphasis(slide.message || slide.title).map((part, idx) => {
                      const weightClasses = {
                        light: 'font-light',
                        normal: 'font-normal',
                        medium: 'font-medium',
                        bold: 'font-bold',
                        black: 'font-black'
                      };
                      return (
                        <span 
                          key={idx} 
                          className={`bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent ${weightClasses[part.weight]}`}
                        >
                          {part.text}
                        </span>
                      );
                    })}
                  </h1>
                </div>
                
                {/* Complementary explanation - 20% of space */}
                <div className="flex-[2] flex items-start justify-center">
                  <p className={`text-n-3 italic leading-relaxed text-center max-w-4xl ${
                    fontSize === 'small'
                      ? 'text-sm sm:text-base md:text-lg lg:text-xl'
                      : fontSize === 'large'
                      ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
                      : 'text-base sm:text-lg md:text-xl lg:text-2xl'
                  }`}>
                    {slide.explanation || (slide.content && slide.content.join(' '))}
                  </p>
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
