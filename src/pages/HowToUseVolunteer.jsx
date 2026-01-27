import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import NeedHelp from "../components/NeedHelp";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import RoadmapSection from "../components/RoadmapSection";
import CallToActionSection from "../components/CallToActionSection";
import Button from "../components/Button";

const HowToUseVolunteer = ({ setCurrentPage }) => {
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [menuLanguage, setMenuLanguage] = useState('es');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccessibilityMenu(false);
      }
    };

    if (showAccessibilityMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAccessibilityMenu]);

  const steps = [
    {
      id: 0,
      title: "Lo que sabes importa",
      description: "Cuéntanos tu saber. A quién quieres apoyar. Desde 2 horas al mes. No necesitas ser maestro. Solo tener algo que dar.",
      image: "/assets/circleimages/vol-sub-nav-1.png"
    },
    {
      id: 1,
      title: "90 minutos. Listo.",
      description: "Metodología clara. Plantillas útiles. Tips reales. Sales preparado. Tu primera sesión te espera.",
      image: "/assets/circleimages/vol-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Tu primer taller",
      description: "1–2 horas. Con apoyo. Tú pones el conocimiento. Nosotros la logística. La comunidad llega. Tú brillas.",
      image: "/assets/circleimages/vol-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Crece con cada sesión",
      description: "Feedback real. Nuevos temas. Mentoriza a otros si quieres. Tu impacto se multiplica. El círculo crece.",
      image: "/assets/circleimages/vol-sub-nav-4.png"
    }
  ];

  const volunteerJourney = [
    {
      date: "TU PERFIL",
      title: "Comparte quién eres",
      description: "Tus habilidades. Tu experiencia. Tu disponibilidad. Define qué sabes. Decide qué quieres dar. Así de simple.",
      completed: true
    },
    {
      date: "TU ONBOARDING", 
      title: "90 minutos que cambian todo",
      description: "Metodología comunitaria. Herramientas digitales. Técnicas de facilitación. Sales listo. Tu primera sesión te espera.",
      completed: true
    },
    {
      date: "TU DEBUT",
      title: "Primer taller. Con apoyo.", 
      description: "Coordinador experimentado a tu lado. Feedback real. Mejoras tu técnica. Descubres tu estilo. Nace el facilitador que llevas dentro.",
      completed: true
    },
    {
      date: "TU LEGADO",
      title: "Vuela solo. Crece libre.", 
      description: "Talleres independientes. Mentoriza a otros. Contribuye al ecosistema. Tu conocimiento se multiplica. El impacto no tiene límites.",
      completed: false
    }
  ];

  const volunteerTestimonials = [
    {
      name: "Carlos Mendoza",
      role: "Voluntario Experto - Marketing",
      text: "Facilité talleres de marketing digital con 15–25 asistentes. Con las plantillas y el acompañamiento, preparé cada sesión en menos de 1 hora y los emprendedores salieron con su plan de contenidos listo.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ana Sofía Torres",
      role: "Coordinadora de Sede",
      text: "Activamos programación semanal en la biblioteca. Con la guía de Circle Up estructuramos la agenda y el registro; el espacio se usa más y llegan nuevos públicos.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Roberto Vásquez",
      role: "Voluntario - Finanzas Personales",
      text: "En 8 meses facilité 12 sesiones de finanzas personales. Los asistentes organizan su presupuesto y varios abrieron cuentas de ahorro por primera vez.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Lucía Ramírez",
      role: "Voluntaria - Habilidades Digitales",
      text: "Diseñé un taller de Excel básico para adultos mayores. Usando ejemplos cotidianos, la mayoría completó su primera hoja de gastos y practicó fórmulas simples.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Diego Herrera",
      role: "Mentor de Voluntarios",
      text: "Acompaño a nuevos voluntarios en su primer taller. Con el esquema de observación y retroalimentación, la curva de aprendizaje es corta y en dos sesiones ya facilitan con autonomía.",
      avatar: "/src/assets/benefits/image-2.png"
    }
  ];

  const volunteerFAQs = [
    {
      question: "¿Qué necesito para empezar?",
      answer: "Experiencia en lo que quieres enseñar. 2 horas al mes. Ganas de compartir. No necesitas ser instructor. Te capacitamos. Te acompañamos. Tú solo trae tu saber."
    },
    {
      question: "¿Cómo me preparan?",
      answer: "90 minutos de onboarding. Metodología clara. Herramientas prácticas. Técnicas de facilitación. Tu primer taller con coordinador a tu lado. Aprendes haciendo."
    },
    {
      question: "¿Qué recibo como voluntario?",
      answer: "Capacitación. Plantillas. Materiales. Plataforma. Acompañamiento. Feedback constante. Constancia digital. Todo lo que necesitas para brillar."
    },
    {
      question: "¿Puedo elegir cuándo y dónde?",
      answer: "Sí. Tu horario. Tu ubicación. Presencial en bibliotecas. Virtual desde casa. Tú decides. Nos adaptamos. Tu comodidad es nuestra prioridad."
    },
    {
      question: "¿Cómo sé que estoy generando impacto?",
      answer: "Tablero simple. 3 señales: asistencia, práctica aplicada, retroalimentación. Constancia digital. Recomendaciones concretas. Ves tu impacto. Lo sientes. Lo mides."
    }
  ];


  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        {/* Accessibility Button */}
        <div 
          className="fixed top-24 left-4 sm:left-6 md:left-8 lg:left-12 z-50 transition-all duration-500"
          ref={menuRef}
        >
          <Button 
            onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
            white
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-semibold">Aa</span>
            </span>
          </Button>

          {/* Accessibility Menu */}
          {showAccessibilityMenu && (
            <div className="absolute top-full mt-2 left-0 bg-n-8/95 backdrop-blur-xl border border-n-6/50 rounded-2xl p-4 sm:p-6 shadow-2xl w-72 sm:w-80 animate-fadeIn">
              <div className="flex justify-end gap-1 mb-4 pb-4 border-b border-n-6/30">
                <button
                  onClick={() => setMenuLanguage('en')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    menuLanguage === 'en' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setMenuLanguage('es')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    menuLanguage === 'es' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
                  }`}
                >
                  ES
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                  {menuLanguage === 'en' ? 'FONT SIZE' : 'TAMAÑO DE FUENTE'}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setFontSize(fontSize === 'normal' ? 'small' : fontSize === 'large' ? 'normal' : 'small')}
                    className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <div className="flex-1 mx-4 text-center">
                    <div className="text-n-1 font-semibold">
                      {fontSize === 'small' 
                        ? (menuLanguage === 'en' ? 'Small' : 'Pequeño')
                        : fontSize === 'large' 
                        ? (menuLanguage === 'en' ? 'Large' : 'Grande')
                        : (menuLanguage === 'en' ? 'Medium' : 'Mediano')}
                    </div>
                  </div>
                  <button
                    onClick={() => setFontSize(fontSize === 'small' ? 'normal' : fontSize === 'normal' ? 'large' : 'large')}
                    className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setFontSize('small')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'small' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Small' : 'Pequeño'}
                  </button>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'normal' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Medium' : 'Mediano'}
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'large' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Large' : 'Grande'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <HowItWorks 
          steps={steps}
          title="TU CAMINO COMO VOLUNTARIO"
          fontSize={fontSize}
        />

        <RoadmapSection 
          quote="1–2 horas prácticas. Plantillas listas. Acompañamiento real. Tú pones el conocimiento. Nosotros la logística. La comunidad llega. Desde 2 horas al mes. Sin experiencia previa. Solo ganas de compartir."
          authorTitle="Circle Up Volunteer"
          authorRole="Coordinador Voluntarios"
          steps={volunteerJourney}
          fontSize={fontSize}
        />

        <FAQ 
          faqs={volunteerFAQs}
          fontSize={fontSize}
        />


        <CallToActionSection 
          title="Tu conocimiento puede cambiar vidas con"
          subtitle="1–2 horas. Tu experiencia. Nuestra logística. Su transformación. Desde 2 horas al mes. Empieza cuando estés listo."
          buttonText="COMPARTE TU SABER"
          buttonAction={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage && setCurrentPage('login');
          }}
          fontSize={fontSize}
        />

        <NeedHelp 
          title="Tu camino como voluntario empieza hoy"
          subtitle="Acompañamiento. Plantillas. Comunidad. Todo lo que necesitas para brillar."
          cards={[
            {
              iconType: "community",
              title: "Tu comunidad te espera",
              description: "Voluntarios que inspiran. Coordinadores que apoyan. Juntos crecemos."
            },
            {
              iconType: "email",
              title: "Da el primer paso",
              description: "",
              email: "hola@circleup.com.co"
            }
          ]}
        />

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default HowToUseVolunteer;
