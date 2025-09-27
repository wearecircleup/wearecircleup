import { useState } from "react";
import { service1, service2, service3, check } from "../assets";
import { circleUpServices, circleUpServicesIcons } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import { curve } from "../assets";
import {
  Gradient,
  PhotoChatMessage,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";

const Services = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Section id="how-to-use">
      <div className="container">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Descubre Nuestros{" "}
              <span className="inline-block relative font-semibold">
                Servicios
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

        <div className="relative">
          {/* Service Cards Grid */}
          <div className="relative z-1 grid gap-6 md:gap-8 lg:grid-cols-2">
            
            {/* Mentorías Personalizadas Card */}
            <div className="relative min-h-[32rem] sm:min-h-[38rem] md:min-h-[42rem] lg:min-h-[48rem] border border-n-1/10 rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Background Image - Full Coverage */}
              <div className="absolute inset-0">
                <img
                  src="./assets/circleimages/service-left.png"
                  alt="Mentorías Personalizadas"
                  className="h-full w-full object-cover pointer-events-none select-none"
                  width={630}
                  height={750}
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="relative z-10">
                  <h4 className="h4 mb-3 md:mb-4 text-white text-xl sm:text-2xl md:text-3xl font-bold">
                    Mentorías Personalizadas
                  </h4>
                  <p className="body-2 mb-6 md:mb-8 text-gray-200 text-base sm:text-lg leading-relaxed">
                    Conecta con expertos voluntarios que te guían paso a paso
                    en tu desarrollo profesional y personal.
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      1:1 Sessions
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      Expert Guidance
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      Career Growth
                    </span>
                  </div>
                </div>
              </div>

              <PhotoChatMessage />
            </div>

            {/* Talleres Interactivos Card */}
            <div className="relative min-h-[32rem] sm:min-h-[38rem] md:min-h-[42rem] lg:min-h-[48rem] border border-n-1/10 rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Background Image - Full Coverage */}
              <div className="absolute inset-0">
                <img
                  src="./assets/circleimages/service-right.png"
                  alt="Talleres Interactivos"
                  className={`h-full w-full object-cover pointer-events-none select-none ${
                    isPlaying && "animate-pulse"
                  }`}
                  width={630}
                  height={750}
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12">
                {/* Top section with icons */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
                    {circleUpServicesIcons.map((icon, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded-xl md:rounded-2xl ${
                          i === 2
                            ? "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-0.25 bg-conic-gradient"
                            : "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm"
                        }`}
                      >
                        <div
                          className={
                            i === 2
                              ? "flex items-center justify-center w-full h-full bg-n-7 rounded-lg md:rounded-[1rem]"
                              : ""
                          }
                        >
                          <img
                            src={icon}
                            width={20}
                            height={20}
                            alt={`icon-${i}`}
                            className="sm:w-6 sm:h-6 md:w-8 md:h-8"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom section with text */}
                <div className="relative z-10">
                  <h4 className="h4 mb-3 md:mb-4 text-white text-xl sm:text-2xl md:text-3xl font-bold">
                    Talleres Interactivos
                  </h4>
                  <p className="body-2 mb-6 md:mb-8 text-gray-200 text-base sm:text-lg leading-relaxed">
                    Aprende haciendo en talleres prácticos donde la comunidad
                    comparte conocimientos y experiencias reales.
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      Hands-on Learning
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      Community Driven
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      Real Experience
                    </span>
                  </div>
                </div>
              </div>

              <VideoChatMessage isPlaying={isPlaying} />
              <VideoBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
