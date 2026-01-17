import { check, curve } from "../assets";
import Section from "./Section";
import { collabApps, collabContent, collabText } from "../constants";
import { LeftCurve, RightCurve } from "./design/Collaboration";

const Collaboration = () => {
  return (
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem] px-4 lg:px-0">
          <h2 className="h2 mb-4 md:mb-8 text-center lg:text-left">
            Herramientas que potencian nuestro
            <span className="inline-block relative font-semibold">
              ecosistema
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14 mx-auto lg:mx-0">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img
                    src={check}
                    width={20}
                    alt="check"
                    height={20}
                    className="pointer-events-none select-none md:w-6 md:h-6"
                  />
                  <h6 className="body-2 ml-3 md:ml-5 text-sm md:text-base">{item.title}</h6>
                </div>

                {item.text && (
                  <p className="body-2 mt-2 md:mt-3 text-n-4 text-sm md:text-base ml-6 md:ml-8">{item.text}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:ml-auto xl:w-[50rem] mt-8 lg:mt-4 px-4 lg:px-0">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-20 lg:w-[40rem] lg:mx-auto text-center lg:text-left text-sm md:text-base">
            {collabText}
          </p>

          <div className="relative flex items-center justify-center min-h-[40rem]">
            {/* Decorative background circles inspired by CallToActionSection */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[32rem] h-[32rem] border border-n-6 rounded-full opacity-60"></div>
              <div className="absolute w-[26rem] h-[26rem] border border-n-6 rounded-full opacity-40"></div>
              <div className="absolute w-[20rem] h-[20rem] border border-n-6 rounded-full opacity-30"></div>
            </div>

            {/* Enhanced floating decorative elements - more planets */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative block w-full h-full">
                {/* Original decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-b from-[#AC6AFF] to-[#1A1A32] rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-gradient-to-b from-[#FFC876] to-[#1A1A32] rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gradient-to-b from-[#FF6B6B] to-[#1A1A32] rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full opacity-60 animate-pulse"></div>
                
                {/* Additional decorative planets */}
                <div className="absolute top-1/6 right-1/6 w-6 h-6 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full opacity-50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-1/6 right-1/2 w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/6 w-5 h-5 bg-gradient-to-b from-[#4ECDC4] to-[#1A1A32] rounded-full opacity-55 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute bottom-1/3 right-1/5 w-4 h-4 bg-gradient-to-b from-[#FFE66D] to-[#1A1A32] rounded-full opacity-45 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-2/3 left-1/5 w-3 h-3 bg-gradient-to-b from-[#FF8A80] to-[#1A1A32] rounded-full opacity-65 animate-pulse" style={{animationDelay: '0.8s'}}></div>
                <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-gradient-to-b from-[#81C784] to-[#1A1A32] rounded-full opacity-40 animate-pulse" style={{animationDelay: '1.2s'}}></div>
                <div className="absolute bottom-1/5 left-1/4 w-4 h-4 bg-gradient-to-b from-[#CE93D8] to-[#1A1A32] rounded-full opacity-55 animate-pulse" style={{animationDelay: '1.8s'}}></div>
                <div className="absolute top-3/5 right-1/8 w-3 h-3 bg-gradient-to-b from-[#FFAB91] to-[#1A1A32] rounded-full opacity-50 animate-pulse" style={{animationDelay: '0.3s'}}></div>
              </span>
            </div>

            {/* Central logo - compact circular design */}
            <div className="relative z-10 flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-n-7 to-n-8 rounded-full border-2 border-n-6 shadow-2xl">
              <div className="flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 bg-conic-gradient rounded-full p-1">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src="/assets/circleimages/logo.svg"
                    width={150}
                    height={150}
                    alt="CircleUp Logo"
                    className="w-22 h-22 sm:w-26 sm:h-26 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Tool names positioned around the center in two concentric circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {collabApps.map((app, i) => {
                // Split tools into inner and outer circles
                const isInnerCircle = i < 6; // First 6 tools in inner circle
                const circleIndex = isInnerCircle ? i : i - 6; // Index within each circle

                // Different radii for each circle
                const innerRadius = 200;
                const outerRadius = 360;

                const radius = isInnerCircle ? innerRadius : outerRadius;
                const angle = (circleIndex * (360 / (isInnerCircle ? 6 : 6))) - 90;

                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                // Different sizes for inner vs outer circle
                const textSize = isInnerCircle ? 'text-base' : 'text-lg';
                const padding = isInnerCircle ? 'px-6 py-4' : 'px-8 py-6';

                return (
                  <div
                    key={app.id}
                    className="absolute"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div className="relative group cursor-pointer">
                      <div className={`bg-gradient-to-r from-n-8/90 to-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-color-1/50 ${padding}`}>
                        <span className={`inline-block relative font-semibold text-n-1 whitespace-nowrap ${textSize}`}>
                          {app.title}
                          <img
                            src={curve}
                            className="absolute top-full left-0 w-full xl:-mt-1 pointer-events-none select-none opacity-80"
                            width={isInnerCircle ? 100 : 120}
                            height={12}
                            alt="Curve"
                          />
                        </span>
                      </div>

                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-color-1/20 to-color-2/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
