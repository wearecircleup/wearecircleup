import { useRef, useState, useEffect } from "react";
import { ScrollParallax } from "react-just-parallax";
import Typewriter from "typewriter-effect";

import { curve } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Section from "./Section";

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

const Hero = () => {
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
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[1rem] md:mb-4 lg:mb-[1.5rem]">
          <h1 className="h1 mb-6">
            <span className="inline-block relative font-semibold">
              Circle Up Volunteer
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          
          <div className="mt-8 mb-8">
            <div className="text-4xl md:text-6xl lg:text-6xl font-mono text-n-1">
              <Typewriter
                options={{
                  strings: [
                    "Habilidades Digitales",
                    "Inteligencia Artificial",
                    "Finanzas Personales",
                    "Diseño y Creatividad",
                    "Liderazgo",
                    "Comunicación Efectiva",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>

          {/* Hero Images Grid */}
          <div className="mt-8 mb-2">
            <HeroImagesGrid />
          </div>
        </div>

        <div className="relative max-w-[28rem] mx-auto md:max-w-6xl xl:mb-4">
          <BackgroundCircles />
        </div>

        <CompanyLogos className="hidden relative z-10 mt-4 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
