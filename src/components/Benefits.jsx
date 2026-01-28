import { useState, useEffect, useRef } from "react";
import Heading from "./Heading";
import Section from "./Section";
import Logo from "./Logo";
import { curve } from "../assets";

const Benefits = ({ 
  fontSize = 'normal',
  heading = 'Dónde puedes enseñar',
  benefitsCards = [
    {
      id: 0,
      name: "Biblioteca Central",
      role: "Espacio Disponible",
      text: "Mesas amplias, WiFi estable, ambiente tranquilo. Coordinamos el espacio, tú llegas y enseñas. Martes y jueves, 3-5 PM disponibles.",
      image: "./assets/circleimages/home-carrusel-1.png"
    },
    {
      id: 1,
      name: "Café Comunitario",
      role: "Espacio Disponible",
      text: "Ambiente relajado, café incluido para voluntarios. Ideal para talleres de emprendimiento y marketing. Sábados 10 AM, cupo 15 personas.",
      image: "./assets/circleimages/home-carrusel-2.png"
    },
    {
      id: 2,
      name: "Plaza Comunitaria",
      role: "Espacio Disponible",
      text: "Sesiones al aire libre, buena iluminación natural. Perfecto para fotografía, diseño, contenido visual. Domingos por la tarde.",
      image: "./assets/circleimages/home-carrusel-3.png"
    },
    {
      id: 4,
      name: "Biblioteca Moderna",
      role: "Espacio Disponible",
      text: "Equipos disponibles si los participantes no traen dispositivos. Proyector y pantalla incluidos. Certificado digital para tu portafolio.",
      image: "./assets/circleimages/home-carrusel-5.png"
    }
  ]
}) => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 (first real slide)
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchDeltaX = useRef(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const originalBenefits = benefitsCards;

  // Create infinite loop: [last, ...original, first]
  const benefits = [
    originalBenefits[originalBenefits.length - 1], // Clone last
    ...originalBenefits,
    originalBenefits[0] // Clone first
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle infinite loop reset without transition
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      if (currentSlide === 0) {
        // At clone of last item, jump to real last item instantly
        setIsTransitioning(false);
        setCurrentSlide(originalBenefits.length);
      } else if (currentSlide === benefits.length - 1) {
        // At clone of first item, jump to real first item instantly
        setIsTransitioning(false);
        setCurrentSlide(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide, isTransitioning, benefits.length, originalBenefits.length]);

  // Enhanced touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return;
    touchEndX.current = e.touches[0].clientX;
    touchDeltaX.current = touchStartX.current - touchEndX.current;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current) return;
    
    const distance = touchDeltaX.current;
    const threshold = window.innerWidth < 640 ? 30 : 50; // Lower threshold for small screens
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
    touchDeltaX.current = 0;
  };

  return (
    <Section id="features" className="-mt-8 md:-mt-12 lg:-mt-16">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          fontSize={fontSize}
          title={
            <>
              {heading.split(' ').slice(0, -1).join(' ')}{" "}
              <span className="inline-block relative font-semibold">
                {heading.split(' ').slice(-1)[0]}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </>
          }
        />

        {/* Espacios de Aprendizaje Carousel Section */}
        <div className="relative">
          {/* Carousel container */}
          <div 
            className="relative overflow-hidden touch-pan-y -mx-2 sm:-mx-3 md:-mx-4"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentSlide * (isMobile ? 100 : 50)}%)`,
                willChange: isTransitioning ? 'transform' : 'auto'
              }}
            >
              {benefits.map((benefit, index) => (
                <div key={`${benefit.id}-${index}`} className="w-full md:w-1/2 flex-shrink-0 px-2 sm:px-3 md:px-4">
                  <div className="relative h-[22rem] sm:h-[26rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem] bg-n-8 rounded-xl md:rounded-2xl overflow-hidden border border-n-6 select-none">
                    {/* Background image */}
                    <div className="absolute inset-0">
                      <img
                        src={benefit.image}
                        className="w-full h-full object-cover pointer-events-none select-none"
                        width={520}
                        height={400}
                        alt="Background"
                        loading="lazy"
                        onError={(e) => {
                          console.log('Image failed to load:', benefit.image);
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                    </div>
                    
                    {/* Logo */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 lg:top-6 lg:left-6">
                      <div className="flex items-center gap-2 md:gap-3 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
                        <Logo 
                          logoSize={{ width: 28, height: 28 }}
                          textSize="text-xs sm:text-sm"
                          showText={true}
                        />
                      </div>
                    </div>
                    
                    {/* User info */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5 lg:bottom-6 lg:left-6">
                      <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-semibold mb-1">{benefit.name}</h4>
                      <p className="text-xs sm:text-sm md:text-base text-gray-400">{benefit.role}</p>
                    </div>
                  </div>
                  
                  {/* Text box - Inline on mobile, floating on larger screens */}
                  <div className="mt-3 sm:mt-4 md:relative md:-mt-32 lg:-mt-40 xl:-mt-48 md:ml-auto md:mr-4 lg:mr-6 md:w-3/5 lg:w-1/2 md:z-10">
                    <div className="bg-n-8/95 backdrop-blur-sm border border-n-1/10 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg md:shadow-2xl">
                      {/* Quote icon */}
                      <div className="mb-2 sm:mb-2.5 md:mb-3">
                        <svg width="20" height="15" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-3 sm:w-5 sm:h-4 md:w-6 md:h-5 lg:w-7 lg:h-6">
                          <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-n-1 font-mono leading-relaxed">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-4 sm:mt-5 md:mt-6 lg:mt-8 space-x-2 sm:space-x-3 md:space-x-4">
            <button 
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label="Previous slide"
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 active:bg-n-5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label="Next slide"
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 active:bg-n-5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-3 sm:mt-4 space-x-2">
              {originalBenefits.map((_item, index) => {
                // Map current slide to original benefits index
                const realIndex = currentSlide === 0 ? originalBenefits.length - 1 : 
                                 currentSlide === benefits.length - 1 ? 0 : 
                                 currentSlide - 1;
                return (
                  <button
                    key={index}
                    onClick={() => !isTransitioning && setCurrentSlide(index + 1)}
                    disabled={isTransitioning}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
                      index === realIndex ? 'bg-color-1 w-8 sm:w-10 md:w-12' : 'bg-n-6 w-2 hover:bg-n-5'
                    } disabled:opacity-50`}
                  />
                );
              })}
          </div>

          {/* Swipe indicator for mobile */}
          <div className="flex justify-center mt-2 sm:mt-3 md:hidden">
            <p className="text-xs text-n-4 opacity-60">
              ← Desliza para navegar →
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
