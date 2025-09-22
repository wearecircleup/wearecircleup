import { useState, useEffect } from "react";
import Section from "./Section";

// Help Carousel Component
const HelpCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/src/assets/circleimages/help-carrusel-1.png",
    "/src/assets/circleimages/help-carrusel-2.png",
    "/src/assets/circleimages/help-carrusel-3.png",
    "/src/assets/circleimages/help-carrusel-4.png",
    "/src/assets/circleimages/help-carrusel-5.png"
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
        <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className={`container relative z-2 ${className}`}>
        <div className="relative z-1 grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* 3D Stacked boxes effect - spread out card deck */}
              <div className="relative">
                {/* Third card (back of deck) */}
                <div className="absolute top-8 left-12 w-[28rem] h-[28rem] bg-n-6/15 rounded-2xl transform rotate-12 shadow-lg"></div>
                {/* Second card (middle of deck) */}
                <div className="absolute top-5 left-8 w-[28rem] h-[28rem] bg-n-6/25 rounded-2xl transform rotate-6 shadow-lg"></div>
                {/* First card (almost top of deck) */}
                <div className="absolute top-2 left-4 w-[28rem] h-[28rem] bg-n-6/35 rounded-2xl transform rotate-3 shadow-lg"></div>
                {/* Front card with carousel images (top of deck) */}
                <div className="relative w-[28rem] h-[28rem] bg-n-8 rounded-2xl overflow-hidden shadow-2xl">
                  <HelpCarousel />
                  {/* Subtle overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-n-8/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Voice input indicator */}
          <div className="absolute bottom-0 left-0 flex items-center bg-n-7 rounded-full px-4 py-2 border border-n-6">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs">?</span>
            </div>
            <span className="text-n-3 text-sm">¿Tienes dudas?</span>
            <div className="ml-4 flex space-x-1">
              <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="relative">
            <h1 className="h1 mb-6">{title}</h1>
            <p className="body-1 mb-8 text-n-4">
              {subtitle}
            </p>
            
            <div className="space-y-6">
              {cards.map((card, index) => (
                <div key={index} className="flex items-center p-6 bg-n-7 rounded-xl border border-n-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-xl">{card.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-n-1 mb-1">{card.title}</h3>
                    <p className="text-n-4">{card.description}</p>
                    {card.email && (
                      <p className="text-color-1">{card.email}</p>
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
