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
      howItWorksTitle: "TU CAMINO EMPIEZA AQUÍ",
      steps: [
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
      ],
      roadmapQuote: "1–2 horas que transforman. Temas que importan. Para tu trabajo. Para tu vida. Sin barreras. Un minuto para inscribirte. Tu certificado digital te espera. Retoma cuando quieras. A tu ritmo. Siempre.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Coordinador Proyecto",
      participationSteps: [
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
      ],
      faqs: [
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
      ],
      ctaTitle: "Tu momento es ahora",
      ctaSubtitle: "Aprende haciendo. Gratis. Cerca de ti. 1–2 horas. Resultados reales. Sin requisitos. Solo tú y tu decisión.",
      ctaButton: "EMPIEZA TU HISTORIA",
      needHelpTitle: "Tu transformación empieza hoy",
      needHelpSubtitle: "Miles ya crecen con Circle Up. Tu historia puede ser la siguiente.",
      needHelpCards: [
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
      ]
    },
    en: {
      howItWorksTitle: "YOUR JOURNEY STARTS HERE",
      steps: [
        {
          id: 0,
          title: "Discover your moment",
          description: "Your next level is here. Transformative skills. Workshops near you. Free. Open. Ready for you.",
          image: "/assets/circleimages/par-sub-nav-1.png"
        },
        {
          id: 1,
          title: "One minute. Your spot.",
          description: "Book in seconds. Get reminders. If there's a symbolic café ticket, you decide. No surprises. Just clarity.",
          image: "/assets/circleimages/par-sub-nav-2.png"
        },
        {
          id: 2,
          title: "Make it happen",
          description: "1–2 hours where you create. You don't just listen. You do. Leave with something real: your document, your plan, your new skill.",
          image: "/assets/circleimages/par-sub-nav-3.png"
        },
        {
          id: 3,
          title: "Follow your rhythm",
          description: "Your digital certificate. Your resources. Your next step. And when you're ready, share what you know. The circle continues.",
          image: "/assets/circleimages/par-sub-nav-4.png"
        }
      ],
      roadmapQuote: "1–2 hours that transform. Topics that matter. For your work. For your life. No barriers. One minute to register. Your digital certificate awaits. Come back whenever. At your pace. Always.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Project Coordinator",
      participationSteps: [
        {
          date: "YOUR START",
          title: "One minute that changes everything",
          description: "Zero cost. Zero barriers. Just you and your decision. Complete your profile. Calendar arrives to your WhatsApp. That simple.",
          completed: true
        },
        {
          date: "YOUR MOMENT",
          title: "Confirm. Done.",
          description: "One click and you're in. Symbolic café ticket? We'll tell you beforehand. You always decide. Always in control.",
          completed: true
        },
        {
          date: "YOUR POWER",
          title: "1–2 hours. Real results.",
          description: "Your CV. Your budget. Your portfolio. Your project. You create, not just listen. Intergenerational. Close. Yours.",
          completed: true
        },
        {
          date: "YOUR LEGACY",
          title: "Certificate. Resources. Infinite possibilities.",
          description: "Your digital certificate awaits. Resources to continue. Come back whenever. Or teach what you learned. The circle is you.",
          completed: false
        }
      ],
      faqs: [
        {
          question: "Is it really free?",
          answer: "100% free. Always. In cafés there might be an optional symbolic ticket. We'll tell you beforehand. You decide. No surprises."
        },
        {
          question: "What do I need to start?",
          answer: "Just willingness. Nothing more. Your age doesn't matter. Your education level doesn't matter. If you want to learn, you have everything you need."
        },
        {
          question: "How do I register?",
          answer: "One minute. Short form. From the calendar, community points, or WhatsApp. Choose your way. Start now."
        },
        {
          question: "Do I get a certificate?",
          answer: "Yes. Digital certificate for each workshop. For your resume. For your LinkedIn. For you. Your achievement, your proof."
        },
        {
          question: "What if I can't attend all sessions?",
          answer: "Life happens. We understand. Flexible schedules. Support materials. Reschedule. Resume when you can. Your pace. Your path."
        }
      ],
      ctaTitle: "Your moment is now",
      ctaSubtitle: "Learn by doing. Free. Near you. 1–2 hours. Real results. No requirements. Just you and your decision.",
      ctaButton: "START YOUR STORY",
      needHelpTitle: "Your transformation starts today",
      needHelpSubtitle: "Thousands are already growing with Circle Up. Your story could be next.",
      needHelpCards: [
        {
          iconType: "community",
          title: "Your community awaits",
          description: "Connect. Learn. Grow. Together with others like you."
        },
        {
          iconType: "email",
          title: "Take the first step",
          description: "",
          email: "hola@circleup.com.co"
        }
      ]
    },
    pt: {
      howItWorksTitle: "SUA JORNADA COMEÇA AQUI",
      steps: [
        {
          id: 0,
          title: "Descubra seu momento",
          description: "Seu próximo nível está aqui. Habilidades transformadoras. Oficinas perto de você. Gratuitas. Abertas. Prontas para você.",
          image: "/assets/circleimages/par-sub-nav-1.png"
        },
        {
          id: 1,
          title: "Um minuto. Sua vaga.",
          description: "Reserve em segundos. Receba lembretes. Se houver ingresso simbólico no café, você decide. Sem surpresas. Apenas clareza.",
          image: "/assets/circleimages/par-sub-nav-2.png"
        },
        {
          id: 2,
          title: "Faça acontecer",
          description: "1–2 horas onde você cria. Não apenas ouve. Faz. Sai com algo real: seu documento, seu plano, sua nova habilidade.",
          image: "/assets/circleimages/par-sub-nav-3.png"
        },
        {
          id: 3,
          title: "Siga seu ritmo",
          description: "Seu certificado digital. Seus recursos. Seu próximo passo. E quando estiver pronto, compartilhe o que sabe. O círculo continua.",
          image: "/assets/circleimages/par-sub-nav-4.png"
        }
      ],
      roadmapQuote: "1–2 horas que transformam. Temas que importam. Para seu trabalho. Para sua vida. Sem barreiras. Um minuto para se inscrever. Seu certificado digital espera. Volte quando quiser. No seu ritmo. Sempre.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Coordenador de Projeto",
      participationSteps: [
        {
          date: "SEU INÍCIO",
          title: "Um minuto que muda tudo",
          description: "Custo zero. Barreiras zero. Apenas você e sua decisão. Complete seu perfil. O calendário chega no seu WhatsApp. Assim simples.",
          completed: true
        },
        {
          date: "SEU MOMENTO",
          title: "Confirme. Pronto.",
          description: "Um clique e você está dentro. Ingresso simbólico no café? Avisamos antes. Você sempre decide. Sempre no controle.",
          completed: true
        },
        {
          date: "SEU PODER",
          title: "1–2 horas. Resultados reais.",
          description: "Seu CV. Seu orçamento. Seu portfólio. Seu projeto. Você cria, não apenas ouve. Intergeracional. Próximo. Seu.",
          completed: true
        },
        {
          date: "SEU LEGADO",
          title: "Certificado. Recursos. Possibilidades infinitas.",
          description: "Seu certificado digital espera. Recursos para continuar. Volte quando quiser. Ou ensine o que aprendeu. O círculo é você.",
          completed: false
        }
      ],
      faqs: [
        {
          question: "É realmente grátis?",
          answer: "100% grátis. Sempre. Em cafés pode haver ingresso simbólico opcional. Avisamos antes. Você decide. Sem surpresas."
        },
        {
          question: "O que preciso para começar?",
          answer: "Apenas vontade. Nada mais. Sua idade não importa. Seu nível educacional não importa. Se você quer aprender, já tem tudo que precisa."
        },
        {
          question: "Como me inscrevo?",
          answer: "Um minuto. Formulário curto. Do calendário, pontos comunitários ou WhatsApp. Escolha seu jeito. Comece já."
        },
        {
          question: "Recebo certificado?",
          answer: "Sim. Certificado digital para cada oficina. Para seu currículo. Para seu LinkedIn. Para você. Sua conquista, sua prova."
        },
        {
          question: "E se não puder participar de todas as sessões?",
          answer: "A vida acontece. Entendemos. Horários flexíveis. Material de apoio. Reagende. Retome quando puder. Seu ritmo. Seu caminho."
        }
      ],
      ctaTitle: "Seu momento é agora",
      ctaSubtitle: "Aprenda fazendo. Grátis. Perto de você. 1–2 horas. Resultados reais. Sem requisitos. Apenas você e sua decisão.",
      ctaButton: "COMECE SUA HISTÓRIA",
      needHelpTitle: "Sua transformação começa hoje",
      needHelpSubtitle: "Milhares já crescem com Circle Up. Sua história pode ser a próxima.",
      needHelpCards: [
        {
          iconType: "community",
          title: "Sua comunidade espera",
          description: "Conecte. Aprenda. Cresça. Junto com outros como você."
        },
        {
          iconType: "email",
          title: "Dê o primeiro passo",
          description: "",
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
          steps={content.participationSteps}
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

export default HowToUseParticipant;
