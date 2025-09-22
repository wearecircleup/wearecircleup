import { check2, grid, loading1 } from "../assets";
import { roadmap } from "../constants";
import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import Tagline from "./Tagline";
import { Gradient } from "./design/Roadmap";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:pb-10">
      <Heading tag="Nuestra misión" title="Cómo transformamos comunidades" />

      <div className="relative grid gap-4 md:gap-6 md:grid-cols-2 md:pb-[7rem] px-4 lg:px-0">
        {roadmap.map((item) => {
          const status = item.status === "done" ? "Completado" : "En progreso";

          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-xl md:rounded-[2.5rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-n-6"
              }`}
              key={item.id}
            >
              <div className="relative p-4 sm:p-6 md:p-8 bg-n-8 rounded-xl md:rounded-[2.4375rem] overflow-hidden xl:p-15">
                <div className="absolute top-0 left-0 max-w-full opacity-50 md:opacity-100">
                  <img
                    className="w-full pointer-events-none select-none"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-1">
                  <div className="flex items-center justify-between max-w-[27rem] mb-6 md:mb-8 lg:mb-20">
                    <Tagline>{item.date}</Tagline>

                    <div className="flex items-center px-2 sm:px-3 md:px-4 py-1 bg-n-1 rounded text-n-8 text-xs sm:text-sm">
                      <img
                        className={`mr-1.5 sm:mr-2.5 w-3 h-3 sm:w-4 sm:h-4 ${
                          item.status !== "done" && "animate-spin"
                        } pointer-events-none select-none`}
                        src={item.status === "done" ? check2 : loading1}
                        width={12}
                        height={12}
                        alt={status}
                      />
                      <div className="tagline text-xs sm:text-sm">{status}</div>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-10 -my-6 md:-my-10 -mx-4 md:-mx-15">
                    {/* 3D Stacked boxes effect - responsive */}
                    <div className="relative flex justify-center">
                      <div className="relative">
                        {/* Third card (back of deck) */}
                        <div className={`absolute top-3 sm:top-4 md:top-6 left-4 sm:left-6 md:left-8 bg-n-6/15 rounded-lg md:rounded-2xl transform rotate-6 shadow-lg ${
                          item.id === "3" 
                            ? "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]" 
                            : "w-[14rem] h-[14rem] sm:w-[18rem] sm:h-[18rem] md:w-[24rem] md:h-[24rem]"
                        }`}></div>
                        {/* Second card (middle of deck) */}
                        <div className={`absolute top-2 sm:top-2 md:top-3 left-2 sm:left-3 md:left-5 bg-n-6/25 rounded-lg md:rounded-2xl transform rotate-3 shadow-lg ${
                          item.id === "3" 
                            ? "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]" 
                            : "w-[14rem] h-[14rem] sm:w-[18rem] sm:h-[18rem] md:w-[24rem] md:h-[24rem]"
                        }`}></div>
                        {/* First card (almost top of deck) */}
                        <div className={`absolute top-1 left-1 md:left-2 bg-n-6/35 rounded-lg md:rounded-2xl transform rotate-1 shadow-lg ${
                          item.id === "3" 
                            ? "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]" 
                            : "w-[14rem] h-[14rem] sm:w-[18rem] sm:h-[18rem] md:w-[24rem] md:h-[24rem]"
                        }`}></div>
                        {/* Front card with image (top of deck) */}
                        <div className={`relative bg-n-8 rounded-lg md:rounded-2xl overflow-hidden shadow-2xl ${
                          item.id === "3" 
                            ? "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]" 
                            : "w-[14rem] h-[14rem] sm:w-[18rem] sm:h-[18rem] md:w-[24rem] md:h-[24rem]"
                        }`}>
                          <img
                            className={`w-full h-full object-contain ${
                              item.status !== "done" && "animate-pulse"
                            } pointer-events-none select-none`}
                            src={item.imageUrl}
                            alt={item.title}
                          />
                          {/* Subtle overlay for better contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-n-8/20 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="h4 mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl">{item.title}</h4>
                  <p className="body-2 text-n-4 text-sm sm:text-base">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}

        <Gradient />
      </div>

    </div>
  </Section>
);

export default Roadmap;
