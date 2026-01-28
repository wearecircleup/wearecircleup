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
      howItWorksTitle: "TU CAMINO COMO VOLUNTARIO",
      steps: [
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
      ],
      roadmapQuote: "1–2 horas prácticas. Plantillas listas. Acompañamiento real. Tú pones el conocimiento. Nosotros la logística. La comunidad llega. Desde 2 horas al mes. Sin experiencia previa. Solo ganas de compartir.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Coordinador Voluntarios",
      volunteerJourney: [
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
      ],
      faqs: [
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
      ],
      ctaTitle: "Tu conocimiento puede cambiar vidas",
      ctaSubtitle: "1–2 horas. Tu experiencia. Nuestra logística. Su transformación. Desde 2 horas al mes. Empieza cuando estés listo.",
      ctaButton: "COMPARTE TU SABER",
      needHelpTitle: "Tu camino como voluntario empieza hoy",
      needHelpSubtitle: "Acompañamiento. Plantillas. Comunidad. Todo lo que necesitas para brillar.",
      needHelpCards: [
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
      ]
    },
    en: {
      howItWorksTitle: "YOUR VOLUNTEER JOURNEY",
      steps: [
        {
          id: 0,
          title: "What you know matters",
          description: "Tell us your expertise. Who you want to support. From 2 hours a month. You don't need to be a teacher. Just have something to give.",
          image: "/assets/circleimages/vol-sub-nav-1.png"
        },
        {
          id: 1,
          title: "90 minutes. Ready.",
          description: "Clear methodology. Useful templates. Real tips. You leave prepared. Your first session awaits.",
          image: "/assets/circleimages/vol-sub-nav-2.png"
        },
        {
          id: 2,
          title: "Your first workshop",
          description: "1–2 hours. With support. You bring the knowledge. We handle logistics. The community arrives. You shine.",
          image: "/assets/circleimages/vol-sub-nav-3.png"
        },
        {
          id: 3,
          title: "Grow with each session",
          description: "Real feedback. New topics. Mentor others if you want. Your impact multiplies. The circle grows.",
          image: "/assets/circleimages/vol-sub-nav-4.png"
        }
      ],
      roadmapQuote: "1–2 practical hours. Ready templates. Real support. You bring the knowledge. We handle logistics. The community arrives. From 2 hours a month. No prior experience. Just willingness to share.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Volunteer Coordinator",
      volunteerJourney: [
        {
          date: "YOUR PROFILE",
          title: "Share who you are",
          description: "Your skills. Your experience. Your availability. Define what you know. Decide what you want to give. That simple.",
          completed: true
        },
        {
          date: "YOUR ONBOARDING",
          title: "90 minutes that change everything",
          description: "Community methodology. Digital tools. Facilitation techniques. You leave ready. Your first session awaits.",
          completed: true
        },
        {
          date: "YOUR DEBUT",
          title: "First workshop. With support.",
          description: "Experienced coordinator by your side. Real feedback. Improve your technique. Discover your style. The facilitator within you is born.",
          completed: true
        },
        {
          date: "YOUR LEGACY",
          title: "Fly solo. Grow free.",
          description: "Independent workshops. Mentor others. Contribute to the ecosystem. Your knowledge multiplies. Impact has no limits.",
          completed: false
        }
      ],
      faqs: [
        {
          question: "What do I need to start?",
          answer: "Experience in what you want to teach. 2 hours a month. Willingness to share. You don't need to be an instructor. We train you. We support you. Just bring your knowledge."
        },
        {
          question: "How do you prepare me?",
          answer: "90-minute onboarding. Clear methodology. Practical tools. Facilitation techniques. Your first workshop with coordinator by your side. You learn by doing."
        },
        {
          question: "What do I receive as a volunteer?",
          answer: "Training. Templates. Materials. Platform. Support. Constant feedback. Digital certificate. Everything you need to shine."
        },
        {
          question: "Can I choose when and where?",
          answer: "Yes. Your schedule. Your location. In-person at libraries. Virtual from home. You decide. We adapt. Your comfort is our priority."
        },
        {
          question: "How do I know I'm making an impact?",
          answer: "Simple dashboard. 3 signals: attendance, applied practice, feedback. Digital certificate. Concrete recommendations. You see your impact. You feel it. You measure it."
        }
      ],
      ctaTitle: "Your knowledge can change lives",
      ctaSubtitle: "1–2 hours. Your experience. Our logistics. Their transformation. From 2 hours a month. Start when you're ready.",
      ctaButton: "SHARE YOUR KNOWLEDGE",
      needHelpTitle: "Your volunteer journey starts today",
      needHelpSubtitle: "Support. Templates. Community. Everything you need to shine.",
      needHelpCards: [
        {
          iconType: "community",
          title: "Your community awaits",
          description: "Inspiring volunteers. Supporting coordinators. Together we grow."
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
      howItWorksTitle: "SUA JORNADA COMO VOLUNTÁRIO",
      steps: [
        {
          id: 0,
          title: "O que você sabe importa",
          description: "Conte-nos seu conhecimento. Quem você quer apoiar. A partir de 2 horas por mês. Você não precisa ser professor. Apenas ter algo para dar.",
          image: "/assets/circleimages/vol-sub-nav-1.png"
        },
        {
          id: 1,
          title: "90 minutos. Pronto.",
          description: "Metodologia clara. Modelos úteis. Dicas reais. Você sai preparado. Sua primeira sessão espera.",
          image: "/assets/circleimages/vol-sub-nav-2.png"
        },
        {
          id: 2,
          title: "Sua primeira oficina",
          description: "1–2 horas. Com apoio. Você traz o conhecimento. Nós cuidamos da logística. A comunidade chega. Você brilha.",
          image: "/assets/circleimages/vol-sub-nav-3.png"
        },
        {
          id: 3,
          title: "Cresça a cada sessão",
          description: "Feedback real. Novos temas. Mentore outros se quiser. Seu impacto se multiplica. O círculo cresce.",
          image: "/assets/circleimages/vol-sub-nav-4.png"
        }
      ],
      roadmapQuote: "1–2 horas práticas. Modelos prontos. Apoio real. Você traz o conhecimento. Nós cuidamos da logística. A comunidade chega. A partir de 2 horas por mês. Sem experiência prévia. Apenas vontade de compartilhar.",
      roadmapAuthorTitle: "Circle Up Volunteer",
      roadmapAuthorRole: "Coordenador de Voluntários",
      volunteerJourney: [
        {
          date: "SEU PERFIL",
          title: "Compartilhe quem você é",
          description: "Suas habilidades. Sua experiência. Sua disponibilidade. Defina o que você sabe. Decida o que quer dar. Assim simples.",
          completed: true
        },
        {
          date: "SEU ONBOARDING",
          title: "90 minutos que mudam tudo",
          description: "Metodologia comunitária. Ferramentas digitais. Técnicas de facilitação. Você sai pronto. Sua primeira sessão espera.",
          completed: true
        },
        {
          date: "SEU DEBUT",
          title: "Primeira oficina. Com apoio.",
          description: "Coordenador experiente ao seu lado. Feedback real. Melhore sua técnica. Descubra seu estilo. Nasce o facilitador dentro de você.",
          completed: true
        },
        {
          date: "SEU LEGADO",
          title: "Voe solo. Cresça livre.",
          description: "Oficinas independentes. Mentore outros. Contribua para o ecossistema. Seu conhecimento se multiplica. O impacto não tem limites.",
          completed: false
        }
      ],
      faqs: [
        {
          question: "O que preciso para começar?",
          answer: "Experiência no que você quer ensinar. 2 horas por mês. Vontade de compartilhar. Você não precisa ser instrutor. Nós te capacitamos. Te apoiamos. Apenas traga seu conhecimento."
        },
        {
          question: "Como vocês me preparam?",
          answer: "90 minutos de onboarding. Metodologia clara. Ferramentas práticas. Técnicas de facilitação. Sua primeira oficina com coordenador ao seu lado. Você aprende fazendo."
        },
        {
          question: "O que recebo como voluntário?",
          answer: "Capacitação. Modelos. Materiais. Plataforma. Acompanhamento. Feedback constante. Certificado digital. Tudo que você precisa para brilhar."
        },
        {
          question: "Posso escolher quando e onde?",
          answer: "Sim. Seu horário. Sua localização. Presencial em bibliotecas. Virtual de casa. Você decide. Nos adaptamos. Seu conforto é nossa prioridade."
        },
        {
          question: "Como sei que estou gerando impacto?",
          answer: "Painel simples. 3 sinais: presença, prática aplicada, feedback. Certificado digital. Recomendações concretas. Você vê seu impacto. Sente. Mede."
        }
      ],
      ctaTitle: "Seu conhecimento pode mudar vidas",
      ctaSubtitle: "1–2 horas. Sua experiência. Nossa logística. Transformação deles. A partir de 2 horas por mês. Comece quando estiver pronto.",
      ctaButton: "COMPARTILHE SEU CONHECIMENTO",
      needHelpTitle: "Sua jornada como voluntário começa hoje",
      needHelpSubtitle: "Acompanhamento. Modelos. Comunidade. Tudo que você precisa para brilhar.",
      needHelpCards: [
        {
          iconType: "community",
          title: "Sua comunidade espera",
          description: "Voluntários que inspiram. Coordenadores que apoiam. Juntos crescemos."
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
          steps={content.volunteerJourney}
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

export default HowToUseVolunteer;
