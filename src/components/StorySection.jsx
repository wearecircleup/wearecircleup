import { useState, useEffect, useRef } from "react";

const StorySection = ({ fontSize = 'normal' }) => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  const storyContent = [
    {
      id: "01",
      subtitle: "TU CONOCIMIENTO",
      title: "Ya sabes algo valioso",
      content: [
        "Sabes usar Excel para hacer presupuestos. Sabes editar fotos en Canva. Sabes cómo funciona Instagram para negocios. Sabes organizar finanzas personales.",
        "Ese conocimiento que usas todos los días, que te parece obvio, es exactamente lo que alguien más necesita aprender. No necesitas ser experto mundial. Solo necesitas saber más que quien está empezando.",
        "En tu ciudad hay personas buscando aprender lo que tú ya dominas. No encuentran cursos accesibles, no pueden pagar academias, no tienen tiempo para videos de 40 horas. Necesitan 2 horas contigo, práctica real, preguntas respondidas en el momento."
      ]
    },
    {
      id: "02",
      subtitle: "EL ESPACIO",
      title: "Los lugares ya existen",
      content: [
        "Una biblioteca con mesas vacías los martes por la tarde. Un café con WiFi que necesita más clientes entre semana. Una sala comunal que solo se usa los fines de semana.",
        "No necesitas rentar un salón. No necesitas equipos especiales. Una mesa, sillas, conexión WiFi. Los participantes traen sus dispositivos. Tú traes el conocimiento.",
        "Los dueños de estos espacios quieren actividad, quieren comunidad, quieren que sus lugares tengan propósito. Un taller de 2 horas les da vida a esas mesas vacías."
      ]
    },
    {
      id: "03",
      subtitle: "LA SESIÓN",
      title: "2 horas que cambian perspectivas",
      content: [
        "Martes 4 PM. 12 personas llegan a la biblioteca. Tú les enseñas cómo hacer una tabla dinámica en Excel. No teoría abstracta. Casos reales: inventarios, nóminas, reportes.",
        "30 minutos de explicación. 90 minutos de práctica. Tú caminas entre las mesas, respondes preguntas, corriges errores, muestras atajos. Ellos practican con sus propios datos.",
        "Al final, cada persona se va con una habilidad aplicable mañana en su trabajo. Tú te vas sabiendo que tu conocimiento sirvió para algo concreto. No es caridad, es intercambio de valor real."
      ]
    },
    {
      id: "04",
      subtitle: "EL IMPACTO",
      title: "Resultados medibles, no promesas",
      content: [
        "Tocancipá, 6 meses: 23 voluntarios enseñaron 47 talleres. 127 personas aprendieron habilidades prácticas. 89% las aplicó en su trabajo en menos de 2 semanas.",
        "Costo: $0 para todos. Infraestructura: espacios existentes. Tasa de asistencia: 78%. Tasa de finalización: 71%. Comparado con cursos online: 15% asistencia, 8% finalización.",
        "41% de los participantes regresó para aprender otro tema. 23% se convirtió en voluntario después de asistir a 3 talleres. El ciclo se autoalimenta: aprendes, luego enseñas."
      ]
    },
    {
      id: "05",
      subtitle: "TU DECISIÓN",
      title: "Empieza con un taller",
      content: [
        "No necesitas preparar un curso de 40 horas. No necesitas certificaciones de docencia. No necesitas experiencia previa enseñando. Solo necesitas 2 horas y ganas de compartir.",
        "Nosotros te ayudamos con la logística: encontramos el espacio, gestionamos inscripciones, enviamos recordatorios, preparamos materiales básicos. Tú solo llegas y enseñas.",
        "Después de tu primer taller, decides si continúas. Sin compromisos, sin obligaciones. Si funcionó y quieres repetir, coordinamos el siguiente. Si no, está bien. Un taller ya hizo diferencia.",
        "El conocimiento que tienes puede cambiar la trayectoria laboral de alguien. Puede ayudar a alguien a conseguir un mejor trabajo, negociar un aumento, emprender un negocio. 2 horas tuyas, impacto medible en vidas reales."
      ]
    }
  ];

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
    sectionRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
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
                  <div className="text-xs lg:text-sm uppercase tracking-widest mb-1.5 lg:mb-2 opacity-60 font-light">
                    {section.id}
                  </div>
                  <div className={`text-base lg:text-lg xl:text-xl transition-colors ${
                    activeSection === index ? 'font-medium' : 'font-light'
                  }`}>
                    {section.title}
                  </div>
                </button>
              ))}
            </nav>

            {/* Progress Indicator */}
            <div className="mt-12 lg:mt-16 pt-8 lg:pt-10 border-t border-n-7">
              <div className="text-2xl lg:text-3xl xl:text-4xl text-n-5 mb-3 lg:mb-4 tracking-wider font-light">
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
                    <div className="text-xs sm:text-sm uppercase tracking-widest text-n-5 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-light">
                      {section.id} — {section.subtitle}
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] font-bold text-n-1 tracking-tighter mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                      {section.title}
                    </h2>
                    <div className="w-10 sm:w-12 md:w-14 lg:w-16 h-[1px] bg-n-1"></div>
                  </header>

                  {/* Content */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                    {section.content.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex}
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-n-3 leading-relaxed max-w-4xl font-extralight"
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
