import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
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
    title: "Policies",
    url: "/policies",
  },
  {
    id: "6",
    title: "Source Code",
    url: links.sourceCode,
    onlyMobile: true,
    external: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Mentorías personalizadas",
  "Talleres interactivos",
  "Certificaciones reconocidas",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Identificación de Necesidades",
    text: "Detectamos las brechas de conocimiento en la comunidad a través de encuestas y conversaciones directas con los participantes.",
    date: "Fase 1",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Conexión con Expertos",
    text: "Reclutamos voluntarios especialistas que comparten su experiencia profesional de manera accesible y práctica.",
    date: "Fase 2",
    status: "done",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Talleres Comunitarios",
    text: "Organizamos sesiones presenciales en bibliotecas y espacios públicos donde se facilita el aprendizaje colaborativo.",
    date: "Fase 3",
    status: "progress",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Seguimiento y Certificación",
    text: "Acompañamos el progreso de cada participante y otorgamos certificaciones que validen sus nuevas competencias.",
    date: "Fase 4",
    status: "progress",
    imageUrl: roadmap4,
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
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Eventbrite",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Jellypod",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Deepgram",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "GitHub Actions",
    icon: photoshop,
    width: 34,
    height: 34,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
    premium: false,
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
    premium: true,
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
    premium: false,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "/src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
  },
  {
    id: "1",
    title: "Improve everyday",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "/src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    light: true,
  },
  {
    id: "2",
    title: "Connect everywhere",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: "/src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
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
