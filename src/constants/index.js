import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  facebook,
  figma,
  instagram,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";
import { links } from "../config";

export const navigation = [
  {
    id: "1",
    title: "Aliados",
    url: "/aliados",
  },
  {
    id: "2",
    title: "Voluntarios",
    url: "/voluntarios",
  },
  {
    id: "3",
    title: "Participantes",
    url: "/participantes",
  },
  {
    id: "4",
    title: "Core",
    url: "/roadmap",
  },
  {
    id: "5",
    title: "Politicas",
    url: "/policies",
  },
  {
    id: "6",
    title: "Únete a Nosotros",
    url: "/login",
    onlyMobile: true,
  },
];

export const heroIcons = [searchMd, searchMd, searchMd, searchMd];

export const notificationImages = [];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const circleUpServices = [
  "Mentorías personalizadas",
  "Talleres interactivos",
  "Certificaciones reconocidas",
];

export const circleUpServicesIcons = [
  recording03,
  recording01,
  searchMd,
  searchMd,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Identificación de Necesidades",
    text: "Detectamos las brechas de conocimiento en la comunidad a través de encuestas y conversaciones directas con los participantes.",
    date: "Fase 1",
    status: "done",
    imageUrl: "/assets/circleimages/roadmap-1.png",
    colorful: true,
  },
  {
    id: "1",
    title: "Conexión con Expertos",
    text: "Reclutamos voluntarios especialistas que comparten su experiencia profesional de manera accesible y práctica.",
    date: "Fase 2",
    status: "done",
    imageUrl: "/assets/circleimages/roadmap-2.png",
  },
  {
    id: "2",
    title: "Talleres Comunitarios",
    text: "Organizamos sesiones presenciales en bibliotecas y espacios públicos donde se facilita el aprendizaje colaborativo.",
    date: "Fase 3",
    status: "progress",
    imageUrl: "/assets/circleimages/roadmap-3.png",
  },
  {
    id: "3",
    title: "Seguimiento y Certificación",
    text: "Acompañamos el progreso de cada participante y otorgamos certificaciones que validen sus nuevas competencias.",
    date: "Fase 4",
    status: "progress",
    imageUrl: "/assets/circleimages/roadmap-4.png",
  },
];

export const collabText =
  "Utilizamos tecnología moderna y segura para crear experiencias de aprendizaje efectivas y accesibles para toda la comunidad.";

export const collabContent = [
  {
    id: "0",
    title: "Gestión de Datos",
    text: "Snowflake para almacenamiento y análisis de datos de participantes y talleres.",
  },
  {
    id: "1",
    title: "Organización de Eventos",
    text: "Eventbrite para gestionar inscripciones y logística de talleres comunitarios.",
  },
  {
    id: "2",
    title: "Automatización y Audio",
    text: "GitHub Actions, Jellypod y Deepgram para procesos automatizados y contenido multimedia.",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Snowflake",
    icon: "/assets/circleimages/snow.png",
    width: 32,
    height: 32,
  },
  {
    id: "1",
    title: "Eventbrite",
    icon: "/assets/circleimages/event.png",
    width: 32,
    height: 32,
  },
  {
    id: "2",
    title: "Deepgram",
    icon: "/assets/circleimages/deepgram.png",
    width: 32,
    height: 32,
  },
  {
    id: "3",
    title: "GitHub",
    icon: "/assets/circleimages/git.png",
    width: 32,
    height: 32,
  },
  {
    id: "4",
    title: "Perplexity",
    icon: "/assets/circleimages/perplexity.png",
    width: 32,
    height: 32,
  },
  {
    id: "5",
    title: "Jellypod",
    icon: "/assets/circleimages/jellypod.png",
    width: 32,
    height: 32,
  },
  {
    id: "6",
    title: "Streamlit",
    icon: "/assets/circleimages/streamlit.png",
    width: 32,
    height: 32,
  },
  {
    id: "7",
    title: "ElevenLabs",
    icon: "/assets/circleimages/elevenlabs.png",
    width: 32,
    height: 32,
  },
  {
    id: "8",
    title: "WeasyPrint",
    icon: "/assets/circleimages/weasyprint.png",
    width: 32,
    height: 32,
  },
  {
    id: "9",
    title: "Windsurf",
    icon: "/assets/circleimages/windsurf.png",
    width: 32,
    height: 32,
  },
  {
    id: "10",
    title: "YouForm",
    icon: "/assets/circleimages/youform.png",
    width: 32,
    height: 32,
  },
  {
    id: "11",
    title: "Gamma",
    icon: "/assets/circleimages/gamma.png",
    width: 32,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Participante",
    description: "Acceso básico a talleres y mentorías comunitarias",
    price: "0",
    features: [
      "Acceso a talleres comunitarios gratuitos",
      "Conexión con mentores voluntarios",
      "Certificaciones básicas de participación",
    ],
    premium: false,
  },
  {
    id: "1",
    title: "Voluntario",
    description: "Herramientas para mentores y facilitadores de talleres",
    price: "0",
    features: [
      "Panel de gestión de talleres",
      "Herramientas de seguimiento de participantes",
      "Acceso prioritario a recursos educativos",
    ],
    premium: true,
  },
  {
    id: "2",
    title: "Aliado",
    description: "Colaboración institucional y patrocinio de programas",
    price: null,
    features: [
      "Dashboard de impacto y métricas",
      "Branding en talleres patrocinados",
      "Reportes personalizados de alcance comunitario",
    ],
    premium: false,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Aprende de Expertos",
    text: "Conecta con profesionales voluntarios que comparten su experiencia de manera accesible y práctica.",
    backgroundUrl: "/src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
  },
  {
    id: "1",
    title: "Mejora Continuamente",
    text: "Participa en talleres interactivos donde la comunidad comparte conocimientos y experiencias reales.",
    backgroundUrl: "/src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    light: true,
  },
  {
    id: "2",
    title: "Conecta en Comunidad",
    text: "Accede a espacios de aprendizaje en bibliotecas y centros comunitarios cerca de ti.",
    backgroundUrl: "/src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
  },
];

export const socials = [
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
