import { useRef } from "react";
import Typewriter from "typewriter-effect";

import { curve } from "../assets";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import Section from "./Section";
import HeroParticleLogo from "./HeroParticleLogo";

const Hero = ({ fontSize = 'normal' }) => {
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
                Circle Up Volunteer
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] font-bold text-n-1 mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tighter">
                Sabes algo <br className="hidden sm:block" />que alguien <br className="hidden sm:block" />necesita
              </h1>
              
              {/* Typewriter interactivo */}
              <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-n-3 font-light leading-relaxed">
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
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-n-4 tracking-wider text-xs sm:text-sm md:text-base font-light">
                <span>Tocancipá, Colombia</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span>127 vidas impactadas</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span>Gratis siempre</span>
              </div>
            </div>
            
            {/* Right: Visual minimalista con partículas */}
            <div className="lg:col-span-5 relative group z-10 mt-8 lg:mt-0 overflow-hidden flex items-end">
              <div className="relative aspect-square w-full max-w-[336px] sm:max-w-[384px] md:max-w-[480px] mx-auto lg:max-w-none">
                {/* Background circles behind particles */}
                <div className="absolute inset-0 z-0">
                  <BackgroundCircles />
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
