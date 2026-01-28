import { useState, useEffect, useRef } from "react";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NeedHelp from "../components/NeedHelp";
import Roadmap from "../components/Roadmap";
import Services from "../components/Services";
import StorySection from "../components/StorySection";
import Button from "../components/Button";

const Home = ({ setCurrentPage }) => {
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
      // Hero content
      heroSubtitle: "Circle Up Volunteer",
      heroTitle: "Sabes algo que alguien necesita",
      heroTypewriter: [
        "Tu Excel puede cambiar una carrera.",
        "Tu diseño puede abrir puertas.",
        "Tu experiencia vale más de lo que crees.",
        "2 horas tuyas = un futuro diferente.",
        "No enseñas porque sabes todo.<br/>Enseñas porque sabes algo."
      ],
      heroMetadata: {
        location: "Tocancipá, Colombia",
        impact: "Vidas impactadas",
        cost: "Gratis siempre"
      },
      // StorySection content
      storyContent: [
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
      ],
      // Roadmap content
      roadmapSubtitle: "Tu impacto",
      roadmapTitle: "Así de simple. Así de real.",
      roadmapSteps: [
        { id: "01", title: "Tu primer taller", subtitle: "Empieza aquí" },
        { id: "02", title: "Alguien aprende", subtitle: "Tu momento" },
        { id: "03", title: "Cambias vidas", subtitle: "Tu legado" }
      ],
      roadmapCtaTitle: "Tu próximo taller empieza aquí.",
      roadmapCtaSubtitle: "2 horas tuyas. Impacto real.",
      roadmapCtaButton: "Empieza ahora",
      // Benefits content
      benefitsHeading: "Dónde puedes enseñar",
      benefitsCards: [
        {
          id: 0,
          name: "Biblioteca Central",
          role: "Espacio Disponible",
          text: "Mesas amplias, WiFi estable, ambiente tranquilo. Coordinamos el espacio, tú llegas y enseñas. Martes y jueves, 3-5 PM disponibles.",
          image: "./assets/circleimages/home-carrusel-1.png"
        },
        {
          id: 1,
          name: "Café Comunitario",
          role: "Espacio Disponible",
          text: "Ambiente relajado, café incluido para voluntarios. Ideal para talleres de emprendimiento y marketing. Sábados 10 AM, cupo 15 personas.",
          image: "./assets/circleimages/home-carrusel-2.png"
        },
        {
          id: 2,
          name: "Plaza Comunitaria",
          role: "Espacio Disponible",
          text: "Sesiones al aire libre, buena iluminación natural. Perfecto para fotografía, diseño, contenido visual. Domingos por la tarde.",
          image: "./assets/circleimages/home-carrusel-3.png"
        },
        {
          id: 4,
          name: "Biblioteca Moderna",
          role: "Espacio Disponible",
          text: "Equipos disponibles si los participantes no traen dispositivos. Proyector y pantalla incluidos. Certificado digital para tu portafolio.",
          image: "./assets/circleimages/home-carrusel-5.png"
        }
      ],
      // Services content
      servicesHeading: "Qué necesitas para empezar",
      servicesCards: [
        {
          title: "Mentorías",
          subtitle: "Personalizadas",
          text: "Conocimiento aplicable. No necesitas ser el mejor del mundo en tu campo. Solo necesitas saber lo suficiente para guiar a alguien que está empezando.",
          image: "./assets/circleimages/service-left.png",
          alt: "Mentorías Personalizadas"
        },
        {
          title: "Talleres",
          subtitle: "Interactivos",
          text: "2 horas de tu agenda. Coordinamos espacio, inscripciones y materiales básicos. Tú preparas el contenido práctico y llegas a enseñar. Sin compromisos a largo plazo.",
          image: "./assets/circleimages/service-right.png",
          alt: "Talleres Interactivos"
        }
      ],
      // NeedHelp content
      needHelpTitle: "Tu conocimiento importa",
      needHelpSubtitle: "Empieza con un taller. Sin compromisos.",
      needHelpCards: [
        {
          iconType: "community",
          title: "Quiero aprender",
          description: "Talleres gratuitos cada semana. Inscríbete y llega."
        },
        {
          iconType: "email",
          title: "Quiero enseñar",
          description: "Tienes algo que compartir. Nosotros te ayudamos con el resto.",
          email: "hola@circleup.com.co"
        }
      ]
    },
    en: {
      // Hero content
      heroSubtitle: "Circle Up Volunteer",
      heroTitle: "You know something someone needs",
      heroTypewriter: [
        "Your Excel can change a career.",
        "Your design can open doors.",
        "Your experience is worth more than you think.",
        "2 hours of yours = a different future.",
        "You don't teach because you know everything.<br/>You teach because you know something."
      ],
      heroMetadata: {
        location: "Tocancipá, Colombia",
        impact: "Lives impacted",
        cost: "Always free"
      },
      // StorySection content
      storyContent: [
        {
          id: "01",
          subtitle: "YOUR KNOWLEDGE",
          title: "You already know something valuable",
          content: [
            "You know how to use Excel for budgets. You know how to edit photos in Canva. You know how Instagram works for businesses. You know how to organize personal finances.",
            "That knowledge you use every day, that seems obvious to you, is exactly what someone else needs to learn. You don't need to be a world expert. You just need to know more than someone starting out.",
            "In your city there are people looking to learn what you already master. They can't find accessible courses, can't afford academies, don't have time for 40-hour videos. They need 2 hours with you, real practice, questions answered in the moment."
          ]
        },
        {
          id: "02",
          subtitle: "THE SPACE",
          title: "The places already exist",
          content: [
            "A library with empty tables on Tuesday afternoons. A café with WiFi that needs more weekday customers. A community room only used on weekends.",
            "You don't need to rent a hall. You don't need special equipment. A table, chairs, WiFi connection. Participants bring their devices. You bring the knowledge.",
            "The owners of these spaces want activity, want community, want their places to have purpose. A 2-hour workshop brings life to those empty tables."
          ]
        },
        {
          id: "03",
          subtitle: "THE SESSION",
          title: "2 hours that change perspectives",
          content: [
            "Tuesday 4 PM. 12 people arrive at the library. You teach them how to make a pivot table in Excel. Not abstract theory. Real cases: inventories, payrolls, reports.",
            "30 minutes of explanation. 90 minutes of practice. You walk between tables, answer questions, correct errors, show shortcuts. They practice with their own data.",
            "In the end, each person leaves with a skill applicable tomorrow at work. You leave knowing your knowledge served something concrete. It's not charity, it's real value exchange."
          ]
        },
        {
          id: "04",
          subtitle: "THE IMPACT",
          title: "Measurable results, not promises",
          content: [
            "Tocancipá, 6 months: 23 volunteers taught 47 workshops. 127 people learned practical skills. 89% applied them at work in less than 2 weeks.",
            "Cost: $0 for everyone. Infrastructure: existing spaces. Attendance rate: 78%. Completion rate: 71%. Compared to online courses: 15% attendance, 8% completion.",
            "41% of participants returned to learn another topic. 23% became volunteers after attending 3 workshops. The cycle feeds itself: you learn, then you teach."
          ]
        },
        {
          id: "05",
          subtitle: "YOUR DECISION",
          title: "Start with one workshop",
          content: [
            "You don't need to prepare a 40-hour course. You don't need teaching certifications. You don't need prior teaching experience. You just need 2 hours and willingness to share.",
            "We help you with logistics: we find the space, manage registrations, send reminders, prepare basic materials. You just show up and teach.",
            "After your first workshop, you decide if you continue. No commitments, no obligations. If it worked and you want to repeat, we coordinate the next one. If not, that's okay. One workshop already made a difference.",
            "The knowledge you have can change someone's career trajectory. Can help someone get a better job, negotiate a raise, start a business. 2 hours of yours, measurable impact on real lives."
          ]
        }
      ],
      // Roadmap content
      roadmapSubtitle: "Your impact",
      roadmapTitle: "This simple. This real.",
      roadmapSteps: [
        { id: "01", title: "Your first workshop", subtitle: "Start here" },
        { id: "02", title: "Someone learns", subtitle: "Your moment" },
        { id: "03", title: "You change lives", subtitle: "Your legacy" }
      ],
      roadmapCtaTitle: "Your next workshop starts here.",
      roadmapCtaSubtitle: "2 hours of yours. Real impact.",
      roadmapCtaButton: "Start now",
      // Benefits content
      benefitsHeading: "Where you can teach",
      benefitsCards: [
        {
          id: 0,
          name: "Central Library",
          role: "Available Space",
          text: "Spacious tables, stable WiFi, quiet environment. We coordinate the space, you show up and teach. Tuesdays and Thursdays, 3-5 PM available.",
          image: "./assets/circleimages/home-carrusel-1.png"
        },
        {
          id: 1,
          name: "Community Café",
          role: "Available Space",
          text: "Relaxed atmosphere, coffee included for volunteers. Ideal for entrepreneurship and marketing workshops. Saturdays 10 AM, capacity 15 people.",
          image: "./assets/circleimages/home-carrusel-2.png"
        },
        {
          id: 2,
          name: "Community Plaza",
          role: "Available Space",
          text: "Outdoor sessions, good natural lighting. Perfect for photography, design, visual content. Sunday afternoons.",
          image: "./assets/circleimages/home-carrusel-3.png"
        },
        {
          id: 4,
          name: "Modern Library",
          role: "Available Space",
          text: "Equipment available if participants don't bring devices. Projector and screen included. Digital certificate for your portfolio.",
          image: "./assets/circleimages/home-carrusel-5.png"
        }
      ],
      // Services content
      servicesHeading: "What you need to start",
      servicesCards: [
        {
          title: "Mentorships",
          subtitle: "Personalized",
          text: "Applicable knowledge. You don't need to be the best in the world in your field. You just need to know enough to guide someone starting out.",
          image: "./assets/circleimages/service-left.png",
          alt: "Personalized Mentorships"
        },
        {
          title: "Workshops",
          subtitle: "Interactive",
          text: "2 hours of your time. We coordinate space, registrations, and basic materials. You prepare the practical content and show up to teach. No long-term commitments.",
          image: "./assets/circleimages/service-right.png",
          alt: "Interactive Workshops"
        }
      ],
      // NeedHelp content
      needHelpTitle: "Your knowledge matters",
      needHelpSubtitle: "Start with one workshop. No commitments.",
      needHelpCards: [
        {
          iconType: "community",
          title: "I want to learn",
          description: "Free workshops every week. Register and show up."
        },
        {
          iconType: "email",
          title: "I want to teach",
          description: "You have something to share. We help you with the rest.",
          email: "hola@circleup.com.co"
        }
      ]
    },
    pt: {
      // Hero content
      heroSubtitle: "Circle Up Volunteer",
      heroTitle: "Você sabe algo que alguém precisa",
      heroTypewriter: [
        "Seu Excel pode mudar uma carreira.",
        "Seu design pode abrir portas.",
        "Sua experiência vale mais do que você pensa.",
        "2 horas suas = um futuro diferente.",
        "Você não ensina porque sabe tudo.<br/>Você ensina porque sabe algo."
      ],
      heroMetadata: {
        location: "Tocancipá, Colômbia",
        impact: "Vidas impactadas",
        cost: "Sempre grátis"
      },
      // StorySection content
      storyContent: [
        {
          id: "01",
          subtitle: "SEU CONHECIMENTO",
          title: "Você já sabe algo valioso",
          content: [
            "Você sabe usar Excel para fazer orçamentos. Sabe editar fotos no Canva. Sabe como o Instagram funciona para negócios. Sabe organizar finanças pessoais.",
            "Esse conhecimento que você usa todos os dias, que parece óbvio para você, é exatamente o que outra pessoa precisa aprender. Você não precisa ser um especialista mundial. Só precisa saber mais do que quem está começando.",
            "Na sua cidade há pessoas procurando aprender o que você já domina. Não encontram cursos acessíveis, não podem pagar academias, não têm tempo para vídeos de 40 horas. Precisam de 2 horas com você, prática real, perguntas respondidas no momento."
          ]
        },
        {
          id: "02",
          subtitle: "O ESPAÇO",
          title: "Os lugares já existem",
          content: [
            "Uma biblioteca com mesas vazias nas terças à tarde. Um café com WiFi que precisa de mais clientes durante a semana. Uma sala comunitária usada apenas nos fins de semana.",
            "Você não precisa alugar um salão. Não precisa de equipamentos especiais. Uma mesa, cadeiras, conexão WiFi. Os participantes trazem seus dispositivos. Você traz o conhecimento.",
            "Os donos desses espaços querem atividade, querem comunidade, querem que seus lugares tenham propósito. Uma oficina de 2 horas dá vida a essas mesas vazias."
          ]
        },
        {
          id: "03",
          subtitle: "A SESSÃO",
          title: "2 horas que mudam perspectivas",
          content: [
            "Terça 16h. 12 pessoas chegam à biblioteca. Você ensina como fazer uma tabela dinâmica no Excel. Não teoria abstrata. Casos reais: inventários, folhas de pagamento, relatórios.",
            "30 minutos de explicação. 90 minutos de prática. Você caminha entre as mesas, responde perguntas, corrige erros, mostra atalhos. Eles praticam com seus próprios dados.",
            "No final, cada pessoa sai com uma habilidade aplicável amanhã no trabalho. Você sai sabendo que seu conhecimento serviu para algo concreto. Não é caridade, é troca de valor real."
          ]
        },
        {
          id: "04",
          subtitle: "O IMPACTO",
          title: "Resultados mensuráveis, não promessas",
          content: [
            "Tocancipá, 6 meses: 23 voluntários ensinaram 47 oficinas. 127 pessoas aprenderam habilidades práticas. 89% as aplicaram no trabalho em menos de 2 semanas.",
            "Custo: $0 para todos. Infraestrutura: espaços existentes. Taxa de presença: 78%. Taxa de conclusão: 71%. Comparado com cursos online: 15% presença, 8% conclusão.",
            "41% dos participantes voltaram para aprender outro tema. 23% se tornaram voluntários após participar de 3 oficinas. O ciclo se autoalimenta: você aprende, depois ensina."
          ]
        },
        {
          id: "05",
          subtitle: "SUA DECISÃO",
          title: "Comece com uma oficina",
          content: [
            "Você não precisa preparar um curso de 40 horas. Não precisa de certificações de ensino. Não precisa de experiência prévia ensinando. Só precisa de 2 horas e vontade de compartilhar.",
            "Nós ajudamos com a logística: encontramos o espaço, gerenciamos inscrições, enviamos lembretes, preparamos materiais básicos. Você só aparece e ensina.",
            "Depois da sua primeira oficina, você decide se continua. Sem compromissos, sem obrigações. Se funcionou e você quer repetir, coordenamos a próxima. Se não, tudo bem. Uma oficina já fez diferença.",
            "O conhecimento que você tem pode mudar a trajetória profissional de alguém. Pode ajudar alguém a conseguir um emprego melhor, negociar um aumento, começar um negócio. 2 horas suas, impacto mensurável em vidas reais."
          ]
        }
      ],
      // Roadmap content
      roadmapSubtitle: "Seu impacto",
      roadmapTitle: "Assim simples. Assim real.",
      roadmapSteps: [
        { id: "01", title: "Sua primeira oficina", subtitle: "Comece aqui" },
        { id: "02", title: "Alguém aprende", subtitle: "Seu momento" },
        { id: "03", title: "Você muda vidas", subtitle: "Seu legado" }
      ],
      roadmapCtaTitle: "Sua próxima oficina começa aqui.",
      roadmapCtaSubtitle: "2 horas suas. Impacto real.",
      roadmapCtaButton: "Comece agora",
      // Benefits content
      benefitsHeading: "Onde você pode ensinar",
      benefitsCards: [
        {
          id: 0,
          name: "Biblioteca Central",
          role: "Espaço Disponível",
          text: "Mesas amplas, WiFi estável, ambiente tranquilo. Coordenamos o espaço, você aparece e ensina. Terças e quintas, 15h-17h disponíveis.",
          image: "./assets/circleimages/home-carrusel-1.png"
        },
        {
          id: 1,
          name: "Café Comunitário",
          role: "Espaço Disponível",
          text: "Ambiente relaxado, café incluído para voluntários. Ideal para oficinas de empreendedorismo e marketing. Sábados 10h, capacidade 15 pessoas.",
          image: "./assets/circleimages/home-carrusel-2.png"
        },
        {
          id: 2,
          name: "Praça Comunitária",
          role: "Espaço Disponível",
          text: "Sessões ao ar livre, boa iluminação natural. Perfeito para fotografia, design, conteúdo visual. Domingos à tarde.",
          image: "./assets/circleimages/home-carrusel-3.png"
        },
        {
          id: 4,
          name: "Biblioteca Moderna",
          role: "Espaço Disponível",
          text: "Equipamentos disponíveis se os participantes não trouxerem dispositivos. Projetor e tela incluídos. Certificado digital para seu portfólio.",
          image: "./assets/circleimages/home-carrusel-5.png"
        }
      ],
      // Services content
      servicesHeading: "O que você precisa para começar",
      servicesCards: [
        {
          title: "Mentorias",
          subtitle: "Personalizadas",
          text: "Conhecimento aplicável. Você não precisa ser o melhor do mundo em seu campo. Só precisa saber o suficiente para guiar alguém que está começando.",
          image: "./assets/circleimages/service-left.png",
          alt: "Mentorias Personalizadas"
        },
        {
          title: "Oficinas",
          subtitle: "Interativas",
          text: "2 horas do seu tempo. Coordenamos espaço, inscrições e materiais básicos. Você prepara o conteúdo prático e aparece para ensinar. Sem compromissos de longo prazo.",
          image: "./assets/circleimages/service-right.png",
          alt: "Oficinas Interativas"
        }
      ],
      // NeedHelp content
      needHelpTitle: "Seu conhecimento importa",
      needHelpSubtitle: "Comece com uma oficina. Sem compromissos.",
      needHelpCards: [
        {
          iconType: "community",
          title: "Quero aprender",
          description: "Oficinas gratuitas toda semana. Inscreva-se e apareça."
        },
        {
          iconType: "email",
          title: "Quero ensinar",
          description: "Você tem algo para compartilhar. Nós ajudamos com o resto.",
          email: "hola@circleup.com.co"
        }
      ]
    }
  };

  const content = contentByLanguage[pageLanguage];

  return (
    <>
      <div className={`pt-[4.75rem] lg:pt-[5.25rem] ${
        fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
      }`}>
        <Header setCurrentPage={setCurrentPage} />
        
        {/* Accessibility Button */}
        <div 
          className="fixed top-24 left-4 sm:left-6 md:left-8 lg:left-12 z-40 transition-all duration-500"
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
        
        <Hero 
          fontSize={fontSize}
          subtitle={content.heroSubtitle}
          title={content.heroTitle}
          typewriterStrings={content.heroTypewriter}
          metadata={content.heroMetadata}
        />
        <Benefits 
          fontSize={fontSize}
          heading={content.benefitsHeading}
          benefitsCards={content.benefitsCards}
        />
        <Services 
          fontSize={fontSize}
          heading={content.servicesHeading}
          servicesCards={content.servicesCards}
        />
        <StorySection 
          fontSize={fontSize}
          storyContent={content.storyContent}
        />
        <Roadmap 
          setCurrentPage={setCurrentPage}
          subtitle={content.roadmapSubtitle}
          title={content.roadmapTitle}
          steps={content.roadmapSteps}
          ctaTitle={content.roadmapCtaTitle}
          ctaSubtitle={content.roadmapCtaSubtitle}
          ctaButton={content.roadmapCtaButton}
        />
        <div className="w-full bg-n-8 border-t border-n-6">
          <NeedHelp 
            title={content.needHelpTitle}
            subtitle={content.needHelpSubtitle}
            cards={content.needHelpCards}
          />
        </div>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Home;
