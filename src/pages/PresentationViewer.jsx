import { useEffect, useState } from 'react';
import { PresentationsAPI } from '../shared/utils/presentations-api';

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
    <div className="min-h-screen bg-gradient-to-br from-n-8 via-n-7 to-n-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-color-1 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-color-2 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl w-full">
          {/* Slide content */}
          <div className="bg-n-7/50 backdrop-blur-xl border border-n-6/50 rounded-3xl p-16 shadow-2xl">
            <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-color-1 to-color-2 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            
            <div className="space-y-6">
              {slide.content.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 text-2xl text-n-2 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-color-1 font-bold">•</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>

            {slide.notes && (
              <div className="mt-12 p-6 bg-n-6/30 border-l-4 border-color-2 rounded-lg">
                <p className="text-n-4 italic">{slide.notes}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="px-6 py-3 bg-n-6 hover:bg-n-5 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
            >
              <svg className="w-6 h-6 text-n-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <span className="text-n-3 text-lg">
                {currentSlide + 1} / {slides.length}
              </span>
              <div className="w-64 h-2 bg-n-6 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-color-1 to-color-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="px-6 py-3 bg-n-6 hover:bg-n-5 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
            >
              <svg className="w-6 h-6 text-n-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Keyboard hints */}
          <div className="mt-6 text-center text-n-4 text-sm">
            Usa las flechas ← → o la barra espaciadora para navegar
          </div>
        </div>
      </div>

      {/* CircleUp branding */}
      <div className="absolute bottom-6 right-6 text-n-4 text-sm opacity-50">
        CircleUp AI
      </div>
    </div>
  );
};

export default PresentationViewer;
