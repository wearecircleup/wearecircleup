import { useState, useEffect } from "react";
import Section from "./Section";

// Help Carousel Component
const HelpCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "./assets/circleimages/help-carrusel-1.png",
    "./assets/circleimages/help-carrusel-2.png",
    "./assets/circleimages/help-carrusel-3.png",
    "./assets/circleimages/help-carrusel-4.png",
    "./assets/circleimages/help-carrusel-5.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Help ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

const NeedHelp = ({ 
  title = "¿Necesitas apoyo?", 
  subtitle = "Estamos aquí para acompañarte", 
  cards = [],
  className = "",
  sectionClassName = "overflow-hidden"
}) => {
  return (
    <Section className={sectionClassName}>
      {/* Background grid only on left side */}
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-40 z-0">
        <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className={`container relative z-2 px-4 lg:px-0 ${className}`}>
        <div className="relative z-1 grid gap-6 md:gap-8 lg:gap-10 lg:grid-cols-2 items-center">
          <div className="relative w-full flex justify-center">
            <div className="relative">
              {/* 3D Stacked boxes effect - properly centered */}
              <div className="relative">
                {/* Third card (back of deck) */}
                <div className="absolute -top-4 sm:-top-6 md:-top-8 -left-6 sm:-left-8 md:-left-12 w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem] bg-n-6/15 rounded-xl md:rounded-2xl transform rotate-12 shadow-lg"></div>
                {/* Second card (middle of deck) */}
                <div className="absolute -top-2 sm:-top-3 md:-top-5 -left-4 sm:-left-5 md:-left-8 w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem] bg-n-6/25 rounded-xl md:rounded-2xl transform rotate-6 shadow-lg"></div>
                {/* First card (almost top of deck) */}
                <div className="absolute -top-1 -left-2 md:-left-4 w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem] bg-n-6/35 rounded-xl md:rounded-2xl transform rotate-3 shadow-lg"></div>
                {/* Front card with carousel images (top of deck) - centered */}
                <div className="relative w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem] bg-n-8 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mx-auto">
                  <HelpCarousel />
                  {/* Subtle overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-n-8/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Voice input indicator - responsive positioning */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-0 lg:left-0 flex items-center bg-n-7 rounded-full px-3 sm:px-4 py-2 border border-n-6 text-xs sm:text-sm">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
              <span className="text-white text-xs">?</span>
            </div>
            <span className="text-n-3">¿Tienes dudas?</span>
            <div className="ml-2 sm:ml-4 flex space-x-1">
              <div className="w-1 h-3 sm:h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-4 sm:h-6 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-3 sm:h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-4 sm:h-6 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="relative">
            <h1 className="h1 mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left">{title}</h1>
            <p className="body-1 mb-6 md:mb-8 text-n-4 text-sm sm:text-base text-center lg:text-left">
              {subtitle}
            </p>
            
            <div className="space-y-4 md:space-y-6">
              {cards.map((card, index) => (
                <div key={index} className="flex items-center p-4 sm:p-6 bg-n-7 rounded-xl border border-n-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    {card.iconType === 'email' ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-n-1 mb-1">{card.title}</h3>
                    <p className="text-n-4 text-sm sm:text-base">{card.description}</p>
                    {card.email && (
                      <p className="text-color-1 text-sm sm:text-base">{card.email}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NeedHelp;
