import { curve } from "../assets";
import Button from "./Button";

const Roadmap = ({ 
  setCurrentPage,
  subtitle = 'Tu impacto',
  title = 'Así de simple. Así de real.',
  steps = [
    { id: "01", title: "Tu primer taller", subtitle: "Empieza aquí" },
    { id: "02", title: "Alguien aprende", subtitle: "Tu momento" },
    { id: "03", title: "Cambias vidas", subtitle: "Tu legado" }
  ],
  ctaTitle = 'Tu próximo taller empieza aquí.',
  ctaSubtitle = '2 horas tuyas. Impacto real.',
  ctaButton = 'Empieza ahora'
}) => {

  return (
    <section className="relative bg-n-8 py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40" id="roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Minimal Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-40">
          <div className="uppercase tracking-widest text-n-4 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm font-light">
            {subtitle}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[0.9] font-bold text-n-1 tracking-tighter px-4">
            {title.split('.')[0]}.{" "}
            <span className="inline-block relative">
              {title.split('.')[1]}.
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h2>
        </div>

        {/* Minimal Steps - Static Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
          {steps.map((step, index) => (
            <div key={step.id} className="group text-center sm:text-left">
              {/* Number */}
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-n-1/10 leading-none mb-3 sm:mb-4 transition-all duration-500 group-hover:text-n-1/20">
                {step.id}
              </div>
              
              {/* Content */}
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <div className="uppercase tracking-widest text-n-5 text-xs sm:text-sm md:text-base font-medium">
                  {step.subtitle}
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[0.85] font-extrabold text-n-1 tracking-tight">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Minimal */}
        <div className="text-center mt-16 sm:mt-20 md:mt-32 lg:mt-40 xl:mt-48">
          <div className="inline-block max-w-2xl px-4">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-n-1 mb-3 sm:mb-4 tracking-tight">
              {ctaTitle}
            </div>
            <div className="text-n-4 text-base sm:text-lg md:text-xl lg:text-2xl font-extralight mb-8 sm:mb-10 md:mb-12">
              {ctaSubtitle}
            </div>
            
            <div className="mb-6 sm:mb-7 md:mb-8">
              <Button 
                onClick={() => setCurrentPage && setCurrentPage('login')}
                white
                className="text-sm sm:text-base md:text-lg"
              >
                {ctaButton}
              </Button>
            </div>
            
            <div className="h-[1px] bg-gradient-to-r from-transparent via-n-1 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
