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
          <div className="relative z-1 grid gap-8 md:gap-12 lg:grid-cols-2">
            
            {/* Mentorías Personalizadas Card */}
            <div className="relative">
              {/* Main image container - Larger on mobile */}
              <div className="relative min-h-[28rem] sm:min-h-[32rem] md:min-h-[38rem] lg:min-h-[42rem] border border-n-1/10 rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Background Image - Full Coverage */}
                <div className="absolute inset-0">
                  <img
                    src="./assets/circleimages/service-left.png"
                    alt="Mentorías Personalizadas"
                    className="h-full w-full object-cover pointer-events-none select-none"
                    width={630}
                    height={750}
                  />
                  {/* Gradient overlay - lighter on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-black/70 to-transparent"></div>
                </div>

                {/* Icons floating on bottom left - similar to right card */}
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-30">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    {circleUpServicesIcons.slice(0, 3).map((icon, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded-lg md:rounded-xl ${
                          i === 2
                            ? "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-0.25 bg-conic-gradient"
                            : "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm"
                        }`}
                      >
                        <div
                          className={
                            i === 2
                              ? "flex items-center justify-center w-full h-full bg-n-7 rounded-md md:rounded-lg"
                              : ""
                          }
                        >
                          <img
                            src={icon}
                            width={12}
                            height={12}
                            alt={`icon-${i}`}
                            className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Removed PhotoChatMessage component */}
              </div>

              {/* Floating text box - Only on desktop, inline on mobile */}
              <div className="mt-4 md:absolute md:-bottom-12 lg:-bottom-16 md:-right-4 lg:-right-8 md:w-2/3 lg:w-3/5 md:z-20">
                <div className="bg-n-8/95 backdrop-blur-sm border border-n-1/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-xl md:shadow-2xl">
                  {/* Quote icon */}
                  <div className="mb-2 md:mb-3">
                    <svg width="20" height="15" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-6 md:h-5 lg:w-8 lg:h-6">
                      <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                    </svg>
                  </div>
                  <p className="body-1 text-n-1 font-mono leading-relaxed text-xs md:text-sm">
                    Conecta con expertos voluntarios que te guían paso a paso
                    en tu desarrollo profesional y personal.
                  </p>
                  <div className="mt-2 md:mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-color-1 to-color-2 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <div>
                      <p className="text-n-1 text-xs font-semibold">Mentorías</p>
                      <p className="text-n-4 text-xs">Personalizadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Talleres Interactivos Card */}
            <div className="relative">
              {/* Main image container - Larger on mobile */}
              <div className="relative min-h-[28rem] sm:min-h-[32rem] md:min-h-[38rem] lg:min-h-[42rem] border border-n-1/10 rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Background Image - Full Coverage */}
                <div className="absolute inset-0">
                  <img
                    src="./assets/circleimages/service-right.png"
                    alt="Talleres Interactivos"
                    className="h-full w-full object-cover pointer-events-none select-none"
                    width={630}
                    height={750}
                  />
                  {/* Gradient overlay - lighter on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/60 md:from-black/70 to-transparent"></div>
                </div>

                {/* Icons floating on top left - moved from right */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    {circleUpServicesIcons.slice(0, 3).map((icon, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded-lg md:rounded-xl ${
                          i === 2
                            ? "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-0.25 bg-conic-gradient"
                            : "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm"
                        }`}
                      >
                        <div
                          className={
                            i === 2
                              ? "flex items-center justify-center w-full h-full bg-n-7 rounded-md md:rounded-lg"
                              : ""
                          }
                        >
                          <img
                            src={icon}
                            width={12}
                            height={12}
                            alt={`icon-${i}`}
                            className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content overlay inside image */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10">
                  <div className="relative z-10 max-w-xs sm:max-w-sm md:max-w-md ml-auto text-right">
                    {/* Removed h4 title */}
                    
                    {/* Feature highlights inside */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-end">
                      <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
                        Hands-on Learning
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
                        Community Driven
                      </span>
                    </div>
                  </div>
                </div>

                <VideoBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
              </div>

              {/* Floating text box - Only on desktop, inline on mobile - moved to right */}
              <div className="mt-4 md:absolute md:-top-12 lg:-top-16 md:-right-4 lg:-right-8 md:w-2/3 lg:w-3/5 md:z-20">
                <div className="bg-n-8/95 backdrop-blur-sm border border-n-1/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-xl md:shadow-2xl">
                  {/* Quote icon */}
                  <div className="mb-2 md:mb-3">
                    <svg width="20" height="15" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-6 md:h-5 lg:w-8 lg:h-6">
                      <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                    </svg>
                  </div>
                  <p className="body-1 text-n-1 font-mono leading-relaxed text-xs md:text-sm">
                    Aprende haciendo en talleres prácticos donde la comunidad
                    comparte conocimientos y experiencias reales.
                  </p>
                  <div className="mt-2 md:mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-color-2 to-color-1 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <div>
                      <p className="text-n-1 text-xs font-semibold">Talleres</p>
                      <p className="text-n-4 text-xs">Interactivos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
