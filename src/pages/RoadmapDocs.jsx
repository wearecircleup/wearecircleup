import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import NeedHelp from "../components/NeedHelp";
import Button from "../components/Button";
import HeroParticleLogo from "../components/HeroParticleLogo";

const RoadmapDocs = ({ setCurrentPage }) => {
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [fontFamily, setFontFamily] = useState('sans');
  const [fontSize, setFontSize] = useState('normal');
  const [menuLanguage, setMenuLanguage] = useState('es');
  const [pageLanguage, setPageLanguage] = useState('es'); // Language for page content
  const [activeSection, setActiveSection] = useState(0);
  const [showAccessibilityButton, setShowAccessibilityButton] = useState(false);
  const sectionRefs = useRef([]);
  const menuRef = useRef(null);

  // Close accessibility menu when clicking outside
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

  const articleMetaContent = {
    es: {
      readTime: "12 min lectura",
      lastUpdated: "Enero 2026",
      location: "Tocancipá, Cundinamarca",
      heroLabel: "Documentación",
      heroTitle: "Guía de CircleUp",
      nextChapter: "Siguiente capítulo",
      progress: "% completado"
    },
    en: {
      readTime: "12 min read",
      lastUpdated: "January 2026",
      location: "Tocancipá, Cundinamarca",
      heroLabel: "Documentation",
      heroTitle: "CircleUp Guide",
      nextChapter: "Next chapter",
      progress: "% complete"
    },
    pt: {
      readTime: "12 min leitura",
      lastUpdated: "Janeiro 2026",
      location: "Tocancipá, Cundinamarca",
      heroLabel: "Documentação",
      heroTitle: "Guia CircleUp",
      nextChapter: "Próximo capítulo",
      progress: "% completo"
    }
  };

  const articleMeta = articleMetaContent[pageLanguage];

  const contentByLanguage = {
    es: [
    {
      id: "primeros-pasos",
      title: "Primeros pasos",
      subtitle: "Tu conocimiento, tu comunidad",
      content: [
        "Tu conocimiento, tu comunidad, tu momento. Esto es CircleUp en Tocancipá, Cundinamarca. Bibliotecas, cafés, colegios donde personas comparten lo que saben. Sin costo, sin barreras. Sabes cocinar, enseña. Quieres programar, aprende. Dominas finanzas, comparte. Aquí todos tienen algo que dar y algo que recibir.",
        "Cuando compartes conocimiento, la comunidad se transforma. Los jóvenes encuentran oportunidades que no sabían que existían. Los adultos redescubren su valor. Los espacios locales se vuelven epicentros de posibilidades.",
        "Quieres aprender. Encuentra tu taller, inscríbete y aparece. 1-2 horas que pueden cambiarlo todo. Sales con certificado y tu próximo paso claro. Quieres enseñar. Cuéntanos qué sabes y te damos las herramientas. No necesitas ser experto, solo auténtico. Nosotros manejamos la logística. Tienes un espacio. Tu biblioteca, café o salón comunal donde 15-20 personas puedan reunirse. Tú prestas el lugar, nosotros coordinamos todo.",
        "Bibliotecas, cafés, colegios, centros comunitarios, empresas. Lugares que se convierten en epicentros de cambio. Prestan el espacio físico y reciben comunidad activa, visibilidad e impacto real. Profesionales, estudiantes, emprendedores, jubilados. Cualquiera con conocimiento práctico y ganas de compartir. No necesitas título, solo saber hacer algo útil. Tu habilidad es tu superpoder. Sin límite de edad, sin requisitos previos. Solo ganas de crecer.",
        "Puedes ser los tres. Aprendes hoy, enseñas mañana, conectas espacios después. La comunidad crece cuando tú creces.",
        "Aprender haciendo. 70% práctica, 30% teoría. Creas, resuelves, practicas. No memorizas. Cada taller produce algo real: un documento, un plan, una habilidad demostrable. No 'conocer sobre' sino 'saber hacer'. Espacio seguro para participar, preguntar y equivocarte. Crítica constructiva: amable, específica, útil. Cero burlas, cero discriminación.",
        "Cada taller tiene un siguiente paso: otro taller relacionado, recursos para profundizar o un reto para practicar. El aprendizaje continúa.",
        "Bienvenida, presentaciones, qué haremos, reglas básicas de respeto. Trabajas activamente: creas, resuelves, practicas. El instructor guía, tú haces el trabajo. Al final, tienes algo concreto que mostrar. Muestras lo que hiciste, haces preguntas, recibes feedback. Aprendes de las experiencias de todos. Resumen, siguiente paso claro, certificado entregado, información sobre otros talleres."
      ],
    },
    {
      id: "aliados",
      title: "Aliados",
      subtitle: "Espacios que transforman",
      content: [
        "Espacio para 15-20 personas con buena luz, ventilación, baños cerca y salidas seguras. Internet es un plus, enchufes sí. Pantalla o pared blanca para proyectar. Micrófono si el grupo es grande. Tardes entre semana o fines de semana con alguien del lugar presente. Flexibilidad para charlas y actividades dinámicas.",
        "3 meses mínimo para crear impacto real y que la comunidad sienta la diferencia.",
        "Nos reunimos para entender objetivos, necesidades y capacidades. Vemos si encajamos. Firmamos compromisos iniciales. Tú aportas espacio, recursos y difusión. Nosotros aportamos talleres, coordinación y materiales.",
        "Cuando la alianza funciona, formalizamos con memorando de entendimiento: términos claros, responsabilidades definidas, métricas de éxito. Comunicación regular, revisión de resultados, ajustes necesarios. Relación a largo plazo con impacto comunitario sostenible.",
        "Instalaciones más activas, nuevos visitantes, marca asociada con educación y desarrollo. Empleados capacitados. Capacitación gratuita para empleados, posicionamiento como empresa socialmente responsable, identificación de talento local, networking con aliados y comunidad. Oferta académica complementada con talleres prácticos, estudiantes con acceso a profesionales activos, conexión comunitaria fortalecida.",
        "Nosotros manejamos logística, promoción y coordinación. Tú proporcionas espacio. Recibes reportes de impacto regulares para tus reportes de responsabilidad social."
      ],
    },
    {
      id: "voluntarios",
      title: "Voluntarios",
      subtitle: "Comparte tu conocimiento",
      content: [
        "30-45 minutos a tu ritmo sobre valores, seguridad y materiales. Te conectamos con alguien que ya lo ha hecho para acompañarte en tu primera experiencia. Observa primero, ayuda después, lidera cuando estés listo. Nosotros manejamos logística, publicidad e inscripciones. Tú compartes tu conocimiento.",
        "Qué aprenderán: 1-3 habilidades específicas. Qué harán: actividad principal. Qué se llevarán: algo concreto. Ejemplo: taller de currículum donde aprenden a estructurar experiencia, crean su CV y salen con documento listo. 1-2 horas, 70% práctica. Al final, cada persona tiene algo tangible.",
        "Revisión en máximo 2 días. Ajustes si es necesario, aprobación y programación. Tú solo apareces y compartes. Biblioteca de materiales disponible: plantillas y ejemplos listos para adaptar.",
        "Más talleres del mismo tema, nuevos temas, mentorear voluntarios, mejorar materiales, conseguir espacios. Tu tiempo, tus reglas. Aprendes de otros voluntarios, mejoras tu enseñanza, haces conexiones reales. Muchos aprenden tanto como enseñan. Participa cuando puedas, descansa cuando necesites. Una vez al mes está perfecto. La comunidad se adapta a tu vida.",
        "Compartimos historias de éxito, reconocemos públicamente y creamos oportunidades de crecimiento. Tu participación cambia vidas.",
        "Objetivos claros, mayoría del tiempo práctico, resultado tangible, siguiente paso definido, contenido apropiado y seguro. Propones, revisamos en máximo 2 días. Si está listo, aprobado. Si necesita ajustes, te damos feedback específico. Feedback siempre constructivo: amable, específico, útil. Cero críticas personales. Te sientes acompañado, no evaluado.",
        "Plantillas, ejemplos y materiales listos para adaptar a tu estilo. Nada desde cero. Plataformas para presentaciones, generador automático de certificados, herramientas de audio. Todo configurado y listo. Inscripciones, recordatorios, confirmaciones, seguimiento. Todo manejado. Tú solo apareces y compartes. Acceso en menos de 24 horas. Problemas técnicos resueltos en máximo 2 días."
      ],
    },
    {
      id: "participantes",
      title: "Participantes",
      subtitle: "Aprende y crece",
      content: [
        "Redes sociales y EventBrite. Ahí están los talleres disponibles: temas, fechas, lugares, qué aprenderás. Gratis, menos de un minuto. Nombre y contacto. Un día antes te enviamos recordatorio. Confirmas si vas. Si no puedes, avisa para dar el cupo a alguien más.",
        "Llega puntual. Talleres prácticos donde haces cosas, no solo escuchas. Al final, te llevas algo concreto para tu vida.",
        "Currículum que impacta, entrevistas que convencen, programas básicos de computadora, redes sociales profesionales, comunicación efectiva, liderazgo. Manejo de dinero personal, cocina básica y nutritiva, huerta casera, reparaciones en el hogar, apps útiles. Hablar en público, manejar el estrés, organizar tu tiempo, establecer metas, desarrollar creatividad. Internet seguro, contenido digital, herramientas de productividad, conceptos tech sin jerga complicada.",
        "Los talleres cambian según voluntarios y necesidades de Tocancipá. Siempre útiles, siempre relevantes.",
        "Tu nombre, tema del taller, habilidades desarrolladas, fecha, horas de duración, info de CircleUp e instructores. Generación automática. Llega a tu email. Solo participa activamente y completa el taller. Currículum mejorado, entrevistas de trabajo, demostración de compromiso con aprendizaje continuo. Las empresas valoran esto.",
        "Si participas en varios talleres relacionados, recibes certificado especial que muestra tu desarrollo en un área específica.",
        "No puedes inscribirte, plataforma falla, confirmaciones no llegan. Contáctanos, resuelto en menos de 24 horas. No puedes acceder, certificado no llega, problemas de descarga. Te ayudamos rápidamente. Problemas de conexión, no sabes usar la plataforma, necesitas ayuda técnica. Personal disponible para apoyo inmediato.",
        "WhatsApp, email, redes sociales. Respuesta rápida y ayuda hasta resolver completamente. Ningún problema técnico te impide aprender."
      ],
    }],
    en: [
    {
      id: "first-steps",
      title: "First Steps",
      subtitle: "Your knowledge, your community",
      content: [
        "Your knowledge, your community, your moment. This is CircleUp in Tocancipá, Cundinamarca. Libraries, cafes, schools where people share what they know. No cost, no barriers. You know how to cook, teach. You want to program, learn. You master finance, share. Here everyone has something to give and something to receive.",
        "When you share knowledge, the community transforms. Young people find opportunities they didn't know existed. Adults rediscover their value. Local spaces become epicenters of possibilities.",
        "You want to learn. Find your workshop, sign up and show up. 1-2 hours that can change everything. You leave with a certificate and your next clear step. You want to teach. Tell us what you know and we'll give you the tools. You don't need to be an expert, just authentic. We handle the logistics. You have a space. Your library, cafe or community hall where 15-20 people can gather. You provide the place, we coordinate everything.",
        "Libraries, cafes, schools, community centers, businesses. Places that become epicenters of change. They provide physical space and receive active community, visibility and real impact. Professionals, students, entrepreneurs, retirees. Anyone with practical knowledge and willingness to share. You don't need a degree, just know how to do something useful. Your skill is your superpower. No age limit, no prerequisites. Just desire to grow.",
        "You can be all three. You learn today, teach tomorrow, connect spaces later. The community grows when you grow.",
        "Learning by doing. 70% practice, 30% theory. You create, solve, practice. You don't memorize. Each workshop produces something real: a document, a plan, a demonstrable skill. Not 'knowing about' but 'knowing how to do'. Safe space to participate, ask and make mistakes. Constructive criticism: kind, specific, useful. Zero mockery, zero discrimination.",
        "Each workshop has a next step: another related workshop, resources to deepen or a challenge to practice. Learning continues.",
        "Welcome, introductions, what we'll do, basic rules of respect. You work actively: create, solve, practice. The instructor guides, you do the work. At the end, you have something concrete to show. You show what you did, ask questions, receive feedback. You learn from everyone's experiences. Summary, clear next step, certificate delivered, information about other workshops."
      ],
    },
    {
      id: "partners",
      title: "Partners",
      subtitle: "Spaces that transform",
      content: [
        "Space for 15-20 people with good lighting, ventilation, nearby bathrooms and safe exits. Internet is a plus, outlets yes. Screen or white wall to project. Microphone if the group is large. Weekday afternoons or weekends with someone from the place present. Flexibility for talks and dynamic activities.",
        "3 months minimum to create real impact and for the community to feel the difference.",
        "We meet to understand objectives, needs and capabilities. We see if we fit. We sign initial commitments. You provide space, resources and outreach. We provide workshops, coordination and materials.",
        "When the alliance works, we formalize with memorandum of understanding: clear terms, defined responsibilities, success metrics. Regular communication, results review, necessary adjustments. Long-term relationship with sustainable community impact.",
        "More active facilities, new visitors, brand associated with education and development. Trained employees. Free training for employees, positioning as socially responsible company, identification of local talent, networking with partners and community. Academic offering complemented with practical workshops, students with access to active professionals, strengthened community connection.",
        "We handle logistics, promotion and coordination. You provide space. You receive regular impact reports for your social responsibility reports."
      ],
    },
    {
      id: "volunteers",
      title: "Volunteers",
      subtitle: "Share your knowledge",
      content: [
        "30-45 minutes at your pace about values, safety and materials. We connect you with someone who has already done it to accompany you in your first experience. Observe first, help later, lead when you're ready. We handle logistics, advertising and registrations. You share your knowledge.",
        "What they'll learn: 1-3 specific skills. What they'll do: main activity. What they'll take away: something concrete. Example: resume workshop where they learn to structure experience, create their CV and leave with ready document. 1-2 hours, 70% practice. At the end, each person has something tangible.",
        "Review in maximum 2 days. Adjustments if necessary, approval and scheduling. You just show up and share. Material library available: templates and examples ready to adapt.",
        "More workshops on same topic, new topics, mentor volunteers, improve materials, get spaces. Your time, your rules. You learn from other volunteers, improve your teaching, make real connections. Many learn as much as they teach. Participate when you can, rest when you need. Once a month is perfect. The community adapts to your life.",
        "We share success stories, publicly recognize and create growth opportunities. Your participation changes lives.",
        "Clear objectives, majority of time practical, tangible result, defined next step, appropriate and safe content. You propose, we review in maximum 2 days. If ready, approved. If needs adjustments, we give you specific feedback. Feedback always constructive: kind, specific, useful. Zero personal criticism. You feel accompanied, not evaluated.",
        "Templates, examples and materials ready to adapt to your style. Nothing from scratch. Platforms for presentations, automatic certificate generator, audio tools. Everything configured and ready. Registrations, reminders, confirmations, follow-up. Everything handled. You just show up and share. Access in less than 24 hours. Technical problems solved in maximum 2 days."
      ],
    },
    {
      id: "participants",
      title: "Participants",
      subtitle: "Learn and grow",
      content: [
        "Social media and EventBrite. There are the available workshops: topics, dates, places, what you'll learn. Free, less than a minute. Name and contact. One day before we send you reminder. You confirm if you're going. If you can't, let us know to give the spot to someone else.",
        "Arrive on time. Practical workshops where you do things, not just listen. At the end, you take something concrete for your life.",
        "Resume that impacts, interviews that convince, basic computer programs, professional social media, effective communication, leadership. Personal money management, basic and nutritious cooking, home garden, home repairs, useful apps. Public speaking, stress management, time organization, goal setting, creativity development. Safe internet, digital content, productivity tools, tech concepts without complicated jargon.",
        "Workshops change according to volunteers and Tocancipá needs. Always useful, always relevant.",
        "Your name, workshop topic, developed skills, date, duration hours, CircleUp info and instructors. Automatic generation. Arrives to your email. Just participate actively and complete the workshop. Improved resume, job interviews, demonstration of commitment to continuous learning. Companies value this.",
        "If you participate in several related workshops, you receive special certificate showing your development in a specific area.",
        "You can't register, platform fails, confirmations don't arrive. Contact us, resolved in less than 24 hours. You can't access, certificate doesn't arrive, download problems. We help you quickly. Connection problems, you don't know how to use the platform, you need technical help. Staff available for immediate support.",
        "WhatsApp, email, social media. Quick response and help until completely resolved. No technical problem prevents you from learning."
      ],
    }],
    pt: [
    {
      id: "primeiros-passos",
      title: "Primeiros Passos",
      subtitle: "Seu conhecimento, sua comunidade",
      content: [
        "Seu conhecimento, sua comunidade, seu momento. Isto é CircleUp em Tocancipá, Cundinamarca. Bibliotecas, cafés, escolas onde as pessoas compartilham o que sabem. Sem custo, sem barreiras. Você sabe cozinhar, ensine. Quer programar, aprenda. Domina finanças, compartilhe. Aqui todos têm algo para dar e algo para receber.",
        "Quando você compartilha conhecimento, a comunidade se transforma. Os jovens encontram oportunidades que não sabiam que existiam. Os adultos redescobrem seu valor. Os espaços locais se tornam epicentros de possibilidades.",
        "Você quer aprender. Encontre sua oficina, inscreva-se e apareça. 1-2 horas que podem mudar tudo. Você sai com certificado e seu próximo passo claro. Você quer ensinar. Conte-nos o que você sabe e daremos as ferramentas. Você não precisa ser especialista, apenas autêntico. Nós cuidamos da logística. Você tem um espaço. Sua biblioteca, café ou salão comunitário onde 15-20 pessoas podem se reunir. Você empresta o lugar, nós coordenamos tudo.",
        "Bibliotecas, cafés, escolas, centros comunitários, empresas. Lugares que se tornam epicentros de mudança. Eles fornecem espaço físico e recebem comunidade ativa, visibilidade e impacto real. Profissionais, estudantes, empreendedores, aposentados. Qualquer pessoa com conhecimento prático e vontade de compartilhar. Você não precisa de diploma, apenas saber fazer algo útil. Sua habilidade é seu superpoder. Sem limite de idade, sem pré-requisitos. Apenas vontade de crescer.",
        "Você pode ser os três. Você aprende hoje, ensina amanhã, conecta espaços depois. A comunidade cresce quando você cresce.",
        "Aprender fazendo. 70% prática, 30% teoria. Você cria, resolve, pratica. Você não memoriza. Cada oficina produz algo real: um documento, um plano, uma habilidade demonstrável. Não 'saber sobre' mas 'saber fazer'. Espaço seguro para participar, perguntar e errar. Crítica construtiva: gentil, específica, útil. Zero zombaria, zero discriminação.",
        "Cada oficina tem um próximo passo: outra oficina relacionada, recursos para aprofundar ou um desafio para praticar. O aprendizado continua.",
        "Boas-vindas, apresentações, o que faremos, regras básicas de respeito. Você trabalha ativamente: cria, resolve, pratica. O instrutor orienta, você faz o trabalho. No final, você tem algo concreto para mostrar. Você mostra o que fez, faz perguntas, recebe feedback. Você aprende com as experiências de todos. Resumo, próximo passo claro, certificado entregue, informações sobre outras oficinas."
      ],
    },
    {
      id: "parceiros",
      title: "Parceiros",
      subtitle: "Espaços que transformam",
      content: [
        "Espaço para 15-20 pessoas com boa iluminação, ventilação, banheiros próximos e saídas seguras. Internet é um plus, tomadas sim. Tela ou parede branca para projetar. Microfone se o grupo for grande. Tardes de semana ou fins de semana com alguém do local presente. Flexibilidade para palestras e atividades dinâmicas.",
        "3 meses mínimo para criar impacto real e para a comunidade sentir a diferença.",
        "Nos reunimos para entender objetivos, necessidades e capacidades. Vemos se encaixamos. Assinamos compromissos iniciais. Você fornece espaço, recursos e divulgação. Nós fornecemos oficinas, coordenação e materiais.",
        "Quando a aliança funciona, formalizamos com memorando de entendimento: termos claros, responsabilidades definidas, métricas de sucesso. Comunicação regular, revisão de resultados, ajustes necessários. Relacionamento de longo prazo com impacto comunitário sustentável.",
        "Instalações mais ativas, novos visitantes, marca associada à educação e desenvolvimento. Funcionários capacitados. Treinamento gratuito para funcionários, posicionamento como empresa socialmente responsável, identificação de talentos locais, networking com parceiros e comunidade. Oferta acadêmica complementada com oficinas práticas, estudantes com acesso a profissionais ativos, conexão comunitária fortalecida.",
        "Nós cuidamos da logística, promoção e coordenação. Você fornece espaço. Você recebe relatórios de impacto regulares para seus relatórios de responsabilidade social."
      ],
    },
    {
      id: "voluntarios",
      title: "Voluntários",
      subtitle: "Compartilhe seu conhecimento",
      content: [
        "30-45 minutos no seu ritmo sobre valores, segurança e materiais. Conectamos você com alguém que já fez isso para acompanhá-lo em sua primeira experiência. Observe primeiro, ajude depois, lidere quando estiver pronto. Nós cuidamos da logística, publicidade e inscrições. Você compartilha seu conhecimento.",
        "O que aprenderão: 1-3 habilidades específicas. O que farão: atividade principal. O que levarão: algo concreto. Exemplo: oficina de currículo onde aprendem a estruturar experiência, criam seu CV e saem com documento pronto. 1-2 horas, 70% prática. No final, cada pessoa tem algo tangível.",
        "Revisão em no máximo 2 dias. Ajustes se necessário, aprovação e agendamento. Você apenas aparece e compartilha. Biblioteca de materiais disponível: modelos e exemplos prontos para adaptar.",
        "Mais oficinas sobre o mesmo tema, novos temas, mentorar voluntários, melhorar materiais, conseguir espaços. Seu tempo, suas regras. Você aprende com outros voluntários, melhora seu ensino, faz conexões reais. Muitos aprendem tanto quanto ensinam. Participe quando puder, descanse quando precisar. Uma vez por mês é perfeito. A comunidade se adapta à sua vida.",
        "Compartilhamos histórias de sucesso, reconhecemos publicamente e criamos oportunidades de crescimento. Sua participação muda vidas.",
        "Objetivos claros, maioria do tempo prático, resultado tangível, próximo passo definido, conteúdo apropriado e seguro. Você propõe, revisamos em no máximo 2 dias. Se estiver pronto, aprovado. Se precisar de ajustes, damos feedback específico. Feedback sempre construtivo: gentil, específico, útil. Zero críticas pessoais. Você se sente acompanhado, não avaliado.",
        "Modelos, exemplos e materiais prontos para adaptar ao seu estilo. Nada do zero. Plataformas para apresentações, gerador automático de certificados, ferramentas de áudio. Tudo configurado e pronto. Inscrições, lembretes, confirmações, acompanhamento. Tudo gerenciado. Você apenas aparece e compartilha. Acesso em menos de 24 horas. Problemas técnicos resolvidos em no máximo 2 dias."
      ],
    },
    {
      id: "participantes",
      title: "Participantes",
      subtitle: "Aprenda e cresça",
      content: [
        "Redes sociais e EventBrite. Lá estão as oficinas disponíveis: temas, datas, lugares, o que você aprenderá. Grátis, menos de um minuto. Nome e contato. Um dia antes enviamos lembrete. Você confirma se vai. Se não puder, avise para dar a vaga para outra pessoa.",
        "Chegue pontualmente. Oficinas práticas onde você faz coisas, não apenas ouve. No final, você leva algo concreto para sua vida.",
        "Currículo que impacta, entrevistas que convencem, programas básicos de computador, redes sociais profissionais, comunicação eficaz, liderança. Gestão de dinheiro pessoal, culinária básica e nutritiva, horta caseira, reparos domésticos, apps úteis. Falar em público, gerenciar estresse, organizar tempo, estabelecer metas, desenvolver criatividade. Internet segura, conteúdo digital, ferramentas de produtividade, conceitos tech sem jargão complicado.",
        "As oficinas mudam de acordo com voluntários e necessidades de Tocancipá. Sempre úteis, sempre relevantes.",
        "Seu nome, tema da oficina, habilidades desenvolvidas, data, horas de duração, info do CircleUp e instrutores. Geração automática. Chega ao seu email. Apenas participe ativamente e complete a oficina. Currículo melhorado, entrevistas de emprego, demonstração de compromisso com aprendizado contínuo. As empresas valorizam isso.",
        "Se você participar de várias oficinas relacionadas, recebe certificado especial mostrando seu desenvolvimento em uma área específica.",
        "Você não pode se inscrever, plataforma falha, confirmações não chegam. Entre em contato, resolvido em menos de 24 horas. Você não pode acessar, certificado não chega, problemas de download. Ajudamos você rapidamente. Problemas de conexão, você não sabe usar a plataforma, precisa de ajuda técnica. Equipe disponível para suporte imediato.",
        "WhatsApp, email, redes sociais. Resposta rápida e ajuda até resolver completamente. Nenhum problema técnico impede você de aprender."
      ],
    }]
  };

  const allContent = contentByLanguage[pageLanguage];

  // Scroll snap effect - detect active section with native scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Check if first section is visible to show accessibility button
      if (sectionRefs.current[0]) {
        const firstSection = sectionRefs.current[0];
        const rect = firstSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setShowAccessibilityButton(isVisible);
      }
      
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          
          if (scrollPosition >= absoluteTop && scrollPosition < absoluteTop + rect.height) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      const element = sectionRefs.current[index];
      const offset = 120; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-n-8">
      <Header setCurrentPage={setCurrentPage} />
      <ButtonGradient />

      {/* Accessibility Button - Page Specific - Appears when first section is visible */}
      <div 
        className={`fixed top-24 left-4 sm:left-6 md:left-8 lg:left-12 z-50 transition-all duration-500 ${
          showAccessibilityButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
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
        {showAccessibilityMenu && showAccessibilityButton && (
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

      {/* Full Width Hero - Awwwards Style with Particle Logo */}
      <section className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 lg:pb-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="max-w-[1800px] mx-auto">
          {/* Hero Particle Logo - Mobile (above title) */}
          <div className="lg:hidden h-[300px] sm:h-[350px] md:h-[400px] mb-12 md:mb-16">
            <HeroParticleLogo />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 xl:gap-32 items-center">
            {/* Left: Hero Text */}
            <div className="max-w-5xl">
              <div className={`uppercase tracking-[0.25em] text-n-4 mb-6 md:mb-8 lg:mb-10 ${
                fontSize === 'small' 
                  ? 'text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem]' 
                  : fontSize === 'large'
                  ? 'text-[0.7rem] sm:text-[0.75rem] md:text-sm'
                  : 'text-[0.6rem] sm:text-[0.65rem] md:text-xs'
              } ${
                fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
              }`}>
                Documentación
              </div>
              <h1 className={`leading-[0.9] font-bold text-n-1 mb-8 md:mb-12 lg:mb-16 tracking-tighter ${
                fontSize === 'small' 
                  ? 'text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[6rem] xl:text-[7.5rem]' 
                  : fontSize === 'large'
                  ? 'text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10.5rem]'
                  : 'text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem]'
              } ${
                fontFamily === 'serif' ? 'font-serif' : 'font-sans'
              }`}>
                {articleMeta.heroTitle.split(' ').map((word, i, arr) => (
                  i === arr.length - 1 ? word : word + ' '
                )).join('').split('CircleUp').map((part, i) => (
                  i === 0 ? part : <><br key={i} />CircleUp</>
                ))}
              </h1>
              <div className={`flex flex-wrap items-center gap-4 md:gap-6 lg:gap-8 text-n-4 tracking-wider ${
                fontSize === 'small' 
                  ? 'text-[0.6rem] sm:text-[0.65rem] md:text-xs' 
                  : fontSize === 'large'
                  ? 'text-[0.75rem] sm:text-sm md:text-base'
                  : 'text-[0.65rem] sm:text-xs md:text-sm'
              } ${
                fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
              }`}>
                <span>{articleMeta.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span>{articleMeta.lastUpdated}</span>
                <span className="w-1 h-1 rounded-full bg-n-6"></span>
                <span className="hidden sm:inline">{articleMeta.location}</span>
              </div>
            </div>

            {/* Right: Particle Logo - Desktop */}
            <div className="hidden lg:block h-[500px] xl:h-[600px]">
              <HeroParticleLogo />
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Layout - Native Scroll */}
      <section className="relative pb-20 md:pb-32 lg:pb-40">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 xl:gap-32">
            
            {/* Minimal Fixed Navigation - Larger */}
            <aside className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
              <nav className="space-y-2">
                {allContent.map((section, index) => (
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
                        ? 'text-[0.65rem] md:text-[0.7rem]' 
                        : fontSize === 'large'
                        ? 'text-[0.75rem] md:text-sm'
                        : 'text-[0.7rem] md:text-xs'
                    } ${
                      fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`transition-colors ${
                      fontSize === 'small' 
                        ? 'text-lg md:text-xl lg:text-2xl' 
                        : fontSize === 'large'
                        ? 'text-2xl md:text-3xl lg:text-4xl'
                        : 'text-xl md:text-2xl lg:text-3xl'
                    } ${
                      fontFamily === 'serif' ? 'font-serif' : 'font-sans'
                    } ${
                      activeSection === index ? 'font-medium' : 'font-light'
                    }`}>
                      {section.title}
                    </div>
                  </button>
                ))}
              </nav>

              {/* Minimal Progress - Larger */}
              <div className="mt-16 pt-10 border-t border-n-7">
                <div className={`text-n-5 mb-4 tracking-wider ${
                  fontSize === 'small' 
                    ? 'text-base md:text-lg' 
                    : fontSize === 'large'
                    ? 'text-xl md:text-2xl'
                    : 'text-lg md:text-xl'
                } ${
                  fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
                }`}>
                  {Math.round(((activeSection + 1) / allContent.length) * 100)}%
                </div>
                <div className="h-[1px] bg-n-7 relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-n-1 transition-all duration-1000 ease-out"
                    style={{ width: `${((activeSection + 1) / allContent.length) * 100}%` }}
                  />
                </div>
              </div>
            </aside>

            {/* Full Width Content Area - Native Scroll */}
            <div className="lg:col-span-9">
              <div className="space-y-24 md:space-y-40 lg:space-y-48 xl:space-y-56">
                {allContent.map((section, index) => (
                  <article
                    key={section.id}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-32"
                  >
                    {/* Minimal Section Header - Larger */}
                    <header className="mb-12 md:mb-16 lg:mb-20">
                      <div className={`uppercase tracking-[0.25em] text-n-5 mb-4 md:mb-6 ${
                        fontSize === 'small' 
                          ? 'text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem]' 
                          : fontSize === 'large'
                          ? 'text-[0.7rem] sm:text-[0.75rem] md:text-sm'
                          : 'text-[0.6rem] sm:text-[0.65rem] md:text-xs'
                      } ${
                        fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
                      }`}>
                        {String(index + 1).padStart(2, '0')} — {section.subtitle}
                      </div>
                      <h2 className={`leading-[0.95] font-bold text-n-1 tracking-tighter mb-6 md:mb-8 ${
                        fontSize === 'small' 
                          ? 'text-[1.75rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem]' 
                          : fontSize === 'large'
                          ? 'text-[2.5rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem]'
                          : 'text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] xl:text-[6rem]'
                      } ${
                        fontFamily === 'serif' ? 'font-serif' : 'font-sans'
                      }`}>
                        {section.title}
                      </h2>
                      <div className="w-12 md:w-16 h-[1px] bg-n-1"></div>
                    </header>

                    {/* Ultra-Readable Content - Larger Typography */}
                    <div className="max-w-4xl space-y-10">
                      {section.content.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className={`leading-[1.8] text-n-3 ${
                            fontSize === 'small' 
                              ? 'text-[1rem] md:text-[1.125rem] lg:text-[1.25rem]' 
                              : fontSize === 'large'
                              ? 'text-[1.375rem] md:text-[1.5rem] lg:text-[1.625rem]'
                              : 'text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem]'
                          } ${
                            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
                          } font-thin`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Minimal Navigation - Larger */}
                    {index < allContent.length - 1 && (
                      <div className="mt-16 md:mt-20 lg:mt-24 pt-12 md:pt-14 lg:pt-16 border-t border-n-7">
                        <button
                          onClick={() => scrollToSection(index + 1)}
                          className="group flex items-center gap-3 md:gap-4 text-n-3 hover:text-n-1 transition-all duration-500"
                        >
                          <span className={`uppercase tracking-[0.2em] ${
                            fontSize === 'small' 
                              ? 'text-[0.65rem] sm:text-xs md:text-sm' 
                              : fontSize === 'large'
                              ? 'text-sm sm:text-base md:text-lg'
                              : 'text-xs sm:text-sm md:text-base'
                          } ${
                            fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
                          }`}>Siguiente capítulo</span>
                          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default RoadmapDocs;
