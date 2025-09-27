import Section from "./Section";

const CallToActionSection = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonAction 
}) => {
  return (
    <Section className="overflow-hidden">
      <div className="container relative z-2">
        <div className="relative flex flex-col items-center justify-center min-h-[40rem]">
          {/* Circular background elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative block w-full h-full">
              <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
                <div className="w-2 h-2 -ml-1 -mt-36 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
              </div>
              <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]">
                <div className="w-4 h-4 -ml-1 -mt-32 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
              </div>
              <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[54deg]">
                <div className="w-4 h-4 -ml-1 mt-[12.9rem] bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
              </div>
              <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
                <div className="w-3 h-3 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
              </div>
              <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[85deg]">
                <div className="w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
              </div>
              
              {/* Additional circles for more visual impact */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-b from-[#AC6AFF] to-[#1A1A32] rounded-full opacity-60"></div>
              <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-b from-[#FFC876] to-[#1A1A32] rounded-full opacity-40"></div>
              <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-gradient-to-b from-[#FF6B6B] to-[#1A1A32] rounded-full opacity-50"></div>
            </span>
          </div>
          
          {/* Background circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 border border-n-6 rounded-full opacity-80"></div>
            <div className="absolute w-80 h-80 border border-n-6 rounded-full opacity-80"></div>
            <div className="absolute w-64 h-64 border border-n-6 rounded-full opacity-80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-[40rem]">
            <h2 className="h2 mb-6">
              {title}{" "}
              <span className="inline-block relative font-semibold">
                Circle Up
                <img
                  src="./assets/hero/curve.png"
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h2>
            <p className="body-1 mb-8 text-n-4">
              {subtitle}
            </p>
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
        </div>
      </div>
    </Section>
  );
};

export default CallToActionSection;
