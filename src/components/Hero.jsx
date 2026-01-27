import { useRef, useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

import { curve } from "../assets";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import Section from "./Section";
import HeroParticleLogo from "./HeroParticleLogo";

// Hero Images Infinite Carousel Component
const HeroImagesGrid = () => {
  const images = [
    "./assets/circleimages/hero-carrusel-1.png",
    "./assets/circleimages/hero-carrusel-2.png",
    "./assets/circleimages/hero-carrusel-3.png",
    "./assets/circleimages/hero-carrusel-4.png",
    "./assets/circleimages/hero-carrusel-5.png",
    "./assets/circleimages/hero-carrusel-6.png",
    "./assets/circleimages/hero-carrusel-7.png",
    "./assets/circleimages/hero-carrusel-8.png",
    "./assets/circleimages/hero-carrusel-9.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  // Create extended array for seamless infinite scroll
  const extendedImages = [...images, ...images, ...images];
  const startIndex = images.length; // Start from the middle set

  // Auto-scroll functionality with seamless infinite loop
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Handle seamless infinite scroll reset
  useEffect(() => {
    if (currentIndex >= images.length * 2) {
      // When we reach the end of the second set, jump back to the beginning of the first set
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 700); // Wait for transition to complete
    } else if (currentIndex < startIndex) {
      // When we go before the first set, jump to the end of the second set
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex + images.length - 1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 700);
    }
  }, [currentIndex, images.length, startIndex]);

  // Initialize at the middle set
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoScrolling(false);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    if (isRightSwipe) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }

    setTimeout(() => setIsAutoScrolling(true), 3000);
    e.preventDefault();
  };

  // Mouse handlers for desktop
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  // Calculate image width based on viewport
  const getImageWidth = (viewportType) => {
    if (viewportType === 'mobile') return 100 / 2; // 2 images visible
    return 100 / 3; // 3 images visible for desktop and tablet
  };

  return (
    <div className="w-full relative">
      {/* Desktop Carousel - Shows 3 images */}
      <div className="hidden lg:block relative overflow-hidden">
        <div 
          ref={carouselRef}
          className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ 
            transform: `translateX(-${currentIndex * getImageWidth('desktop')}%)`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {extendedImages.map((image, index) => (
            <div 
              key={`desktop-${index}`}
              className="flex-shrink-0 px-3"
              style={{ width: `${getImageWidth('desktop')}%` }}
            >
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="aspect-[1/1.2] relative">
                  <img
                    src={image}
                    alt={`Hero image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.log('Hero image failed to load:', image);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet Carousel - Shows 3 images */}
      <div className="hidden md:block lg:hidden relative overflow-hidden">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ 
            transform: `translateX(-${currentIndex * getImageWidth('tablet')}%)`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {extendedImages.map((image, index) => (
            <div 
              key={`tablet-${index}`}
              className="flex-shrink-0 px-2"
              style={{ width: `${getImageWidth('tablet')}%` }}
            >
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="aspect-[1/1.2] relative">
                  <img
                    src={image}
                    alt={`Hero image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.log('Hero image failed to load:', image);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Carousel - Shows 2 images */}
      <div className="block md:hidden relative overflow-hidden">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
          style={{ 
            transform: `translateX(-${currentIndex * getImageWidth('mobile')}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {extendedImages.map((image, index) => (
            <div 
              key={`mobile-${index}`}
              className="flex-shrink-0 px-2"
              style={{ width: `${getImageWidth('mobile')}%` }}
            >
              <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102">
                <div className="aspect-[1/1.2] relative">
                  <img
                    src={image}
                    alt={`Hero image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      console.log('Hero image failed to load:', image);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              (currentIndex - startIndex) % images.length === index 
                ? 'bg-blue-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => {
              setCurrentIndex(startIndex + index);
              setIsAutoScrolling(false);
              setTimeout(() => setIsAutoScrolling(true), 5000);
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = ({ fontSize = 'normal' }) => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div ref={parallaxRef} className="container relative">
        <div className="relative z-1 max-w-[90rem] mx-auto mb-20 md:mb-32 lg:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left: Hero Text */}
            <div className="lg:col-span-7 text-center lg:text-left relative z-20">
              <div className={`uppercase tracking-[0.25em] text-n-4 mb-6 md:mb-8 lg:mb-10 ${
                fontSize === 'small' 
                  ? 'text-[clamp(0.5rem,0.8vw,0.65rem)]' 
                  : fontSize === 'large'
                  ? 'text-[clamp(0.65rem,1.1vw,0.875rem)]'
                  : 'text-[clamp(0.55rem,0.95vw,0.75rem)]'
              } font-light`}>
                Circle Up Volunteer
              </div>
              
              <h1 className={`leading-[0.9] font-bold text-n-1 mb-8 md:mb-12 tracking-tighter ${
                fontSize === 'small' 
                  ? 'text-[clamp(2rem,5vw,6rem)]' 
                  : fontSize === 'large'
                  ? 'text-[clamp(3rem,8vw,10rem)]'
                  : 'text-[clamp(2.5rem,7vw,9rem)]'
              }`}>
                Sabes algo <br className="hidden sm:block" />que alguien <br className="hidden sm:block" />necesita
              </h1>
              
              {/* Typewriter interactivo */}
              <div className="mb-12 md:mb-16">
                <div className={`text-n-3 font-light leading-relaxed ${
                  fontSize === 'small' 
                    ? 'text-[clamp(1rem,2vw,1.5rem)]' 
                    : fontSize === 'large'
                    ? 'text-[clamp(1.5rem,3vw,2.5rem)]'
                    : 'text-[clamp(1.25rem,2.5vw,2rem)]'
                }`}>
                  <Typewriter
                    options={{
                      strings: [
                        "Tu Excel puede cambiar una carrera.",
                        "Tu diseño puede abrir puertas.",
                        "Tu experiencia vale más de lo que crees.",
                        "2 horas tuyas = un futuro diferente.",
                        "No enseñas porque sabes todo.<br/>Enseñas porque sabes algo.",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </div>
              </div>
              
              {/* Metadata minimalista */}
              <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-n-4 tracking-wider ${
                fontSize === 'small' 
                  ? 'text-[clamp(0.6rem,0.9vw,0.75rem)]' 
                  : fontSize === 'large'
                  ? 'text-[clamp(0.75rem,1.2vw,1rem)]'
                  : 'text-[clamp(0.65rem,1vw,0.875rem)]'
              } font-light`}>
                <span>Tocancipá, Colombia</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span>127 vidas impactadas</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span>Gratis siempre</span>
              </div>
            </div>
            
            {/* Right: Visual minimalista con partículas */}
            <div className="lg:col-span-5 relative group z-10">
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none scale-[1.4] lg:-translate-x-[20%]">
                {/* Background circles behind particles */}
                <div className="absolute inset-0 z-0">
                  <BackgroundCircles />
                </div>
                {/* Particles on top */}
                <div className="relative z-10">
                  <HeroParticleLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
