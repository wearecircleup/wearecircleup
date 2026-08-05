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
        "Una hora, un espacio público, una conversación.",
        "Nadie enseña aquí porque sea profesor.<br/>Enseña porque quiere compartir.",
        "Aprender hoy, enseñar mañana. Sin orden fijo."
      ],
      heroMetadata: {
        location: "Colombia",
        impact: "Vidas impactadas",

      },
      // StorySection content
      storyContent: [
        {
          id: "01",
          subtitle: "TU CONOCIMIENTO",
          title: "Ya sabes algo valioso",
          content: [
            "Tienes conocimiento que no viene de un manual: viene de haberlo hecho, de haber tropezado con lo que no funciona hasta encontrar lo que sí. Eso tiene valor real, aunque a ti te parezca del diario.",
            "No hace falta un título de docente para compartirlo. Lo que sí hace falta es que sea conocimiento real: formación, o años de experiencia genuina en lo que sabes.",
            "Nadie llega buscando plata: llega buscando aprender, o simplemente a aprovechar bien una hora libre. El gusto está en la conversación misma. Aquí nadie mira mal a quien solo escucha, ni a quien hace muchas preguntas, ni a quien no dice nada en toda la hora. Y si el tema no te atrapa, también es válido decidir ir a otro espacio la próxima semana; nadie pierde por eso. A veces basta con escuchar, y escuchar también puede cambiar la forma en que pensamos algo."
          ]
        },
        {
          id: "02",
          subtitle: "EL ESPACIO",
          title: "Los lugares ya existen",
          content: [
            "Una biblioteca un martes por la tarde. Un café entre semana. Una sala comunal fuera del fin de semana. Ese tipo de lugar ya existe, ya lo conoces, y probablemente ya pasas por ahí.",
            "No hace falta rentar un salón ni comprar equipos: una mesa, sillas, y lo que ya sabes hacer son suficientes. No hay infraestructura especial que montar ni inversión previa que hacer.",
            "Quienes cuidan y coordinan estos espacios suelen querer lo mismo que tú: más actividad, más comunidad, un propósito claro para esas horas donde el lugar tiene menos movimiento. Una hora de Evento le cambia la energía a esas mesas."
          ]
        },
        {
          id: "03",
          subtitle: "EL EVENTO",
          title: "Una hora que cambia perspectivas",
          content: [
            "Un grupo pequeño llega a la biblioteca, al café, al salón comunal. Alguien de la comunidad comparte algo que domina de verdad, aprendido a punta de ensayo y error, no de un manual. No hay diapositivas genéricas ni teoría abstracta: hay preguntas reales, hechas por gente que necesita la respuesta esta semana.",
            "Una hora completa, dedicada a la conversación real: quien comparte el tema responde preguntas, ajusta la dirección si el grupo lo necesita, conecta lo que dice con la situación concreta de cada persona presente.",
            "Al final, cada persona se va pensando distinto sobre algo que le importa. Quien compartió se va sabiendo que su experiencia le sirvió a alguien más, hoy, de verdad. No es caridad: es un intercambio entre personas que se necesitan mutuamente."
          ]
        },
        {
          id: "04",
          subtitle: "EL CICLO",
          title: "Aprender y enseñar se retroalimentan",
          content: [
            "Circle Up Community está apenas en una fase temprana de validación, así que preferimos no inventar cifras de impacto que todavía no tenemos. Lo que sí sabemos, porque está documentado en comunidades muy distintas alrededor del mundo, es que este formato tiene una particularidad: quien aprende hoy suele volver, más adelante, a compartir algo propio.",
            "Es un patrón que se repite una y otra vez, en culturas diferentes, cuando el aprendizaje ocurre en grupos pequeños, sin costo, cerca de casa: no se agota en una sola persona enseñándole a muchas, se convierte en un ciclo donde los roles rotan con el tiempo.",
            "Eso es lo que buscamos medir de forma honesta a medida que crezcamos: cuánta gente vuelve, cuánta gente aplica lo aprendido, y cuánta gente termina, ella misma, del otro lado de la mesa."
          ]
        },
        {
          id: "05",
          subtitle: "TU DECISIÓN",
          title: "Empieza con un Evento",
          content: [
            "No necesitas preparar un curso de 40 horas ni tener experiencia previa dictando clases. Necesitas una hora, algo que sepas hacer de verdad, y la disposición de compartirlo con honestidad.",
            "Nosotros ayudamos con la logística: coordinamos el espacio, gestionamos las inscripciones, enviamos recordatorios y te damos materiales básicos de apoyo. Tú llegas y compartes lo que sabes.",
            "Después de tu primer Evento, decides si continúas. Sin compromisos ni obligaciones. Si funcionó y quieres repetir, coordinamos el siguiente; si no, está bien igual. Un solo Evento ya hizo una diferencia real para quienes llegaron.",
            "El conocimiento que ya tienes, el que a ti te parece del diario, puede ser justo lo que le falta a alguien más para dar su próximo paso. Una hora tuya, compartida con honestidad, es un buen punto de partida."
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
      roadmapCtaTitle: "Tu próximo evento empieza aquí.",
      roadmapCtaSubtitle: "Una hora tuya. Así de simple.",
      roadmapCtaButton: "Empieza ahora",
      // Benefits content
      benefitsHeading: "Dónde puedes enseñar",
      benefitsCards: [
        {
          id: 0,
          name: "Biblioteca Central",
          role: "Espacio Disponible",
          text: "Mesas amplias, WiFi estable, ambiente tranquilo. Coordinamos el espacio, tú llegas y enseñas.",
          image: "./assets/circleimages/home-carrusel-1.png"
        },
        {
          id: 1,
          name: "Café Comunitario",
          role: "Espacio Disponible",
          text: "Ambiente relajado, café incluido para voluntarios. Ideal para talleres los sábados 10 AM, cupo 8 personas.",
          image: "./assets/circleimages/home-carrusel-2.png"
        },
        {
          id: 2,
          name: "Plaza Comunitaria",
          role: "Espacio Disponible",
          text: "Sesiones al aire libre, buena iluminación natural. Perfecto para fotografía, diseño, contenido visual.",
          image: "./assets/circleimages/home-carrusel-3.png"
        },
        {
          id: 4,
          name: "Biblioteca Moderna",
          role: "Espacio Disponible",
          text: "Equipos disponibles si los participantes no traen dispositivos. Proyector y pantalla incluidos.",
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
          text: "Coordinamos espacio, inscripciones y materiales básicos. Tú preparas el contenido práctico y llegas a enseñar. Sin compromisos a largo plazo.",
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
          email: "hola@Circle Up Community.com.co"
        }
      ]
    },
    en: {
      // Hero content
      heroSubtitle: "Circle Up Volunteer",
      heroTitle: "You know something someone needs",
      heroTypewriter: [
        "One hour, a public space, a conversation.",
        "No one teaches here because they are a teacher.<br/>They teach because they want to share.",
        "Learn today, teach tomorrow. No fixed order."
      ],
      heroMetadata: {
        location: "Colombia",
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
            "You have knowledge that did not come from a manual. It came from doing the work, from running into what does not work until you found what does. That has real value, even if it feels ordinary to you.",
            "You do not need a teaching credential to share it. What you do need is real knowledge: training, or years of genuine experience in what you know.",
            "No one shows up looking for money. They show up to learn, or simply to make good use of a free hour. The value is in the conversation itself. No one is judged for only listening, for asking many questions, or for saying nothing at all during the hour. And if the topic does not connect with you, it is also fine to choose a different space next week. No one loses because of that. Sometimes listening is enough, and listening can also change how we think about something."
          ]
        },
        {
          id: "02",
          subtitle: "THE SPACE",
          title: "The places already exist",
          content: [
            "A library on a Tuesday afternoon. A cafe during the week. A community room outside the weekend. That kind of place already exists, you already know it, and you probably pass by it all the time.",
            "There is no need to rent a hall or buy equipment. A table, some chairs, and what you already know are enough. There is no special infrastructure to build and no upfront investment to make.",
            "The people who care for and coordinate these spaces usually want the same thing you do: more activity, more community, and a clear purpose for the quieter hours. One Event can change the energy around those tables."
          ]
        },
        {
          id: "03",
          subtitle: "THE EVENT",
          title: "One hour that changes perspectives",
          content: [
            "A small group arrives at the library, the cafe, or the community room. Someone from the community shares something they truly know, learned through trial and error, not from a manual. There are no generic slides and no abstract theory. There are real questions from people who need the answer this week.",
            "A full hour is dedicated to real conversation. The person leading the topic answers questions, adjusts direction if the group needs it, and connects what they are saying with each person's concrete situation.",
            "At the end, each person leaves thinking differently about something that matters to them. The person who shared leaves knowing their experience helped someone else today, for real. It is not charity. It is an exchange between people who genuinely need each other."
          ]
        },
        {
          id: "04",
          subtitle: "THE CYCLE",
          title: "Learning and teaching reinforce each other",
          content: [
            "CircleUp is still in an early validation stage, so we prefer not to invent impact numbers we do not have yet. What we do know, because it has been documented across very different communities around the world, is that this format has a particular pattern: the person who learns today often comes back later to share something of their own.",
            "It is a pattern that appears again and again, across cultures, when learning happens in small groups, free of charge, and close to home. It does not end with one person teaching many others. Over time it becomes a cycle where roles rotate.",
            "That is what we want to measure honestly as we grow: how many people return, how many people apply what they learned, and how many people eventually find themselves on the other side of the table."
          ]
        },
        {
          id: "05",
          subtitle: "YOUR DECISION",
          title: "Start with one Event",
          content: [
            "You do not need to prepare a 40-hour course or have previous teaching experience. You need one hour, something you genuinely know how to do, and the willingness to share it honestly.",
            "We help with logistics: we coordinate the space, manage registrations, send reminders, and provide basic support materials. You show up and share what you know.",
            "After your first Event, you decide whether to continue. No commitments and no obligations. If it worked and you want to do it again, we coordinate the next one. If not, that is fine too. One Event already made a real difference for the people who came.",
            "The knowledge you already have, the kind that feels ordinary to you, may be exactly what someone else needs for their next step. One hour from you, shared honestly, is a strong place to begin."
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
      roadmapCtaTitle: "Your next Event starts here.",
      roadmapCtaSubtitle: "One hour from you. That simple.",
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
          text: "We coordinate the space, registrations, and basic materials. You prepare the practical content and show up to teach. No long-term commitments.",
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
          email: "hola@Circle Up Community.com.co"
        }
      ]
    },
    pt: {
      // Hero content
      heroSubtitle: "Circle Up Volunteer",
      heroTitle: "Você sabe algo que alguém precisa",
      heroTypewriter: [
        "Uma hora, um espaço público, uma conversa.",
        "Ninguém ensina aqui por ser professor.<br/>Ensina porque quer compartilhar.",
        "Aprender hoje, ensinar amanhã. Sem ordem fixa."
      ],
      heroMetadata: {
        location: "Colômbia",
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
            "Você tem um conhecimento que não veio de um manual. Veio de fazer, de tropeçar no que não funciona até encontrar o que funciona. Isso tem valor real, mesmo que para você pareça algo do dia a dia.",
            "Você não precisa de um título de professor para compartilhar isso. O que precisa é de conhecimento real: formação, ou anos de experiência genuína no que você sabe.",
            "Ninguém chega procurando dinheiro. As pessoas chegam para aprender, ou simplesmente para aproveitar bem uma hora livre. O valor está na conversa em si. Aqui ninguém olha torto para quem só escuta, para quem faz muitas perguntas, ou para quem passa a hora inteira em silêncio. E, se o tema não te prende, também é totalmente válido escolher outro espaço na semana seguinte. Ninguém perde por isso. Às vezes basta escutar, e escutar também pode mudar a forma como pensamos sobre algo."
          ]
        },
        {
          id: "02",
          subtitle: "O ESPAÇO",
          title: "Os lugares já existem",
          content: [
            "Uma biblioteca numa tarde de terça-feira. Um café durante a semana. Uma sala comunitária fora do fim de semana. Esse tipo de lugar já existe, você já conhece, e provavelmente passa por ali com frequência.",
            "Não é preciso alugar um salão nem comprar equipamentos. Uma mesa, algumas cadeiras e o que você já sabe fazer bastam. Não existe uma infraestrutura especial para montar, nem um investimento inicial para fazer.",
            "Quem cuida e coordena esses espaços geralmente quer a mesma coisa que você: mais atividade, mais comunidade e um propósito claro para as horas de menor movimento. Um Evento pode mudar a energia dessas mesas."
          ]
        },
        {
          id: "03",
          subtitle: "O EVENTO",
          title: "Uma hora que muda perspectivas",
          content: [
            "Um grupo pequeno chega à biblioteca, ao café ou à sala comunitária. Alguém da comunidade compartilha algo que realmente domina, aprendido na base da tentativa e erro, não em um manual. Não há slides genéricos nem teoria abstrata. Há perguntas reais, feitas por pessoas que precisam dessa resposta ainda esta semana.",
            "Uma hora inteira é dedicada à conversa real. Quem compartilha o tema responde perguntas, ajusta a direção se o grupo precisar e conecta o que está dizendo com a situação concreta de cada pessoa presente.",
            "No final, cada pessoa vai embora pensando diferente sobre algo que lhe importa. Quem compartilhou vai embora sabendo que sua experiência ajudou alguém naquele mesmo dia, de verdade. Não é caridade. É uma troca entre pessoas que realmente precisam umas das outras."
          ]
        },
        {
          id: "04",
          subtitle: "O CICLO",
          title: "Aprender e ensinar se reforçam mutuamente",
          content: [
            "A CircleUp ainda está em uma fase inicial de validação, então preferimos não inventar números de impacto que ainda não temos. O que sabemos, porque isso já foi documentado em comunidades muito diferentes ao redor do mundo, é que esse formato tem uma característica particular: quem aprende hoje costuma voltar, mais adiante, para compartilhar algo próprio.",
            "É um padrão que se repete muitas vezes, em culturas diferentes, quando a aprendizagem acontece em grupos pequenos, sem custo e perto de casa. Não se resume a uma pessoa ensinando muitas. Com o tempo, vira um ciclo em que os papéis se alternam.",
            "É isso que queremos medir com honestidade à medida que crescermos: quantas pessoas voltam, quantas aplicam o que aprenderam e quantas acabam, elas mesmas, do outro lado da mesa."
          ]
        },
        {
          id: "05",
          subtitle: "SUA DECISÃO",
          title: "Comece com um Evento",
          content: [
            "Você não precisa preparar um curso de 40 horas nem ter experiência prévia dando aula. Precisa de uma hora, de algo que você realmente saiba fazer e da disposição de compartilhar isso com honestidade.",
            "Nós ajudamos com a logística: coordenamos o espaço, gerenciamos as inscrições, enviamos lembretes e oferecemos materiais básicos de apoio. Você chega e compartilha o que sabe.",
            "Depois do seu primeiro Evento, você decide se quer continuar. Sem compromissos e sem obrigações. Se funcionar e você quiser repetir, coordenamos o próximo. Se não, tudo bem também. Um único Evento já fez uma diferença real para quem apareceu.",
            "O conhecimento que você já tem, aquele que para você parece corriqueiro, pode ser exatamente o que falta para alguém dar o próximo passo. Uma hora sua, compartilhada com honestidade, já é um excelente começo."
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
      roadmapCtaTitle: "Seu próximo Evento começa aqui.",
      roadmapCtaSubtitle: "Uma hora sua. Simples assim.",
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
          text: "Coordenamos espaço, inscrições e materiais básicos. Você prepara o conteúdo prático e aparece para ensinar. Sem compromissos de longo prazo.",
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
          email: "hola@Circle Up Community.com.co"
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
          ctaPage="events"
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
