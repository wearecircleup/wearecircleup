import { curve } from "../assets";
import { circleUpServicesIcons } from "../constants";
import Section from "./Section";
import Heading from "./Heading";
import { Gradient, VideoBar } from "./design/Services";

const Services = ({ fontSize = 'normal' }) => {
  return (
    <Section id="how-to-use">
      <div className="container">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          fontSize={fontSize}
          title={
            <>
              Qué necesitas para{" "}
              <span className="inline-block relative font-semibold">
                empezar
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
          <div className="relative z-1 grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 lg:grid-cols-2">
            
            {/* Mentorías Personalizadas Card */}
            <div className="relative">
              {/* Main image container */}
              <div className="relative h-[24rem] sm:h-[28rem] md:h-[32rem] lg:h-[36rem] xl:h-[40rem] border border-n-1/10 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                {/* Background Image - Full Coverage */}
                <div className="absolute inset-0">
                  <img
                    src="./assets/circleimages/service-left.png"
                    alt="Mentorías Personalizadas"
                    className="h-full w-full object-cover pointer-events-none select-none"
                    width={630}
                    height={750}
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                </div>

                {/* Icons floating on bottom left */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-5 md:left-5 lg:bottom-6 lg:left-6 z-30">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
                    {circleUpServicesIcons.slice(0, 3).map((icon, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded-lg md:rounded-xl ${
                          i === 2
                            ? "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-0.25 bg-conic-gradient"
                            : "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm"
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
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text box - Inline on mobile, floating on desktop */}
              <div className="mt-4 sm:mt-5 md:mt-6 lg:absolute lg:-bottom-8 xl:-bottom-12 lg:-right-4 xl:-right-8 lg:w-2/3 xl:w-3/5 lg:z-20">
                <div className="bg-n-8/95 backdrop-blur-sm border border-n-1/10 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg lg:shadow-2xl">
                  {/* Quote icon */}
                  <div className="mb-2 sm:mb-2.5 md:mb-3">
                    <svg width="20" height="15" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 sm:w-6 sm:h-5 md:w-7 md:h-5 lg:w-8 lg:h-6">
                      <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-n-1 font-mono leading-relaxed">
                    Conocimiento aplicable. No necesitas ser el mejor del mundo en tu campo. Solo necesitas saber lo suficiente para guiar a alguien que está empezando.
                  </p>
                  <div className="mt-2 sm:mt-2.5 md:mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-color-1 to-color-2 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">M</span>
                    </div>
                    <div>
                      <p className="text-n-1 text-xs sm:text-sm font-semibold">Mentorías</p>
                      <p className="text-n-4 text-xs sm:text-sm">Personalizadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Talleres Interactivos Card */}
            <div className="relative">
              {/* Main image container */}
              <div className="relative h-[24rem] sm:h-[28rem] md:h-[32rem] lg:h-[36rem] xl:h-[40rem] border border-n-1/10 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                {/* Background Image - Full Coverage */}
                <div className="absolute inset-0">
                  <img
                    src="./assets/circleimages/service-right.png"
                    alt="Talleres Interactivos"
                    className="h-full w-full object-cover pointer-events-none select-none"
                    width={630}
                    height={750}
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent"></div>
                </div>

                {/* Icons floating on top left */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 lg:top-6 lg:left-6 z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
                    {circleUpServicesIcons.slice(0, 3).map((icon, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded-lg md:rounded-xl ${
                          i === 2
                            ? "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 p-0.25 bg-conic-gradient"
                            : "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm"
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
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content overlay inside image */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10">
                  <div className="relative z-10 max-w-xs sm:max-w-sm md:max-w-md ml-auto text-right">
                    {/* Feature highlights inside */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-end">
                      <span className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
                        Hands-on Learning
                      </span>
                      <span className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
                        Community Driven
                      </span>
                    </div>
                  </div>
                </div>

                <VideoBar />
              </div>

              {/* Text box - Inline on mobile, floating on desktop */}
              <div className="mt-4 sm:mt-5 md:mt-6 lg:absolute lg:-top-8 xl:-top-12 lg:-right-4 xl:-right-8 lg:w-2/3 xl:w-3/5 lg:z-20">
                <div className="bg-n-8/95 backdrop-blur-sm border border-n-1/10 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg lg:shadow-2xl">
                  {/* Quote icon */}
                  <div className="mb-2 sm:mb-2.5 md:mb-3">
                    <svg width="20" height="15" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 sm:w-6 sm:h-5 md:w-7 md:h-5 lg:w-8 lg:h-6">
                      <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-n-1 font-mono leading-relaxed">
                    2 horas de tu agenda. Coordinamos espacio, inscripciones y materiales básicos. Tú preparas el contenido práctico y llegas a enseñar. Sin compromisos a largo plazo.
                  </p>
                  <div className="mt-2 sm:mt-2.5 md:mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-color-2 to-color-1 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">T</span>
                    </div>
                    <div>
                      <p className="text-n-1 text-xs sm:text-sm font-semibold">Talleres</p>
                      <p className="text-n-4 text-xs sm:text-sm">Interactivos</p>
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
