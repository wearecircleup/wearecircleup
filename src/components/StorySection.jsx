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
    <section className="relative bg-n-8 py-20 md:py-32 lg:py-40">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 xl:gap-32">
          
          {/* Fixed Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start overflow-hidden">
            <nav className="space-y-2 overflow-hidden">
              {storyContent.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`w-full text-left py-4 transition-all duration-300 group border-l-[1px] pl-6 ${
                    activeSection === index
                      ? 'border-n-1 text-n-1'
                      : 'border-n-7 text-n-4 hover:text-n-2 hover:border-n-5'
                  }`}
                >
                  <div className={`uppercase tracking-[0.2em] mb-2 opacity-60 ${
                    fontSize === 'small' 
                      ? 'text-[clamp(0.5rem,0.8vw,0.65rem)]' 
                      : fontSize === 'large'
                      ? 'text-[clamp(0.65rem,1.1vw,0.875rem)]'
                      : 'text-[clamp(0.55rem,0.95vw,0.75rem)]'
                  } font-light`}>
                    {section.id}
                  </div>
                  <div className={`transition-colors ${
                    fontSize === 'small' 
                      ? 'text-[clamp(1rem,2vw,1.5rem)]' 
                      : fontSize === 'large'
                      ? 'text-[clamp(1.5rem,3vw,2.25rem)]'
                      : 'text-[clamp(1.25rem,2.5vw,1.875rem)]'
                  } ${
                    activeSection === index ? 'font-medium' : 'font-light'
                  }`}>
                    {section.title}
                  </div>
                </button>
              ))}
            </nav>

            {/* Progress Indicator */}
            <div className="mt-16 pt-10 border-t border-n-7">
              <div className={`text-n-5 mb-4 tracking-wider ${
                fontSize === 'small' 
                  ? 'text-[clamp(0.875rem,1.5vw,1.125rem)]' 
                  : fontSize === 'large'
                  ? 'text-[clamp(1.25rem,2.5vw,1.875rem)]'
                  : 'text-[clamp(1rem,2vw,1.5rem)]'
              } font-light`}>
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
            <div className="space-y-24 md:space-y-40 lg:space-y-48 xl:space-y-56">
              {storyContent.map((section, index) => (
                <article
                  key={section.id}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-32"
                >
                  {/* Section Header */}
                  <header className="mb-12 md:mb-16 lg:mb-20">
                    <div className={`uppercase tracking-[0.25em] text-n-5 mb-4 md:mb-6 ${
                      fontSize === 'small' 
                        ? 'text-[clamp(0.5rem,0.8vw,0.65rem)]' 
                        : fontSize === 'large'
                        ? 'text-[clamp(0.65rem,1.1vw,0.875rem)]'
                        : 'text-[clamp(0.55rem,0.95vw,0.75rem)]'
                    } font-light`}>
                      {section.id} — {section.subtitle}
                    </div>
                    <h2 className={`leading-[0.95] font-bold text-n-1 tracking-tighter mb-6 md:mb-8 break-words ${
                      fontSize === 'small' 
                        ? 'text-[clamp(1.75rem,4.5vw,5rem)]' 
                        : fontSize === 'large'
                        ? 'text-[clamp(2.5rem,6.5vw,7rem)]'
                        : 'text-[clamp(2rem,5.5vw,6rem)]'
                    }`}>
                      {section.title}
                    </h2>
                    <div className="w-12 md:w-16 h-[1px] bg-n-1"></div>
                  </header>

                  {/* Content */}
                  <div className="space-y-6 md:space-y-8">
                    {section.content.map((paragraph, pIndex) => (
                      <p 
                        key={pIndex}
                        className={`text-n-3 leading-relaxed max-w-3xl font-extralight break-words ${
                          fontSize === 'small' 
                            ? 'text-[clamp(0.875rem,1.5vw,1.125rem)]' 
                            : fontSize === 'large'
                            ? 'text-[clamp(1.25rem,2.5vw,1.875rem)]'
                            : 'text-[clamp(1rem,2vw,1.5rem)]'
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
