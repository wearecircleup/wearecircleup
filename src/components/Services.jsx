import { useState } from "react";
import { service1, service2, service3, check } from "../assets";
import { circleUpServices, circleUpServicesIcons } from "../constants";
import Generating from "./Generating";
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

        <div className="relative">

          {/* Service 2 & 3 */}
          <div className="relative z-1 grid gap-4 md:gap-5 lg:grid-cols-2">
            <div className="relative min-h-[28rem] sm:min-h-[35rem] md:min-h-[39rem] border border-n-1/10 rounded-2xl md:rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="./assets/circleimages/service-left.png"
                  alt="Service Left"
                  className="h-full w-full object-cover pointer-events-none select-none"
                  width={630}
                  height={750}
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-2 md:mb-4 text-lg sm:text-xl md:text-2xl">Mentorías Personalizadas</h4>
                <p className="body-2 mb-4 sm:mb-6 md:mb-[3rem] text-n-3 text-sm sm:text-base">
                  Conecta con expertos voluntarios que te guían paso a paso
                  en tu desarrollo profesional y personal.
                </p>
              </div>

              <PhotoChatMessage />
            </div>

            <div className="p-3 sm:p-4 bg-n-7 rounded-2xl md:rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 xl:px-8">
                <h4 className="h4 mb-2 md:mb-4 text-lg sm:text-xl md:text-2xl">Talleres Interactivos</h4>
                <p className="body-2 mb-4 sm:mb-6 md:mb-[2rem] text-n-3 text-sm sm:text-base">
                  Aprende haciendo en talleres prácticos donde la comunidad
                  comparte conocimientos y experiencias reales.
                </p>

                <ul className="flex items-center justify-between gap-2 sm:gap-4">
                  {circleUpServicesIcons.map((icon, i) => (
                    <li
                      key={i}
                      className={`flex items-center justify-center rounded-xl md:rounded-2xl ${
                        i === 2
                          ? "w-8 h-8 sm:w-10 sm:h-10 md:w-[3rem] md:h-[3rem] p-0.25 bg-conic-gradient lg:w-[4.5rem] lg:h-[4.5rem]"
                          : "flex w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-n-6 lg:w-15 lg:h-15"
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
                          width={16}
                          height={16}
                          alt={`icon-${i}`}
                          className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[16rem] sm:h-[18rem] md:h-[20rem] bg-n-8 rounded-lg md:rounded-xl overflow-hidden lg:h-[25rem]">
                <img
                  src="./assets/circleimages/service-right.png"
                  className={`w-full h-full object-cover ${
                    isPlaying && "animate-pulse"
                  } pointer-events-none select-none`}
                  width={520}
                  height={400}
                  alt="Service Right"
                />

                <VideoChatMessage isPlaying={isPlaying} />
                <VideoBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
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
