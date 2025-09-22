import { useState, useEffect } from "react";
import Heading from "./Heading";
import Section from "./Section";
import Logo from "./Logo";
import { curve } from "../assets";

const Benefits = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stakeholders = [
    {
      id: 0,
      name: "Biblioteca Central",
      role: "Espacio de Aprendizaje",
      text: "Un lugar tranquilo y acogedor donde puedes concentrarte en aprender nuevas habilidades con el apoyo de voluntarios expertos.",
      image: "./assets/circleimages/home-carrusel-1.png"
    },
    {
      id: 1,
      name: "Café Comunitario",
      role: "Espacio de Aprendizaje", 
      text: "Aprende mientras disfrutas de un café. Un ambiente relajado perfecto para talleres de emprendimiento y networking.",
      image: "./assets/circleimages/home-carrusel-2.png"
    },
    {
      id: 2,
      name: "Plaza Comunitaria",
      role: "Espacio de Aprendizaje",
      text: "Conecta con tu comunidad. Un espacio donde la tradición te permite crear experiencias de aprendizaje únicas y colaborativas.",
      image: "./assets/circleimages/home-carrusel-3.png"
    },
    {
      id: 3,
      name: "Espacio Natural",
      role: "Espacio de Aprendizaje",
      text: "Aprende en armonía. Un ambiente donde el arte, la creatividad y el conocimiento fluyen naturalmente bajo el cielo abierto.",
      image: "./assets/circleimages/home-carrusel-4.png"
    },
    {
      id: 4,
      name: "Biblioteca Moderna",
      role: "Espacio de Aprendizaje",
      text: "Un espacio que eleva tu experiencia de aprendizaje. Perfecto para estudio colaborativo y talleres en un ambiente contemporáneo.",
      image: "./assets/circleimages/home-carrusel-5.png"
    },
    {
      id: 5,
      name: "Plaza Patrimonial",
      role: "Espacio de Aprendizaje",
      text: "Aprende rodeado de historia y tradición. Un espacio donde el patrimonio cultural se convierte en talleres y memoria colectiva.",
      image: "./assets/circleimages/home-carrusel-6.png"
    },
    {
      id: 6,
      name: "Ludoteca Creativa",
      role: "Espacio de Aprendizaje",
      text: "Un mundo de colores donde el juego se convierte en aprendizaje. Espacio diseñado para talleres lúdicos, desarrollo de habilidades sociales y creatividad.",
      image: "./assets/circleimages/home-carrusel-7.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stakeholders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stakeholders.length) % stakeholders.length);
  };

  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Conecta, Aprende y Crece con{" "}
              <span className="inline-block relative font-semibold">
                Circle Up
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
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * (isMobile ? 100 : 50)}%)` 
              }}
            >
              {stakeholders.map((stakeholder, index) => (
                <div key={stakeholder.id} className="w-full md:w-1/2 flex-shrink-0 px-2 md:px-4">
                  <div className="relative h-[16rem] sm:h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem] border border-n-6">
                    {/* Background image */}
                    <div className="absolute inset-0">
                      <img
                        src={stakeholder.image}
                        className="w-full h-full object-cover pointer-events-none select-none"
                        width={520}
                        height={400}
                        alt="Background"
                        onError={(e) => {
                          console.log('Image failed to load:', stakeholder.image);
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                    </div>
                    
                    {/* Logo */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6">
                      <div className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
                        <Logo 
                          logoSize={{ width: 32, height: 32 }}
                          textSize="text-xs md:text-sm"
                          showText={true}
                        />
                      </div>
                    </div>
                    
                    {/* User info */}
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                      <h4 className="text-white font-semibold text-base md:text-lg mb-1">{stakeholder.name}</h4>
                      <p className="text-gray-400 text-xs md:text-sm">{stakeholder.role}</p>
                    </div>
                  </div>
                  
                  {/* Floating text box - responsive positioning */}
                  <div className="relative -mt-20 md:-mt-40 ml-4 mr-auto md:ml-auto md:mr-4 w-3/4 md:w-2/5 z-10">
                    <div className="bg-n-8/95 backdrop-blur-sm border border-n-1/10 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl">
                      {/* Quote icon */}
                      <div className="mb-3 md:mb-4">
                        <svg width="24" height="18" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-8 md:h-6">
                          <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                        </svg>
                      </div>
                      <p className="body-1 text-n-1 font-mono leading-relaxed text-xs md:text-sm">
                        {stakeholder.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-3 md:space-x-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-6 md:h-6">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-6 md:h-6">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dots indicator for mobile */}
          <div className="flex justify-center mt-4 space-x-2 md:hidden">
            {stakeholders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-color-1' : 'bg-n-6'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
