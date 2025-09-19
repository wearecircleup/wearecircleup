import { useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import { curve } from "../assets";

const Benefits = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const stakeholders = [
    {
      id: 0,
      name: "María González",
      role: "Participante",
      text: "Los talleres me ayudaron a conseguir trabajo. Aprendí Excel y comunicación efectiva en solo 3 semanas. Ahora tengo las herramientas que necesitaba.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 1,
      name: "Carlos Ramírez",
      role: "Voluntario Experto", 
      text: "Compartir mi experiencia en marketing digital con la comunidad ha sido increíble. Ver cómo las personas aplican lo aprendido en sus proyectos me motiva a seguir.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 2,
      name: "Ana Torres",
      role: "Coordinadora de Sede",
      text: "Nuestra biblioteca se ha convertido en un hub de aprendizaje. Los talleres traen vida a nuestro espacio y conectan a la comunidad de manera única.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 3,
      name: "Luis Mendoza",
      role: "Emprendedor",
      text: "Circle Up me conectó con mentores y herramientas prácticas. Lancé mi negocio después de los talleres de emprendimiento y finanzas personales.",
      image: "/src/assets/services/service-3.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (stakeholders.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (stakeholders.length - 1)) % (stakeholders.length - 1));
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

        {/* Testimonials Carousel Section */}
        <div className="relative">
          {/* Carousel container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 50}%)` }}
            >
              {stakeholders.map((stakeholder, index) => (
                <div key={stakeholder.id} className="w-1/2 flex-shrink-0 px-4">
                  <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem] border border-n-6">
                    {/* Background image */}
                    <div className="absolute inset-0">
                      <img
                        src={stakeholder.image}
                        className="w-full h-full object-cover pointer-events-none select-none"
                        width={520}
                        height={400}
                        alt="Background"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                    </div>
                    
                    {/* Logo */}
                    <div className="absolute top-6 left-6 flex items-center">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">C</span>
                      </div>
                      <span className="text-white font-semibold">Circle Up</span>
                    </div>
                    
                    {/* User info */}
                    <div className="absolute bottom-6 left-6">
                      <h4 className="text-white font-semibold text-lg mb-1">{stakeholder.name}</h4>
                      <p className="text-gray-400 text-sm">{stakeholder.role}</p>
                    </div>
                    
                    {/* Testimonial text */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90%]">
                      <div className="bg-n-7/90 backdrop-blur-sm border border-purple-500 rounded-xl p-6">
                        <p className="text-white text-sm leading-relaxed mb-4">
                          {stakeholder.text}
                        </p>
                        <button className="text-xs font-code font-bold tracking-wider uppercase border border-white/20 rounded px-4 py-2 text-white hover:bg-white/10 transition-colors">
                          VER TALLERES
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
