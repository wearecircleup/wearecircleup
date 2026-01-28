import { useState, useEffect, useRef } from "react";

const StorySection = ({ fontSize = 'normal', storyContent = [] }) => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    setActiveSection(index);
  };

  return (
    <section className="relative bg-n-8 py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-24">
          
          {/* Fixed Navigation - Hidden on mobile, visible on lg+ */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 xl:top-32 lg:self-start">
            <nav className="space-y-1.5 lg:space-y-2">
              {storyContent.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`w-full text-left py-3 lg:py-4 transition-all duration-300 group border-l-2 pl-4 lg:pl-6 ${
                    activeSection === index
                      ? 'border-n-1 text-n-1'
                      : 'border-n-7 text-n-4 hover:text-n-2 hover:border-n-5'
                  }`}
                >
                  <div className={`uppercase tracking-widest mb-1.5 lg:mb-2 opacity-60 font-light ${
                    fontSize === 'small' ? 'text-[0.625rem] lg:text-xs' : fontSize === 'large' ? 'text-sm lg:text-base' : 'text-xs lg:text-sm'
                  }`}>
                    {section.id}
                  </div>
                  <div className={`transition-colors ${
                    activeSection === index ? 'font-medium' : 'font-light'
                  } ${
                    fontSize === 'small' ? 'text-sm lg:text-base xl:text-lg' : fontSize === 'large' ? 'text-lg lg:text-xl xl:text-2xl' : 'text-base lg:text-lg xl:text-xl'
                  }`}>
                    {section.title}
                  </div>
                </button>
              ))}
            </nav>

            {/* Progress Indicator */}
            <div className="mt-12 lg:mt-16 pt-8 lg:pt-10 border-t border-n-7">
              <div className={`text-n-5 mb-3 lg:mb-4 tracking-wider font-light ${
                fontSize === 'small' ? 'text-xl lg:text-2xl xl:text-3xl' : fontSize === 'large' ? 'text-3xl lg:text-4xl xl:text-5xl' : 'text-2xl lg:text-3xl xl:text-4xl'
              }`}>
                {Math.round(((activeSection + 1) / storyContent.length) * 100)}%
              </div>
              <div className="h-[1px] bg-n-7 relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-n-1 transition-all duration-1000 ease-out"
                  style={{ width: `${((activeSection + 1) / storyContent.length) * 100}%` }}
                />
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-9">
            {/* Mobile Navigation Dropdown */}
            <div className="lg:hidden mb-8 sm:mb-10">
              <div className="bg-n-7/50 backdrop-blur-sm border border-n-6 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest text-n-4">Progreso</span>
                  <span className="text-lg font-semibold text-n-1">
                    {Math.round(((activeSection + 1) / storyContent.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 bg-n-7 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-color-1 to-color-2 transition-all duration-1000 ease-out"
                    style={{ width: `${((activeSection + 1) / storyContent.length) * 100}%` }}
                  />
                </div>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {storyContent.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(index)}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        activeSection === index
                          ? 'bg-n-1 text-n-8'
                          : 'bg-n-7 text-n-3 hover:bg-n-6'
                      }`}
                    >
                      {section.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-16 sm:space-y-20 md:space-y-28 lg:space-y-36 xl:space-y-44">
              {storyContent.map((section, index) => (
                <article
                  key={section.id}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28"
                >
                  {/* Section Header */}
                  <header className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                    <div className={`uppercase tracking-widest text-n-5 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-light ${
                      fontSize === 'small' ? 'text-[0.625rem] sm:text-xs' : fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    }`}>
                      {section.id} — {section.subtitle}
                    </div>
                    <h2 className={`leading-[0.95] font-bold text-n-1 tracking-tighter mb-4 sm:mb-5 md:mb-6 lg:mb-8 ${
                      fontSize === 'small' ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl' : fontSize === 'large' ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                    }`}>
                      {section.title}
                    </h2>
                    <div className="w-10 sm:w-12 md:w-14 lg:w-16 h-[1px] bg-n-1"></div>
                  </header>

                  {/* Content */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                    {section.content.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex}
                        className={`text-n-3 leading-relaxed max-w-4xl font-extralight ${
                          fontSize === 'small' ? 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl' : fontSize === 'large' ? 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl' : 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
