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
  const [fontFamily, setFontFamily] = useState('sans');
  const [menuLanguage, setMenuLanguage] = useState('es');
  const [pageLanguage, setPageLanguage] = useState('es');
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

  const contentByLanguage = {
    es: {
      howItWorksTitle: "TU ALIANZA EMPIEZA AQUÍ",
      steps: [
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
      ],
      roadmapQuote: "Aprendizaje comunitario. Intergeneracional. Para toda la vida. Iniciamos con recursos públicos. Crecemos hacia la sostenibilidad. Buscamos espacios, recursos y mentorías. A cambio: visibilidad real, vínculo genuino con tu comunidad, vida en tus espacios. Impacto que se siente.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Director Proyecto",
      partnershipSteps: [
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
      ],
      faqs: [
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
      ],
      ctaTitle: "Tu espacio puede ser el inicio de algo grande",
      ctaSubtitle: "Cafés con más vida. Bibliotecas con propósito. Personas aprendiendo. Comunidades creciendo. Tu aporte importa.",
      ctaButton: "ACTIVA TU IMPACTO",
      needHelpTitle: "Tu alianza empieza aquí",
      needHelpSubtitle: "Espacios. Recursos. Mentorías. Tu aporte transforma comunidades.",
      needHelpCards: [
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
      ]
    },
    en: {
      howItWorksTitle: "YOUR PARTNERSHIP STARTS HERE",
      steps: [
        {
          id: 0,
          title: "Your space. Your contribution.",
          description: "Café. Library. Company. Public space. What you have can transform lives. Tell us what you can give.",
          image: "/assets/circleimages/aliado-sub-nav-1.png"
        },
        {
          id: 1,
          title: "Define. Agree. Done.",
          description: "Symbolic ticket in cafés. Schedules in public spaces. Mentorships in companies. You decide. We adapt.",
          image: "/assets/circleimages/aliado-sub-nav-2.png"
        },
        {
          id: 2,
          title: "We activate together",
          description: "1–2 hours. You provide the space. We bring the community. Practical sessions. Intergenerational. No red tape.",
          image: "/assets/circleimages/aliado-sub-nav-3.png"
        },
        {
          id: 3,
          title: "Your story is told",
          description: "Visibility on social media. Your impact on the web. We repeat if you like it. We scale if you want more. The territory grows with you.",
          image: "/assets/circleimages/aliado-sub-nav-4.png"
        }
      ],
      roadmapQuote: "Community learning. Intergenerational. For life. We start with public resources. We grow toward sustainability. We seek spaces, resources, and mentorships. In return: real visibility, genuine connection with your community, life in your spaces. Impact you can feel.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Project Director",
      partnershipSteps: [
        {
          date: "YOUR CALL",
          title: "15 minutes that matter",
          description: "We align your contribution with what the territory needs. Simple pilot. No complications. Just possibilities.",
          completed: true
        },
        {
          date: "YOUR DECISION",
          title: "Choose your way to support",
          description: "Cafés: symbolic ticket or donation. Public spaces: schedules that give life. Companies: mentorships that transform.",
          completed: true
        },
        {
          date: "YOUR SESSION",
          title: "We co-create with you",
          description: "1–2 practical hours. Community learning. Intergenerational. Clear roles. Zero bureaucracy. Pure impact.",
          completed: true
        },
        {
          date: "YOUR SPACE",
          title: "We activate in your territory",
          description: "You provide the resource. We bring the community. We operate together. Your space comes alive.",
          completed: true
        },
        {
          date: "YOUR IMPACT",
          title: "The world sees it",
          description: "Social media. Web. Your story documented. Continuity if you want. Replication if you dream bigger. Real sustainability.",
          completed: false
        }
      ],
      faqs: [
        {
          question: "What do we need from you?",
          answer: "Your space. Your resources. Your time. Cafés. Libraries. Companies. Public spaces. Supplies. Mentorships. Whatever you can give transforms."
        },
        {
          question: "What do you gain from this?",
          answer: "Real visibility. Your story on social media and web. More life in your space. More traffic in your café. Closer connection with your community. Impact you can see."
        },
        {
          question: "How does it work in cafés?",
          answer: "Symbolic ticket for attendees. Or donation if you prefer. You decide. It will never be a barrier. Always a bridge."
        },
        {
          question: "What does a public space need?",
          answer: "15–20 people. Basic chairs and tables. Available schedules. We provide the rest. Your space comes alive. The community gets closer."
        },
        {
          question: "How much time do you need?",
          answer: "Whatever you decide. One session. A series. Whatever works for you. We adapt. We repeat if you like it. We grow together."
        }
      ],
      ctaTitle: "Your space can be the start of something big",
      ctaSubtitle: "Cafés with more life. Libraries with purpose. People learning. Communities growing. Your contribution matters.",
      ctaButton: "ACTIVATE YOUR IMPACT",
      needHelpTitle: "Your partnership starts here",
      needHelpSubtitle: "Spaces. Resources. Mentorships. Your contribution transforms communities.",
      needHelpCards: [
        {
          iconType: "community",
          title: "What we're looking for",
          description: "Spaces that inspire. Resources that drive. Mentorships that guide."
        },
        {
          iconType: "email",
          title: "Let's talk",
          description: "Your story deserves to be told. Let's publish your impact together.",
          email: "hola@circleup.com.co"
        }
      ]
    },
    pt: {
      howItWorksTitle: "SUA PARCERIA COMEÇA AQUI",
      steps: [
        {
          id: 0,
          title: "Seu espaço. Sua contribuição.",
          description: "Café. Biblioteca. Empresa. Espaço público. O que você tem pode transformar vidas. Conte-nos o que pode dar.",
          image: "/assets/circleimages/aliado-sub-nav-1.png"
        },
        {
          id: 1,
          title: "Defina. Acorde. Pronto.",
          description: "Ingresso simbólico em cafés. Horários em espaços públicos. Mentorias em empresas. Você decide. Nós nos adaptamos.",
          image: "/assets/circleimages/aliado-sub-nav-2.png"
        },
        {
          id: 2,
          title: "Ativamos juntos",
          description: "1–2 horas. Você dá o espaço. Nós trazemos a comunidade. Sessões práticas. Intergeracionais. Sem burocracia.",
          image: "/assets/circleimages/aliado-sub-nav-3.png"
        },
        {
          id: 3,
          title: "Sua história é contada",
          description: "Visibilidade nas redes. Seu impacto na web. Repetimos se você gostar. Escalamos se quiser mais. O território cresce com você.",
          image: "/assets/circleimages/aliado-sub-nav-4.png"
        }
      ],
      roadmapQuote: "Aprendizagem comunitária. Intergeracional. Para toda a vida. Começamos com recursos públicos. Crescemos rumo à sustentabilidade. Buscamos espaços, recursos e mentorias. Em troca: visibilidade real, vínculo genuíno com sua comunidade, vida em seus espaços. Impacto que se sente.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Diretor de Projeto",
      partnershipSteps: [
        {
          date: "SUA LIGAÇÃO",
          title: "15 minutos que importam",
          description: "Alinhamos sua contribuição com o que o território precisa. Piloto simples. Sem complicações. Apenas possibilidades.",
          completed: true
        },
        {
          date: "SUA DECISÃO",
          title: "Escolha sua forma de apoiar",
          description: "Cafés: ingresso simbólico ou doação. Espaços públicos: horários que dão vida. Empresas: mentorias que transformam.",
          completed: true
        },
        {
          date: "SUA SESSÃO",
          title: "Co-criamos com você",
          description: "1–2 horas práticas. Aprendizagem comunitária. Intergeracional. Papéis claros. Zero burocracia. Puro impacto.",
          completed: true
        },
        {
          date: "SEU ESPAÇO",
          title: "Ativamos em seu território",
          description: "Você dá o recurso. Nós trazemos a comunidade. Operamos juntos. Seu espaço ganha vida.",
          completed: true
        },
        {
          date: "SEU IMPACTO",
          title: "O mundo vê",
          description: "Redes. Web. Sua história documentada. Continuidade se quiser. Réplica se sonhar maior. Sustentabilidade real.",
          completed: false
        }
      ],
      faqs: [
        {
          question: "O que precisamos de você?",
          answer: "Seu espaço. Seus recursos. Seu tempo. Cafés. Bibliotecas. Empresas. Espaços públicos. Insumos. Mentorias. O que puder dar transforma."
        },
        {
          question: "O que você ganha com isso?",
          answer: "Visibilidade real. Sua história nas redes e web. Mais vida em seu espaço. Mais tráfego em seu café. Mais proximidade com sua comunidade. Impacto que se vê."
        },
        {
          question: "Como funciona em cafés?",
          answer: "Ingresso simbólico para participantes. Ou doação se preferir. Você decide. Nunca será barreira. Sempre será ponte."
        },
        {
          question: "O que um espaço público precisa?",
          answer: "15–20 pessoas. Cadeiras e mesas básicas. Horários disponíveis. O resto colocamos nós. Seu espaço ganha vida. A comunidade se aproxima."
        },
        {
          question: "Quanto tempo você precisa?",
          answer: "O que você decidir. Uma sessão. Uma série. O que funcionar para você. Nos adaptamos. Repetimos se você gostar. Crescemos juntos."
        }
      ],
      ctaTitle: "Seu espaço pode ser o início de algo grande",
      ctaSubtitle: "Cafés com mais vida. Bibliotecas com propósito. Pessoas aprendendo. Comunidades crescendo. Sua contribuição importa.",
      ctaButton: "ATIVE SEU IMPACTO",
      needHelpTitle: "Sua parceria começa aqui",
      needHelpSubtitle: "Espaços. Recursos. Mentorias. Sua contribuição transforma comunidades.",
      needHelpCards: [
        {
          iconType: "community",
          title: "O que buscamos",
          description: "Espaços que inspiram. Recursos que impulsionam. Mentorias que guiam."
        },
        {
          iconType: "email",
          title: "Vamos conversar",
          description: "Sua história merece ser contada. Vamos publicar seu impacto juntos.",
          email: "hola@circleup.com.co"
        }
      ]
    }
  };

  const content = contentByLanguage[pageLanguage];


  return (
    <>
      <div className={`pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden ${
        fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
      }`}>
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
              {/* Page Language Selector */}
              <div className="mb-6">
                <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                  {menuLanguage === 'en' ? 'PAGE LANGUAGE' : menuLanguage === 'pt' ? 'IDIOMA DA PÁGINA' : 'IDIOMA DE PÁGINA'}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPageLanguage('es')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      pageLanguage === 'es' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => setPageLanguage('en')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      pageLanguage === 'en' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setPageLanguage('pt')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      pageLanguage === 'pt' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    PT
                  </button>
                </div>
              </div>

              {/* Menu Language Selector */}
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
                <button
                  onClick={() => setMenuLanguage('pt')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    menuLanguage === 'pt' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
                  }`}
                >
                  PT
                </button>
              </div>

              {/* Font Family */}
              <div className="mb-6">
                <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                  {menuLanguage === 'en' ? 'FONT FAMILY' : menuLanguage === 'pt' ? 'FAMÍLIA DA FONTE' : 'FAMILIA DE FUENTE'}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFontFamily('sans')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      fontFamily === 'sans' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    Sans Serif
                  </button>
                  <button
                    onClick={() => setFontFamily('serif')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      fontFamily === 'serif' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    Serif
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="mb-6">
                <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                  {menuLanguage === 'en' ? 'FONT SIZE' : menuLanguage === 'pt' ? 'TAMANHO DA FONTE' : 'TAMAÑO DE FUENTE'}
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
                        ? (menuLanguage === 'en' ? 'Small' : menuLanguage === 'pt' ? 'Pequeno' : 'Pequeño')
                        : fontSize === 'large' 
                        ? (menuLanguage === 'en' ? 'Large' : menuLanguage === 'pt' ? 'Grande' : 'Grande')
                        : (menuLanguage === 'en' ? 'Medium' : menuLanguage === 'pt' ? 'Médio' : 'Mediano')}
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
                    {menuLanguage === 'en' ? 'Small' : menuLanguage === 'pt' ? 'Pequeno' : 'Pequeño'}
                  </button>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'normal' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Medium' : menuLanguage === 'pt' ? 'Médio' : 'Mediano'}
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'large' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Large' : menuLanguage === 'pt' ? 'Grande' : 'Grande'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <HowItWorks 
          steps={content.steps}
          title={content.howItWorksTitle}
          fontSize={fontSize}
        />

        <RoadmapSection 
          quote={content.roadmapQuote}
          authorTitle={content.roadmapAuthorTitle}
          authorRole={content.roadmapAuthorRole}
          steps={content.partnershipSteps}
          fontSize={fontSize}
        />

        <FAQ 
          faqs={content.faqs}
          fontSize={fontSize}
        />


        <CallToActionSection 
          title={content.ctaTitle}
          subtitle={content.ctaSubtitle}
          buttonText={content.ctaButton}
          buttonAction={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage && setCurrentPage('login');
          }}
          fontSize={fontSize}
        />

        <NeedHelp 
          title={content.needHelpTitle}
          subtitle={content.needHelpSubtitle}
          cards={content.needHelpCards}
        />

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default HowToUseBusiness;
