import { check2, grid, loading1, curve } from "../assets";
import { roadmap } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Tagline from "./Tagline";
import { Gradient } from "./design/Roadmap";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:pb-10">
      <Heading 
        tag="Nuestra misión" 
        title={
          <>
            Cómo transformamos{" "}
            <span className="inline-block relative font-semibold">
              comunidades
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

      <div className="relative grid gap-6 md:gap-8 md:grid-cols-2 md:pb-[7rem] px-4 lg:px-0">
        {roadmap.map((item) => {
          const status = item.status === "done" ? "Completado" : "En progreso";

          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-xl md:rounded-[2.5rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-n-6"
              }`}
              key={item.id}
            >
              <div className="relative min-h-[32rem] sm:min-h-[38rem] md:min-h-[42rem] bg-n-8 rounded-xl md:rounded-[2.4375rem] overflow-hidden">
                
                {/* Background Image - Full Coverage */}
                <div className="absolute inset-0">
                  <img
                    className={`w-full h-full object-cover pointer-events-none select-none ${
                      item.status !== "done" && "animate-pulse"
                    }`}
                    src={item.imageUrl}
                    alt={item.title}
                    width={630}
                    height={750}
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90"></div>
                </div>

                {/* Grid pattern overlay (subtle) */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <img
                    className="w-full h-full object-cover pointer-events-none select-none"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>

                {/* Content overlay */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 md:p-10">
                  
                  {/* Top section with status */}
                  <div className="flex items-center justify-between">
                    <Tagline className="text-white/90">{item.date}</Tagline>

                    <div className="flex items-center px-3 md:px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm">
                      <img
                        className={`mr-2 w-4 h-4 ${
                          item.status !== "done" && "animate-spin"
                        } pointer-events-none select-none`}
                        src={item.status === "done" ? check2 : loading1}
                        width={16}
                        height={16}
                        alt={status}
                      />
                      <div className="tagline text-xs sm:text-sm font-medium">{status}</div>
                    </div>
                  </div>

                  {/* Center section - Large image showcase */}
                  <div className="flex-1 flex items-center justify-center py-8">
                    <div className="relative">
                      {/* Enhanced 3D card effect with larger images */}
                      <div className="relative">
                        {/* Third card (back of deck) */}
                        <div className={`absolute top-4 sm:top-6 md:top-8 left-6 sm:left-8 md:left-12 bg-white/10 backdrop-blur-sm rounded-2xl transform rotate-6 shadow-2xl ${
                          item.id === "3" 
                            ? "w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem]" 
                            : "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]"
                        }`}></div>
                        
                        {/* Second card (middle of deck) */}
                        <div className={`absolute top-2 sm:top-3 md:top-4 left-3 sm:left-4 md:left-6 bg-white/15 backdrop-blur-sm rounded-2xl transform rotate-3 shadow-xl ${
                          item.id === "3" 
                            ? "w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem]" 
                            : "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]"
                        }`}></div>
                        
                        {/* First card (almost top of deck) */}
                        <div className={`absolute top-1 left-1 md:left-2 bg-white/20 backdrop-blur-sm rounded-2xl transform rotate-1 shadow-lg ${
                          item.id === "3" 
                            ? "w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem]" 
                            : "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]"
                        }`}></div>
                        
                        {/* Front card with enhanced image */}
                        <div className={`relative bg-white/25 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/30 ${
                          item.id === "3" 
                            ? "w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem]" 
                            : "w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] md:w-[26rem] md:h-[26rem]"
                        }`}>
                          <img
                            className="w-full h-full object-cover pointer-events-none select-none"
                            src={item.imageUrl}
                            alt={item.title}
                          />
                          {/* Subtle inner glow */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section with content */}
                  <div className="space-y-4">
                    <h4 className="h4 text-white text-xl sm:text-2xl md:text-3xl font-bold">
                      {item.title}
                    </h4>
                    <p className="body-2 text-gray-200 text-base sm:text-lg leading-relaxed">
                      {item.text}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r from-color-1 to-color-2 rounded-full transition-all duration-1000 ${
                            item.status === "done" ? "w-full" : "w-3/4"
                          }`}
                        ></div>
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        {item.status === "done" ? "100%" : "75%"}
                      </span>
                    </div>
                  </div>
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
