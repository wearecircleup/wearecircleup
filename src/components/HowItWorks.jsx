import { useState } from "react";
import Section from "./Section";
import Logo from "./Logo";

const HowItWorks = ({ 
  steps = [],
  title = "CÓMO FUNCIONA",
  buttonText = "INICIAR",
  buttonAction = () => {},
  className = "",
  sectionClassName = "overflow-hidden relative"
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
                <div className="absolute -top-4 sm:-top-6 md:-top-8 -left-6 sm:-left-8 md:-left-12 w-[18rem] h-[14rem] sm:w-[22rem] sm:h-[16rem] md:w-[28rem] md:h-96 bg-n-6/15 rounded-xl md:rounded-2xl transform rotate-12 shadow-lg"></div>
                {/* Second card (middle of deck) */}
                <div className="absolute -top-2 sm:-top-3 md:-top-5 -left-4 sm:-left-5 md:-left-8 w-[18rem] h-[14rem] sm:w-[22rem] sm:h-[16rem] md:w-[28rem] md:h-96 bg-n-6/25 rounded-xl md:rounded-2xl transform rotate-6 shadow-lg"></div>
                {/* First card (almost top of deck) */}
                <div className="absolute -top-1 -left-2 md:-left-4 w-[18rem] h-[14rem] sm:w-[22rem] sm:h-[16rem] md:w-[28rem] md:h-96 bg-n-6/35 rounded-xl md:rounded-2xl transform rotate-3 shadow-lg"></div>
                {/* Front card with image (top of deck) - centered */}
                <div className="relative w-[18rem] h-[14rem] sm:w-[22rem] sm:h-[16rem] md:w-[28rem] md:h-96 bg-n-7/90 rounded-xl md:rounded-2xl border border-n-6/50 overflow-hidden shadow-2xl backdrop-blur-sm z-10 mx-auto">
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
            {/* Logo in bottom right corner - hidden on mobile */}
            <div className="absolute bottom-0 right-0 z-10 hidden md:block">
              <Logo 
                logoSize={{ width: 48, height: 48 }}
                textSize="text-sm"
                showText={true}
              />
            </div>
            
            <h2 className="h2 mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left">
              {steps[activeStep]?.title || ""}
            </h2>
            <p className="body-1 text-n-4 mb-6 md:mb-8 leading-relaxed text-sm sm:text-base text-center lg:text-left">
              {steps[activeStep]?.description || ""}
            </p>
            
            <div className="flex justify-center lg:justify-start mb-6 md:mb-8">
              <button 
                onClick={buttonAction}
                className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8"
              >
                <span className="relative z-10">{buttonText}</span>
                <svg className="absolute top-0 left-0" width="21" height="44" viewBox="0 0 21 44">
                  <path fill="white" stroke="white" strokeWidth="2" d="M21,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1"></path>
                </svg>
                <svg className="absolute top-0 left-[1.3125rem] w-[calc(100%-2.625rem)]" height="44" viewBox="0 0 100 44" preserveAspectRatio="none" fill="white">
                  <polygon fill="white" fillRule="nonzero" points="100 0 100 44 0 44 0 0"></polygon>
                </svg>
                <svg className="absolute top-0 right-0" width="21" height="44" viewBox="0 0 21 44">
                  <path fill="white" stroke="white" strokeWidth="2" d="M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.18,2.77735 C5.792,1.61115 4.147,1 2.466,1 L0,1"></path>
                </svg>
              </button>
            </div>

            {/* Voice input indicator - responsive */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="flex items-center bg-n-7 rounded-full px-3 sm:px-4 py-2 border border-n-6 w-fit text-xs sm:text-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <span className="text-white text-xs">?</span>
                </div>
                <span className="text-n-3">¿Tienes dudas?</span>
                <div className="ml-2 sm:ml-4 flex space-x-1">
                  <div className="w-1 h-3 sm:h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-4 sm:h-6 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-3 sm:h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-4 sm:h-6 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
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
                  <h4 className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                    activeStep === index ? 'text-n-1' : 'text-n-3'
                  }`}>
                    {step.title}
                  </h4>
                  
                  {/* Step description */}
                  <p className={`text-sm leading-relaxed transition-all duration-300 ${
                    activeStep === index ? 'text-n-2' : 'text-n-4'
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
