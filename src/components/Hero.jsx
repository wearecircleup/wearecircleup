import { useRef, useState, useEffect } from "react";
import { ScrollParallax } from "react-just-parallax";
import Typewriter from "typewriter-effect";

import { curve } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Section from "./Section";

// Hero Images Grid Component
const HeroImagesGrid = () => {
  const images = [
    "./assets/circleimages/hero-carrusel-1.png",
    "./assets/circleimages/hero-carrusel-2.png",
    "./assets/circleimages/hero-carrusel-3.png",
    "./assets/circleimages/hero-carrusel-4.png",
    "./assets/circleimages/hero-carrusel-5.png"
  ];

  return (
    <div className="w-full">
      {/* Desktop Grid - 4 columns for larger images */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {images.slice(0, 4).map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <div className="aspect-[1/1.2] relative">
              <img
                src={image}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  console.log('Hero image failed to load:', image);
                  e.target.style.display = 'none';
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet Grid - 2 columns for larger images */}
      <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {images.slice(0, 4).map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <div className="aspect-[1/1.2] relative">
              <img
                src={image}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  console.log('Hero image failed to load:', image);
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Grid - Optimized for phone */}
      <div className="grid md:hidden grid-cols-2 gap-2 px-2">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102"
          >
            <div className="aspect-[1/1.2] relative">
              <img
                src={image}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  console.log('Hero image failed to load:', image);
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Small Mobile Grid - for very small screens */}
      <div className="grid sm:hidden grid-cols-1 gap-2 px-4 max-w-xs mx-auto">
        {images.slice(0, 3).map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-[3/2] relative">
              <img
                src={image}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  console.log('Hero image failed to load:', image);
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
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
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[2rem] md:mb-8 lg:mb-[3rem]">
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
