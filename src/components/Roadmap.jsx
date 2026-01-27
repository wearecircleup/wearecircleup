import { curve } from "../assets";
import Button from "./Button";

const Roadmap = ({ setCurrentPage }) => {

  const steps = [
    {
      id: "01",
      title: "Tu primer taller",
      subtitle: "Empieza aquí"
    },
    {
      id: "02", 
      title: "Alguien aprende",
      subtitle: "Tu momento"
    },
    {
      id: "03",
      title: "Cambias vidas",
      subtitle: "Tu legado"
    }
  ];

  return (
    <section className="relative bg-n-8 py-20 md:py-32 lg:py-40" id="roadmap">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        
        {/* Minimal Header */}
        <div className="text-center mb-20 md:mb-32 lg:mb-40">
          <div className="uppercase tracking-[0.3em] text-n-4 mb-6 text-[clamp(0.55rem,0.95vw,0.75rem)] font-light">
            Tu impacto
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,9rem)] leading-[0.9] font-bold text-n-1 tracking-tighter">
            Así de simple.{" "}
            <span className="inline-block relative">
              Así de real.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={step.id} className="group">
              {/* Number */}
              <div className="text-[clamp(4rem,12vw,8rem)] font-bold text-n-1/10 leading-none mb-4 transition-all duration-500 group-hover:text-n-1/20">
                {step.id}
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <div className="uppercase tracking-[0.35em] text-n-5 text-[clamp(0.75rem,1.2vw,1rem)] font-medium">
                  {step.subtitle}
                </div>
                
                <h3 className="text-[clamp(1.75rem,4vw,3.5rem)] leading-[0.85] font-extrabold text-n-1 tracking-tight">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Minimal */}
        <div className="text-center mt-32 md:mt-48 lg:mt-56">
          <div className="inline-block">
            <div className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-n-1 mb-4 tracking-tight">
              Tu próximo taller empieza aquí.
            </div>
            <div className="text-n-4 text-[clamp(1rem,2vw,1.5rem)] font-extralight mb-12">
              2 horas tuyas. Impacto real.
            </div>
            
            <div className="mb-8">
              <Button 
                onClick={() => setCurrentPage && setCurrentPage('login')}
                white
                className="text-[clamp(0.875rem,1.5vw,1.125rem)]"
              >
                Empieza ahora
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
