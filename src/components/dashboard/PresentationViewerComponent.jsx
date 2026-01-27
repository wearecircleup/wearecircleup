import { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import Logo from '../Logo';
import ParticleLogo from '../presentation/ParticleLogo';
import EditPresentationModal from './EditPresentationModal';

// Parse message with size and weight markers: |size:weight|word|
const parseMessageWithEmphasis = (message) => {
  if (!message) return [];
  
  const parts = [];
  let i = 0;
  let currentText = '';
  
  while (i < message.length) {
    // Check for marker pattern |size:weight|word|
    if (message[i] === '|') {
      // Save any accumulated text
      if (currentText.trim()) {
        parts.push({ text: currentText, size: 'md', weight: 'normal' });
        currentText = '';
      }
      
      i++; // skip opening |
      
      // Extract size:weight
      let styleStr = '';
      while (i < message.length && message[i] !== '|') {
        styleStr += message[i];
        i++;
      }
      i++; // skip closing | after style
      
      // Extract word
      let word = '';
      while (i < message.length && message[i] !== '|') {
        word += message[i];
        i++;
      }
      i++; // skip closing | after word
      
      // Parse size:weight
      const [size, weight] = styleStr.split(':');
      if (word.trim()) {
        parts.push({ 
          text: word, 
          size: size || 'md', 
          weight: weight || 'normal' 
        });
      }
    } else {
      currentText += message[i];
      i++;
    }
  }
  
  // Add remaining text
  if (currentText.trim()) {
    parts.push({ text: currentText, size: 'md', weight: 'normal' });
  }
  
  return parts;
};

const PresentationViewerComponent = ({ presentation, onBack, onUpdate, user }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fontSize, setFontSize] = useState('normal'); // small, normal, large
  const [fontFamily, setFontFamily] = useState('sans'); // sans, serif, mono
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [menuLanguage, setMenuLanguage] = useState('es'); // en, es, pt
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleSaveEdit = async (updatedPresentation) => {
    const userId = user.id || user.node_id;
    
    const response = await fetch('/api/update-presentation', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        presentationId: presentation.id,
        updatedPresentation: updatedPresentation
      })
    });

    const result = await response.json();

    if (result.success) {
      setShowEditModal(false);
      if (onUpdate) {
        onUpdate(result.presentation);
      }
    } else {
      throw new Error(result.error || 'Error al guardar');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden z-50">
        {/* Subtle grid pattern - Awwwards touch */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
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

          {/* Main content - FULL VIEWPORT - Professional & Responsive */}
          <div 
            className={`fixed inset-0 z-10 flex flex-col justify-center bg-gradient-to-br from-n-8 via-n-8/95 to-n-7/90 backdrop-blur-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 overflow-y-auto overflow-x-hidden ${
              fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
              {/* Animated gradient orbs - Awwwards signature */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-pink-500 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
              </div>
              {/* Professional Typography - Responsive & Readable */}
              <div className="flex-shrink-0 flex items-center justify-center mb-3 sm:mb-4 md:mb-5 relative z-10">
                <h1 className="leading-[1.1] text-center w-full uppercase break-words" style={{ letterSpacing: '-0.03em', wordSpacing: '0.05em', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                    {parseMessageWithEmphasis(slide.message || slide.title).map((part, idx) => {
                      // REAL Awwwards sizing - MASSIVE and responsive
                      // Professional, responsive sizing - fits viewport perfectly
                      const baseSizes = {
                        md: fontSize === 'small'
                          ? ['text-xl', 'sm:text-2xl', 'md:text-3xl', 'lg:text-4xl', 'xl:text-5xl']
                          : fontSize === 'large'
                          ? ['text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl', 'xl:text-7xl']
                          : ['text-2xl', 'sm:text-3xl', 'md:text-4xl', 'lg:text-5xl', 'xl:text-6xl'],
                        lg: fontSize === 'small'
                          ? ['text-2xl', 'sm:text-3xl', 'md:text-4xl', 'lg:text-5xl', 'xl:text-6xl']
                          : fontSize === 'large'
                          ? ['text-4xl', 'sm:text-5xl', 'md:text-6xl', 'lg:text-7xl', 'xl:text-8xl']
                          : ['text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl', 'xl:text-7xl']
                      };
                      
                      const sizeClasses = (baseSizes[part.size] || baseSizes.md).join(' ');
                      const isKeyword = part.size === 'lg' && part.weight === 'black';
                      
                      // Dynamic gradient per word based on position
                      const gradients = [
                        'from-purple-400 via-pink-400 to-orange-400',
                        'from-blue-400 via-cyan-400 to-teal-400',
                        'from-yellow-400 via-orange-400 to-red-400',
                        'from-green-400 via-emerald-400 to-cyan-400',
                        'from-pink-400 via-purple-400 to-indigo-400'
                      ];
                      const gradient = gradients[idx % gradients.length];
                      
                      return (
                        <span 
                          key={idx} 
                          className={`inline-block bg-gradient-to-br ${isKeyword ? gradient : 'from-n-1 to-n-3'} bg-clip-text text-transparent ${part.weight === 'black' ? 'font-black' : 'font-extralight'} ${sizeClasses} transition-all duration-700 ease-out hover:scale-105 ${isKeyword ? 'drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]' : ''}`}
                          style={{ 
                            textShadow: isKeyword ? '0 0 80px rgba(168,85,247,0.3)' : 'none',
                            animation: isKeyword ? `fadeInUp 0.8s ease-out ${idx * 0.15}s both` : `fadeIn 0.6s ease-out ${idx * 0.1}s both`
                          }}
                        >
                          {part.text}
                        </span>
                      );
                    })}
                </h1>
              </div>
              
              {/* Explanation - Clean & Readable */}
              <div className="flex-shrink-0 flex items-center justify-center animate-fadeIn relative z-10 px-4 mt-2 sm:mt-3 md:mt-4" style={{ animationDelay: '0.5s' }}>
                <p className={`text-center font-light text-n-2/90 max-w-3xl break-words ${
                  fontSize === 'small' 
                    ? 'text-xs sm:text-sm' 
                    : fontSize === 'large'
                    ? 'text-sm sm:text-base md:text-lg lg:text-xl'
                    : 'text-xs sm:text-sm md:text-base lg:text-lg'
                }`} style={{ letterSpacing: '0.01em', lineHeight: '1.6', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {slide.explanation || (slide.content ? slide.content.join('. ') : '')}
                </p>
              </div>

              {/* Logo */}
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
      <div className="fixed top-6 left-6 z-[100] flex items-center gap-3">
        <Button onClick={onBack} white>
          ← Volver
        </Button>
        
        {/* Edit button */}
        <button
          onClick={() => setShowEditModal(true)}
          className="p-3 bg-n-7/90 backdrop-blur-xl border border-n-6/50 rounded-xl text-n-1 hover:border-color-1 hover:text-color-1 transition-all shadow-lg"
          title="Editar presentación"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
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

    {/* Edit Modal */}
    {showEditModal && (
      <EditPresentationModal
        presentation={presentation}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
      />
    )}
    </>
  );
};

export default PresentationViewerComponent;
