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

const HowToUseBusiness = ({ setCurrentPage }) => {
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
      title: "Tu espacio. Tu aporte.",
      description: "Café. Biblioteca. Empresa. Espacio público. Lo que tienes puede transformar vidas. Cuéntanos qué puedes dar.",
      image: "/assets/circleimages/aliado-sub-nav-1.png"
    },
    {
      id: 1,
      title: "Define. Acuerda. Listo.",
      description: "Ticket simbólico en cafés. Horarios en espacios públicos. Mentorías en empresas. Tú decides. Nosotros nos adaptamos.",
      image: "/assets/circleimages/aliado-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Activamos juntos",
      description: "1–2 horas. Tú das el espacio. Nosotros llevamos la comunidad. Sesiones prácticas. Intergeneracionales. Sin trámites.",
      image: "/assets/circleimages/aliado-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Tu historia se cuenta",
      description: "Visibilidad en redes. Tu impacto en la web. Repetimos si te gusta. Escalamos si quieres más. El territorio crece contigo.",
      image: "/assets/circleimages/aliado-sub-nav-4.png"
    }
  ];

  const partnershipSteps = [
    {
      date: "TU LLAMADA",
      title: "15 minutos que importan",
      description: "Alineamos tu aporte con lo que el territorio necesita. Piloto simple. Sin complicaciones. Solo posibilidades.",
      completed: true
    },
    {
      date: "TU DECISIÓN", 
      title: "Elige tu forma de apoyar",
      description: "Cafés: ticket simbólico o donación. Espacios públicos: horarios que den vida. Empresas: mentorías que transformen.",
      completed: true
    },
    {
      date: "TU SESIÓN",
      title: "Co-creamos contigo", 
      description: "1–2 horas prácticas. Aprendizaje comunitario. Intergeneracional. Roles claros. Cero burocracia. Puro impacto.",
      completed: true
    },
    {
      date: "TU ESPACIO",
      title: "Activamos en tu territorio", 
      description: "Tú das el recurso. Nosotros traemos la comunidad. Operamos juntos. Tu espacio cobra vida.",
      completed: true
    },
    {
      date: "TU IMPACTO",
      title: "El mundo lo ve", 
      description: "Redes. Web. Tu historia documentada. Continuidad si quieres. Réplica si sueñas más grande. Sostenibilidad real.",
      completed: false
    }
  ];

  const partnerTestimonials = [
    {
      name: "Carmen Delgado",
      role: "Directora de RSE - Banco Nacional",
      text: "Aportamos horas de mentoría y materiales. Circle Up se encargó de la comunidad y la ejecución. Obtuvimos visibilidad en redes y web, y el equipo se sintió orgulloso de apoyar una causa local.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ricardo Morales",
      role: "CEO - TechSolutions",
      text: "Nuestros desarrolladores participaron como mentores. El proceso fue simple y la visibilidad del apoyo fue clara. Excelente para marca empleadora sin procesos pesados.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ana Lucia Vega",
      role: "Gerente de Talento Humano - Retail Corp",
      text: "Donamos insumos y tiempo profesional. Circle Up reconoce el apoyo públicamente y eso nos ayuda a contar nuestra historia de impacto real con la comunidad.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "José Manuel Torres",
      role: "Director de Sostenibilidad - Manufactura S.A.",
      text: "Usamos un salón en nuestra sede para activar sesiones abiertas. Vimos mayor uso del espacio y una relación más cercana con el barrio. La difusión fue muy valiosa.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Patricia Ruiz",
      role: "Coordinadora de Alianzas - Fundación Empresarial",
      text: "Aportamos materiales y mentores. La logística la llevó Circle Up y nosotros recibimos reconocimiento y contenidos para nuestras redes. Muy sencillo y efectivo.",
      avatar: "/src/assets/benefits/image-2.png"
    }
  ];

  const partnerFAQs = [
    {
      question: "¿Qué necesitamos de ti?",
      answer: "Tu espacio. Tus recursos. Tu tiempo. Cafés. Bibliotecas. Empresas. Espacios públicos. Insumos. Mentorías. Lo que puedas dar transforma."
    },
    {
      question: "¿Qué ganas con esto?",
      answer: "Visibilidad real. Tu historia en redes y web. Más vida en tu espacio. Más tráfico en tu café. Más cercanía con tu comunidad. Impacto que se ve."
    },
    {
      question: "¿Cómo funciona en cafés?",
      answer: "Ticket simbólico para asistentes. O donación si prefieres. Tú decides. Nunca será barrera. Siempre será puente."
    },
    {
      question: "¿Qué necesita un espacio público?",
      answer: "15–20 personas. Sillas y mesas básicas. Horarios disponibles. El resto lo ponemos nosotros. Tu espacio cobra vida. La comunidad se acerca."
    },
    {
      question: "¿Cuánto tiempo necesitas?",
      answer: "El que tú decidas. Una sesión. Una serie. Lo que funcione para ti. Nos adaptamos. Repetimos si te gusta. Crecemos juntos."
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
          title="TU ALIANZA EMPIEZA AQUÍ"
          fontSize={fontSize}
        />

        <RoadmapSection 
          quote="Aprendizaje comunitario. Intergeneracional. Para toda la vida. Iniciamos con recursos públicos. Crecemos hacia la sostenibilidad. Buscamos espacios, recursos y mentorías. A cambio: visibilidad real, vínculo genuino con tu comunidad, vida en tus espacios. Impacto que se siente."
          authorTitle="Circle Up Volunteer"
          authorRole="Director Proyecto"
          steps={partnershipSteps}
          fontSize={fontSize}
        />

        <FAQ 
          faqs={partnerFAQs}
          fontSize={fontSize}
        />


        <CallToActionSection 
          title="Tu espacio puede ser el inicio de algo grande con"
          subtitle="Cafés con más vida. Bibliotecas con propósito. Personas aprendiendo. Comunidades creciendo. Tu aporte importa."
          buttonText="ACTIVA TU IMPACTO"
          buttonAction={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage && setCurrentPage('login');
          }}
          fontSize={fontSize}
        />

        <NeedHelp 
          title="Tu alianza empieza aquí"
          subtitle="Espacios. Recursos. Mentorías. Tu aporte transforma comunidades."
          cards={[
            {
              iconType: "community",
              title: "Lo que buscamos",
              description: "Espacios que inspiren. Recursos que impulsen. Mentorías que guíen."
            },
            {
              iconType: "email",
              title: "Conversemos",
              description: "Tu historia merece ser contada. Publiquemos juntos tu impacto.",
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

export default HowToUseBusiness;
