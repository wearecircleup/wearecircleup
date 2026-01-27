import { useState } from "react";
import Section from "./Section";
import Logo from "./Logo";

const HowItWorks = ({ 
  steps = [],
  title = "CÓMO FUNCIONA",
  className = "",
  sectionClassName = "overflow-hidden relative",
  fontSize = 'normal'
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section className={sectionClassName}>
      {/* Background grid only on left side */}
      <div className="absolute inset-0 opacity-2">
        <div className="w-1/2 h-full">
          <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className={`container relative z-2 px-4 lg:px-0 ${className}`}>
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block px-3 py-1 bg-n-7 rounded text-xs font-code font-bold tracking-wider uppercase text-n-4 mb-4">
            [ {title}: {String(activeStep + 1).padStart(2, '0')}. ]
          </div>
        </div>

        <div className="relative z-1 grid gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2 items-center mb-12 md:mb-20">
          {/* Left side - 3D Stacked Boxes with Image - Mobile Optimized */}
          <div className="relative w-full flex justify-center">
            <div className="relative">
              {/* 3D Stacked boxes effect - responsive and centered */}
              <div className="relative">
                {/* Third card (back of deck) */}
                <div className="absolute -top-4 sm:-top-6 md:-top-8 -left-6 sm:-left-8 md:-left-12 w-[19rem] h-[15rem] sm:w-[24rem] sm:h-[17rem] md:w-[32rem] md:h-[26rem] bg-n-6/15 rounded-xl md:rounded-2xl transform rotate-12 shadow-lg"></div>
                {/* Second card (middle of deck) */}
                <div className="absolute -top-2 sm:-top-3 md:-top-5 -left-4 sm:-left-5 md:-left-8 w-[19rem] h-[15rem] sm:w-[24rem] sm:h-[17rem] md:w-[32rem] md:h-[26rem] bg-n-6/25 rounded-xl md:rounded-2xl transform rotate-6 shadow-lg"></div>
                {/* First card (almost top of deck) */}
                <div className="absolute -top-1 -left-2 md:-left-4 w-[19rem] h-[15rem] sm:w-[24rem] sm:h-[17rem] md:w-[32rem] md:h-[26rem] bg-n-6/35 rounded-xl md:rounded-2xl transform rotate-3 shadow-lg"></div>
                {/* Front card with image (top of deck) - centered */}
                <div className="relative w-[19rem] h-[15rem] sm:w-[24rem] sm:h-[17rem] md:w-[32rem] md:h-[26rem] bg-n-7/90 rounded-xl md:rounded-2xl border border-n-6/50 overflow-hidden shadow-2xl backdrop-blur-sm z-10 mx-auto">
                  <img 
                    className="w-full h-full object-cover pointer-events-none select-none" 
                    src={steps[activeStep]?.image || ""}
                    alt={steps[activeStep]?.title || ""}
                  />
                  {/* Subtle overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-n-8/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Text Content */}
          <div className="relative">
            {/* Label superior */}
            <div className={`uppercase tracking-[0.25em] text-n-4 mb-4 md:mb-6 text-center lg:text-left ${
              fontSize === 'small' 
                ? 'text-[0.6rem] sm:text-[0.65rem] md:text-xs' 
                : fontSize === 'large'
                ? 'text-[0.75rem] sm:text-sm md:text-base'
                : 'text-[0.7rem] sm:text-[0.75rem] md:text-sm'
            } font-light`}>
              PASO {String(activeStep + 1).padStart(2, '0')}
            </div>
            
            {/* Título principal en negrita BLACK */}
            <h2 className={`leading-[0.95] font-black text-n-1 mb-6 md:mb-8 tracking-tighter text-center lg:text-left ${
              fontSize === 'small' 
                ? 'text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem]' 
                : fontSize === 'large'
                ? 'text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem]'
                : 'text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem]'
            }`}>
              {steps[activeStep]?.title || ""}
            </h2>
            
            {/* Descripción */}
            <p className={`body-1 text-n-4 mb-6 md:mb-8 leading-relaxed text-center lg:text-left ${
              fontSize === 'small' 
                ? 'text-base sm:text-lg' 
                : fontSize === 'large'
                ? 'text-xl sm:text-2xl md:text-3xl'
                : 'text-lg sm:text-xl md:text-2xl'
            }`}>
              {steps[activeStep]?.description || ""}
            </p>
            
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start mt-6 md:mt-8">
              <div className="grayscale opacity-60 hover:opacity-80 transition-opacity duration-300">
                <Logo
                  logoSize={{ width: 48, height: 48 }}
                  textSize="text-sm"
                  showText={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step Navigation - Mobile Optimized */}
        <div className="w-full">
          {/* Mobile: Vertical stack */}
          <div className="block md:hidden space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="cursor-pointer" onClick={() => setActiveStep(index)}>
                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  activeStep === index 
                    ? 'border-color-1 bg-color-1/5' 
                    : 'border-n-6 hover:border-n-4'
                }`}>
                  <div className="flex items-start space-x-3">
                    {/* Number */}
                    <div className={`text-sm font-bold transition-all duration-300 flex-shrink-0 ${
                      activeStep === index ? 'text-color-1' : 'text-n-4'
                    }`}>
                      {String(index + 1).padStart(2, '0')}.
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Step title */}
                      <h4 className={`text-base font-semibold mb-2 transition-all duration-300 ${
                        activeStep === index ? 'text-n-1' : 'text-n-3'
                      }`}>
                        {step.title}
                      </h4>
                      
                      {/* Step description - only show for active step on mobile */}
                      {activeStep === index && (
                        <p className="text-sm leading-relaxed text-n-2">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Bottom border indicator */}
                  <div className={`mt-3 h-1 w-full transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-color-1' 
                      : 'bg-transparent'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="cursor-pointer" onClick={() => setActiveStep(index)}>
                <div className={`p-6 rounded-lg border transition-all duration-300 ${
                  activeStep === index 
                    ? 'border-color-1 bg-color-1/5' 
                    : 'border-n-6 hover:border-n-4'
                }`}>
                  {/* Number */}
                  <div className={`text-sm font-bold mb-3 transition-all duration-300 ${
                    activeStep === index ? 'text-color-1' : 'text-n-4'
                  }`}>
                    {String(index + 1).padStart(2, '0')}.
                  </div>
                  
                  {/* Step title */}
                  <h4 className={`font-semibold mb-2 transition-all duration-300 ${
                    activeStep === index ? 'text-n-1' : 'text-n-3'
                  } ${
                    fontSize === 'small' 
                      ? 'text-base' 
                      : fontSize === 'large'
                      ? 'text-2xl'
                      : 'text-xl'
                  }`}>
                    {step.title}
                  </h4>
                  
                  {/* Step description */}
                  <p className={`transition-all duration-300 ${
                    activeStep === index ? 'text-n-4' : 'text-n-5'
                  } ${
                    fontSize === 'small' 
                      ? 'text-sm' 
                      : fontSize === 'large'
                      ? 'text-xl'
                      : 'text-lg'
                  }`}>
                    {activeStep === index 
                      ? step.description.substring(0, 120) + (step.description.length > 120 ? '...' : '')
                      : step.description.substring(0, 80) + (step.description.length > 80 ? '...' : '')
                    }
                  </p>
                  
                  {/* Bottom border indicator */}
                  <div className={`mt-4 h-1 w-full transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-color-1' 
                      : 'bg-transparent'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
