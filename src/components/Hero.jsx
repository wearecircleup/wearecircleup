import { useRef } from "react";
import Typewriter from "typewriter-effect";

import { curve } from "../assets";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import Section from "./Section";
import HeroParticleLogo from "./HeroParticleLogo";

const Hero = ({ 
  fontSize = 'normal',
  subtitle = 'Circle Up Volunteer',
  title = 'Sabes algo que alguien necesita',
  typewriterStrings = [
    "Tu Excel puede cambiar una carrera.",
    "Tu diseño puede abrir puertas.",
    "Tu experiencia vale más de lo que crees.",
    "2 horas tuyas = un futuro diferente.",
    "No enseñas porque sabes todo.<br/>Enseñas porque sabes algo."
  ],
  metadata = {
    location: 'Tocancipá, Colombia',
    impact: 'Vidas impactadas',
    cost: 'Gratis siempre'
  }
}) => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-32 sm:pt-36 md:pt-40 lg:pt-48 -mt-20 md:-mt-24"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div ref={parallaxRef} className="container relative">
        <div className="relative z-1 w-full mx-auto mb-12 sm:mb-16 md:mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* Left: Hero Text */}
            <div className="lg:col-span-7 text-center lg:text-left relative z-20 px-4 sm:px-6 lg:px-0">
              <div className="uppercase tracking-widest text-n-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-xs sm:text-sm font-light">
                {subtitle}
              </div>
              
              <h1 className={`leading-[0.9] font-bold text-n-1 mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tighter ${
                fontSize === 'small' 
                  ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl' 
                  : fontSize === 'large'
                  ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]'
                  : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'
              }`}>
                {title.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {word}{i < arr.length - 1 ? ' ' : ''}
                    {(i === 1 || i === 3) && <br className="hidden sm:block" />}
                  </span>
                ))}
              </h1>
              
              {/* Typewriter interactivo */}
              <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                <div className={`text-n-3 font-light leading-relaxed ${
                  fontSize === 'small'
                    ? 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
                    : fontSize === 'large'
                    ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'
                    : 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'
                }`}>
                  <Typewriter
                    options={{
                      strings: typewriterStrings,
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </div>
              </div>
              
              {/* Metadata minimalista */}
              <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-n-4 tracking-wider font-light ${
                fontSize === 'small'
                  ? 'text-[0.625rem] sm:text-xs md:text-sm'
                  : fontSize === 'large'
                  ? 'text-sm sm:text-base md:text-lg'
                  : 'text-xs sm:text-sm md:text-base'
              }`}>
                <span>{metadata.location}</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span>{metadata.impact}</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span>{metadata.cost}</span>
              </div>
            </div>
            
            {/* Right: Visual minimalista con partículas */}
            <div className="lg:col-span-5 relative group z-10 mt-8 lg:mt-0 flex items-end">
              <div className="relative aspect-square w-full max-w-[336px] sm:max-w-[384px] md:max-w-[480px] mx-auto lg:max-w-none">
                {/* Background circles behind particles */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <BackgroundCircles />
                  </div>
                </div>
                {/* Particles on top */}
                <div className="relative z-10 h-full">
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
