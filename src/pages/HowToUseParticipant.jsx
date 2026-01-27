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

const HowToUseParticipant = ({ setCurrentPage }) => {
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
      title: "Descubre tu momento",
      description: "Tu próximo nivel está aquí. Habilidades que transforman. Talleres cerca de ti. Gratuitos. Abiertos. Listos para ti.",
      image: "/assets/circleimages/par-sub-nav-1.png"
    },
    {
      id: 1,
      title: "Un minuto. Tu cupo.",
      description: "Reserva en segundos. Recibe recordatorios. Si hay ticket simbólico en café, tú decides. Sin sorpresas. Solo claridad.",
      image: "/assets/circleimages/par-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Haz que pase",
      description: "1–2 horas donde tú creas. No escuchas. Haces. Sales con algo real: tu documento, tu plan, tu nueva habilidad.",
      image: "/assets/circleimages/par-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Sigue tu ritmo",
      description: "Tu certificado digital. Tus recursos. Tu siguiente paso. Y cuando estés listo, comparte lo que sabes. El círculo continúa.",
      image: "/assets/circleimages/par-sub-nav-4.png"
    }
  ];

  const participationSteps = [
    {
      date: "TU INICIO",
      title: "Un minuto que lo cambia todo",
      description: "Cero costo. Cero barreras. Solo tú y tu decisión. Completa tu perfil. El calendario llega a tu WhatsApp. Así de simple.",
      completed: true
    },
    {
      date: "TU MOMENTO", 
      title: "Confirma. Listo.",
      description: "Un clic y estás dentro. Ticket simbólico en café? Te avisamos antes. Tú siempre decides. Siempre en control.",
      completed: true
    },
    {
      date: "TU PODER",
      title: "1–2 horas. Resultados reales.", 
      description: "Tu CV. Tu presupuesto. Tu portafolio. Tu proyecto. Creas, no solo escuchas. Intergeneracional. Cercano. Tuyo.",
      completed: true
    },
    {
      date: "TU LEGADO",
      title: "Certificado. Recursos. Infinitas posibilidades.", 
      description: "Tu certificado digital te espera. Recursos para seguir. Vuelve cuando quieras. O enseña lo que aprendiste. El círculo eres tú.",
      completed: false
    }
  ];


  const participantFAQs = [
    {
      question: "¿Realmente es gratis?",
      answer: "100% gratis. Siempre. En cafés puede haber ticket simbólico opcional. Te avisamos antes. Tú decides. Sin sorpresas."
    },
    {
      question: "¿Qué necesito para empezar?",
      answer: "Solo ganas. Nada más. Tu edad no importa. Tu nivel educativo no importa. Si quieres aprender, ya tienes todo lo necesario."
    },
    {
      question: "¿Cómo me inscribo?",
      answer: "Un minuto. Formulario corto. Desde la agenda, puntos comunitarios o WhatsApp. Elige tu forma. Empieza ya."
    },
    {
      question: "¿Obtengo certificado?",
      answer: "Sí. Certificado digital por cada taller. Para tu hoja de vida. Para tu LinkedIn. Para ti. Tu logro, tu prueba."
    },
    {
      question: "¿Y si no puedo asistir a todas las sesiones?",
      answer: "La vida pasa. Lo entendemos. Horarios flexibles. Material de apoyo. Reprograma. Retoma cuando puedas. Tu ritmo. Tu camino."
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
          title="TU CAMINO EMPIEZA AQUÍ"
          fontSize={fontSize}
        />

        <RoadmapSection 
          quote="1–2 horas que transforman. Temas que importan. Para tu trabajo. Para tu vida. Sin barreras. Un minuto para inscribirte. Tu certificado digital te espera. Retoma cuando quieras. A tu ritmo. Siempre."
          authorTitle="Circle Up Volunteer"
          authorRole="Coordinador Proyecto"
          steps={participationSteps}
          fontSize={fontSize}
        />

        {/* Community Testimonials Section */}
        {/* <Section className="overflow-hidden relative"> */}
          {/* Background elements */}
          {/* <div className="absolute inset-0 opacity-2">
            <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-full opacity-6">
            <img src="/src/assets/gradient.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container relative z-2">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-n-7 rounded text-xs font-code font-bold tracking-wider uppercase text-n-4 mb-4">
                [ HISTORIAS DE ÉXITO ]
              </div>
              <h2 className="h2">Lo que dicen nuestros participantes</h2>
            </div>
            
            <div className="max-w-[70%] mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                {participantTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-n-7 rounded-lg border border-n-6 break-inside-avoid mb-5 flex flex-col">
                  <div className="p-5 flex-1">
                    <p className="text-sm text-n-1 font-mono leading-relaxed">{testimonial.text}</p>
                  </div>
                  <div className="bg-n-8 rounded-b-lg p-3 border-t border-n-6">
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="text-n-1 font-semibold text-xs">{testimonial.name}</h4>
                        <p className="text-n-4 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </Section> */}

        <FAQ 
          faqs={participantFAQs}
          fontSize={fontSize}
        />


        <CallToActionSection 
          title="Tu momento es ahora"
          subtitle="Aprende haciendo. Gratis. Cerca de ti. 1–2 horas. Resultados reales. Sin requisitos. Solo tú y tu decisión."
          buttonText="EMPIEZA TU HISTORIA"
          buttonAction={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage && setCurrentPage('login');
          }}
          fontSize={fontSize}
        />

        <NeedHelp 
          title="Tu transformación empieza hoy"
          subtitle="Miles ya crecen con Circle Up. Tu historia puede ser la siguiente."
          cards={[
            {
              iconType: "community",
              title: "Tu comunidad te espera",
              description: "Conecta. Aprende. Crece. Junto a otros como tú."
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

export default HowToUseParticipant;
