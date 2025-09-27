import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import Typewriter from "typewriter-effect";

import { curve } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Section from "./Section";

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
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
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

          {/* Description paragraph removed */}

          {/* Button removed */}
        </div>

        <div className="relative max-w-[28rem] mx-auto md:max-w-6xl xl:mb-24">

          <BackgroundCircles />
        </div>

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
