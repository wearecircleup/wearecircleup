import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import NeedHelp from "../components/NeedHelp";
import Button from "../components/Button";
import HeroParticleLogo from "../components/HeroParticleLogo";
import { BackgroundCircles } from "../components/design/Hero";

const PoliciesDocs = ({ setCurrentPage }) => {
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [fontFamily, setFontFamily] = useState('sans');
  const [fontSize, setFontSize] = useState('normal');
  const [menuLanguage, setMenuLanguage] = useState('es');
  const [pageLanguage, setPageLanguage] = useState('es');
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
      readTime: "15 min lectura",
      lastUpdated: "Enero 2026",
      location: "Tocancipá, Cundinamarca",
      heroLabel: "Políticas",
      heroTitle: "Políticas CircleUp",
      nextChapter: "Siguiente política",
      progress: "% completado"
    },
    en: {
      readTime: "15 min read",
      lastUpdated: "January 2026",
      location: "Tocancipá, Cundinamarca",
      heroLabel: "Policies",
      heroTitle: "CircleUp Policies",
      nextChapter: "Next policy",
      progress: "% complete"
    },
    pt: {
      readTime: "15 min leitura",
      lastUpdated: "Janeiro 2026",
      location: "Tocancipá, Cundinamarca",
      heroLabel: "Políticas",
      heroTitle: "Políticas CircleUp",
      nextChapter: "Próxima política",
      progress: "% completo"
    }
  };

  const articleMeta = articleMetaContent[pageLanguage];

  const contentByLanguage = {
    es: [
    {
      id: "privacy-policy",
      title: "Política de Privacidad",
      subtitle: "Protección de datos personales",
      content: [
        "Esta Política describe cómo Circle Up Volunteers (\"Circle Up\") recolecta, usa, conserva y protege los datos personales de participantes, voluntariado, aliados y otras personas relacionadas con sus actividades de aprendizaje comunitario. Buscamos un tratamiento responsable, proporcional y transparente, adecuado a la naturaleza joven y de bajo riesgo del proyecto.",
        "Responsable del tratamiento: Circle Up Volunteers (iniciativa comunitaria sin ánimo de lucro). Canales de contacto: formularios oficiales (YouForm) y canales del repositorio del proyecto. Esta Política se interpreta conforme a la Ley 1581 de 2012 (Colombia) y normas concordantes.",
        "Categorías de datos: Identificación y contacto (nombre, correo electrónico, número de WhatsApp). Operación de actividades (sede, curso, fecha/hora, inscripción, confirmaciones, asistencia efectiva). Calidad y mejora (NPS, encuestas breves, comentarios voluntarios). Contenidos y evidencia (fotografías, clips de audio, transcripciones). Voluntariado (intereses, experiencia, propuesta de curso, rúbricas y retroalimentación). Marketing básico (etiquetas UTM de campañas, ciudad/sede). Tecnología (registros mínimos de uso de formularios/plataformas para debug y seguridad).",
        "Finalidades del tratamiento: Gestionar inscripciones, cupos y comunicaciones de recordatorio. Coordinar sedes, horarios y logística de actividades. Medir calidad (NPS, asistencia) y mejorar contenidos/operación. Emitir certificados digitales. Gestionar el ciclo de voluntariado. Mantener evidencias de aprendizaje comunitario. Reportería operativa interna y transparencia mínima de resultados. Gestionar becas educativas semestrales.",
        "Base jurídica: Consentimiento informado (inscripción, encuestas, uso de imagen/audio, menores). Ejecución de actividades propias de Circle Up (comunicaciones y gestión operativa). Interés legítimo en seguridad y prevención de abuso, con salvaguardas y minimización.",
        "Terceros encargados: YouForm, Eventbrite, Lu.ma, Calendly, Auth0, Google Slides/Cloud, Weasyprint, Jellypod, Spotify, Deepgram, Snowflake, WhatsApp Business, GitHub Pages, Streamlit, plataformas educativas. Cada proveedor tiene su propia política de privacidad.",
        "Retención: Inscripciones y asistencia hasta 24 meses. Encuestas/NPS hasta 24 meses. Materiales, fotos y audio hasta 36 meses. Registros técnicos hasta 6 meses. Conservamos lo mínimo necesario y aplicamos supresión/anonimización.",
        "Seguridad: Acceso por roles y principio de mínimo privilegio. Cifrado en tránsito (HTTPS/TLS) y en reposo. Separación de entornos y control de cambios básicos. Pseudonimización para reportería. Menores de edad: Autorizaciones requeridas y regla de dos adultos. Datos mínimos y adecuados. No publicamos imágenes que identifiquen a menores sin consentimiento legal. Derechos: Acceso, rectificación, supresión, revocación del consentimiento. Ejercerlos mediante formularios oficiales o canales del repositorio."
      ],
    },
    {
      id: "terms-conditions",
      title: "Términos y Condiciones",
      subtitle: "Regulación de participación",
      content: [
        "Estos Términos y Condiciones regulan la participación en las actividades de aprendizaje comunitario organizadas por Circle Up Volunteers, tanto para personas participantes como para personas voluntarias y aliadas. Al inscribirse, asistir o facilitar actividades, usted declara haber leído, comprendido y aceptado estos Términos y Condiciones.",
        "Definiciones: Participante (persona que asiste a actividades), Voluntario/a (persona que facilita contenidos o apoya operación), Aliado/a (entidad o persona titular de sede), Sede (espacio físico donde se realizan actividades), Actividades (cursos, talleres, charlas), Menor de edad (persona menor de 18 años).",
        "Naturaleza de las actividades: Gratuitas y abiertas a la comunidad. En sedes comerciales puede existir ticket de consumo mínimo acordado en MOU. Carácter informal, no otorgan títulos con validez académica oficial. Certificados digitales de participación de carácter simbólico. Becas educativas semestrales conforme a política específica.",
        "Inscripción y asistencia: Mediante formularios oficiales y plataformas autorizadas. Cupos limitados con listas de espera. Confirmaciones con antelación. Registro de asistencia efectiva el día del evento.",
        "Derechos y deberes de participantes: Recibir ambiente respetuoso, seguro e inclusivo. Acceder a información clara. Cumplir normas de convivencia, puntualidad y uso responsable de recursos. Seguir lineamientos de la sede y de Circle Up.",
        "Derechos y deberes de voluntarios: Contar con lineamientos, plantillas y acompañamiento. Cumplir Código de Conducta, salvaguardas para menores y protocolos de seguridad. Preparar contenidos conforme a rúbricas de calidad. Reportar incidencias y resultados.",
        "Protección de menores: Participación sujeta a autorizaciones y acompañamiento. Regla de \"dos adultos\" para interacción. Prohibido recabar datos innecesarios. Contenidos y materiales adecuados a la edad.",
        "Propiedad intelectual: Corresponde a quien crea los materiales (generalmente voluntario/a). Uso de materiales por participantes limitado a fines personales y no comerciales. Circle Up puede solicitar licencias no exclusivas para difundir materiales educativos. Imagen y grabaciones: Fotografías o clips breves con fines de memoria y difusión educativa. Respeto a objeciones de imagen. Consentimiento del responsable legal para menores. Datos personales: Tratamiento conforme a normatividad colombiana y Política de Privacidad. Minimización y acceso por roles. Derechos de acceso, rectificación y supresión."
      ],
    },
    {
      id: "code-conduct",
      title: "Código de Conducta",
      subtitle: "Estándares de comportamiento",
      content: [
        "Este Código establece los estándares de comportamiento esperados para todas las personas que interactúan con Circle Up Volunteers: participantes, voluntariado, equipo y aliados. Su propósito es garantizar un entorno seguro, inclusivo y profesional, dentro y fuera de las actividades.",
        "Alcance: Aplica a todas las actividades de Circle Up (cursos, talleres, charlas, eventos) en cualquier sede (espacio público, biblioteca, colegio, empresa, café) y en canales digitales (redes sociales, grupos de mensajería, formularios, correo).",
        "Principios: Respeto e inclusión (dignidad para todas las personas, sin discriminación). Integridad y honestidad (coherencia entre lo que se comunica y lo que se hace). Seguridad y salvaguarda (prevención activa de riesgos, especialmente con menores). Responsabilidad y cuidado (trato responsable de personas, recursos y espacios). Transparencia y datos mínimos (comunicación clara, manejo responsable de información personal).",
        "Respeto e inclusión: Prohibido el acoso, intimidación, discriminación y violencia. Lenguaje y conducta respetuosos. Escucha activa y tolerancia a la diferencia. Promoción de participación segura de grupos históricamente marginados.",
        "Interacciones con menores: Contenidos y materiales adecuados a la edad. Actividades supervisadas. Reporte inmediato de cualquier sospecha de riesgo. Autorizaciones y protocolos definidos para su participación.",
        "Seguridad en sede: Cumplir normas de cada sede (aforo, horarios, ticket mínimo si aplica, señalización). Respetar indicaciones del personal responsable y rutas de evacuación. Prohibidos porte de armas, consumo de sustancias psicoactivas durante actividades, y conductas peligrosas.",
        "Uso responsable de recursos: Cuidado de materiales, equipos y espacios. Respeto de derechos de autor. Materiales de cursos para uso personal/no comercial, salvo autorización.",
        "Conducta digital: Uso de canales oficiales, sin spam. No compartir datos personales de terceros sin autorización. Imágenes y audio solo con consentimiento. No publicar contenidos que identifiquen a menores sin permiso legal. Respeto a la privacidad en grupos de mensajería. Reportes e investigación: Se puede reportar cualquier incidente por canales oficiales. Reporte anónimo permitido. Prohibidas represalias contra quienes reportan de buena fe. Gestión con plazos orientativos y respeto a confidencialidad. Medidas posibles: Advertencia, retiro temporal o definitivo, restricciones de acceso, comunicación a autoridades. Para faltas graves: expulsión inmediata y reporte."
      ],
    },
    {
      id: "educational-model",
      title: "Modelo Educativo",
      subtitle: "Aprendizaje comunitario",
      content: [
        "Esta política establece el modelo educativo de Circle Up Volunteers, basado en principios de aprendizaje comunitario, intercambio de conocimientos y desarrollo de capacidades locales.",
        "Enfoque pedagógico: Aprendizaje práctico y colaborativo donde los participantes construyen conocimiento a través de la experiencia directa. Se privilegia el \"aprender haciendo\" sobre la transmisión pasiva de información.",
        "Estructura de actividades: Talleres de 1-2 horas con 70% de práctica activa, 20% de teoría aplicada y 10% de reflexión grupal. Cada sesión debe producir un resultado tangible que los participantes puedan usar inmediatamente.",
        "Criterios de calidad: Contenidos relevantes para la vida diaria, metodologías participativas, ambiente inclusivo y respetuoso, y seguimiento del aprendizaje mediante retroalimentación constructiva.",
        "Evaluación y mejora: Sistema de NPS (Net Promoter Score) para medir satisfacción, encuestas de seguimiento para evaluar aplicación del conocimiento, y retroalimentación continua para mejorar contenidos y metodologías."
      ],
    }],
    en: [
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      subtitle: "Personal data protection",
      content: [
        "This Policy describes how Circle Up Volunteers (\"Circle Up\") collects, uses, retains and protects personal data of participants, volunteers, partners and other people related to its community learning activities. We seek responsible, proportional and transparent treatment, appropriate to the young and low-risk nature of the project.",
        "Data controller: Circle Up Volunteers (non-profit community initiative). Contact channels: official forms (YouForm) and project repository channels. This Policy is interpreted in accordance with Law 1581 of 2012 (Colombia) and related regulations.",
        "Data categories: Identification and contact (name, email, WhatsApp number). Activity operations (venue, course, date/time, registration, confirmations, actual attendance). Quality and improvement (NPS, brief surveys, voluntary comments). Contents and evidence (photographs, audio clips, transcripts). Volunteering (interests, experience, course proposal, rubrics and feedback). Basic marketing (UTM campaign tags, city/venue). Technology (minimal usage logs of forms/platforms for debugging and security).",
        "Processing purposes: Manage registrations, quotas and reminder communications. Coordinate venues, schedules and activity logistics. Measure quality (NPS, attendance) and improve contents/operations. Issue digital certificates. Manage volunteering cycle. Maintain community learning evidence. Internal operational reporting and minimal results transparency. Manage semester educational scholarships.",
        "Legal basis: Informed consent (registration, surveys, use of image/audio, minors). Execution of Circle Up's own activities (communications and operational management). Legitimate interest in security and abuse prevention, with safeguards and minimization.",
        "Third-party processors: YouForm, Eventbrite, Lu.ma, Calendly, Auth0, Google Slides/Cloud, Weasyprint, Jellypod, Spotify, Deepgram, Snowflake, WhatsApp Business, GitHub Pages, Streamlit, educational platforms. Each provider has its own privacy policy.",
        "Retention: Registrations and attendance up to 24 months. Surveys/NPS up to 24 months. Materials, photos and audio up to 36 months. Technical logs up to 6 months. We keep the minimum necessary and apply deletion/anonymization.",
        "Security: Access by roles and principle of least privilege. Encryption in transit (HTTPS/TLS) and at rest. Environment separation and basic change control. Pseudonymization for reporting. Minors: Authorizations required and two-adult rule. Minimal and adequate data. We don't publish images identifying minors without legal consent. Rights: Access, rectification, deletion, consent revocation. Exercise them through official forms or repository channels."
      ],
    },
    {
      id: "terms-conditions",
      title: "Terms and Conditions",
      subtitle: "Participation regulation",
      content: [
        "These Terms and Conditions regulate participation in community learning activities organized by Circle Up Volunteers, for both participants and volunteers and partners. By registering, attending or facilitating activities, you declare having read, understood and accepted these Terms and Conditions.",
        "Definitions: Participant (person attending activities), Volunteer (person facilitating contents or supporting operations), Partner (entity or person owning venue), Venue (physical space where activities take place), Activities (courses, workshops, talks), Minor (person under 18 years old).",
        "Nature of activities: Free and open to the community. In commercial venues there may be a minimum consumption ticket agreed in MOU. Informal nature, do not grant officially valid academic degrees. Symbolic digital participation certificates. Semester educational scholarships according to specific policy.",
        "Registration and attendance: Through official forms and authorized platforms. Limited quotas with waiting lists. Confirmations in advance. Actual attendance registration on event day.",
        "Participants' rights and duties: Receive respectful, safe and inclusive environment. Access clear information. Comply with coexistence rules, punctuality and responsible use of resources. Follow venue and Circle Up guidelines.",
        "Volunteers' rights and duties: Have guidelines, templates and support. Comply with Code of Conduct, safeguards for minors and security protocols. Prepare contents according to quality rubrics. Report incidents and results.",
        "Minor protection: Participation subject to authorizations and accompaniment. \"Two adults\" rule for interaction. Prohibited to collect unnecessary data. Contents and materials appropriate for age.",
        "Intellectual property: Belongs to whoever creates the materials (generally volunteer). Use of materials by participants limited to personal and non-commercial purposes. Circle Up may request non-exclusive licenses to disseminate educational materials. Image and recordings: Photographs or brief clips for memory and educational dissemination purposes. Respect for image objections. Legal guardian consent for minors. Personal data: Treatment according to Colombian regulations and Privacy Policy. Minimization and access by roles. Rights of access, rectification and deletion."
      ],
    },
    {
      id: "code-conduct",
      title: "Code of Conduct",
      subtitle: "Behavior standards",
      content: [
        "This Code establishes the behavior standards expected for all people interacting with Circle Up Volunteers: participants, volunteers, team and partners. Its purpose is to guarantee a safe, inclusive and professional environment, inside and outside activities.",
        "Scope: Applies to all Circle Up activities (courses, workshops, talks, events) at any venue (public space, library, school, company, cafe) and in digital channels (social media, messaging groups, forms, email).",
        "Principles: Respect and inclusion (dignity for all people, without discrimination). Integrity and honesty (coherence between what is communicated and what is done). Safety and safeguarding (active risk prevention, especially with minors). Responsibility and care (responsible treatment of people, resources and spaces). Transparency and minimal data (clear communication, responsible handling of personal information).",
        "Respect and inclusion: Prohibited harassment, intimidation, discrimination and violence. Respectful language and conduct. Active listening and tolerance for difference. Promotion of safe participation of historically marginalized groups.",
        "Interactions with minors: Contents and materials appropriate for age. Supervised activities. Immediate report of any risk suspicion. Defined authorizations and protocols for their participation.",
        "Venue safety: Comply with each venue's rules (capacity, schedules, minimum ticket if applicable, signage). Respect instructions from responsible staff and evacuation routes. Prohibited weapons carrying, psychoactive substance consumption during activities, and dangerous conduct.",
        "Responsible use of resources: Care of materials, equipment and spaces. Respect for copyright. Course materials for personal/non-commercial use, unless authorized.",
        "Digital conduct: Use of official channels, no spam. Don't share third-party personal data without authorization. Images and audio only with consent. Don't publish content identifying minors without legal permission. Respect for privacy in messaging groups. Reports and investigation: Any incident can be reported through official channels. Anonymous reporting allowed. Retaliation against good faith reporters prohibited. Management with indicative deadlines and respect for confidentiality. Possible measures: Warning, temporary or permanent removal, access restrictions, communication to authorities. For serious offenses: immediate expulsion and report."
      ],
    },
    {
      id: "educational-model",
      title: "Educational Model",
      subtitle: "Community learning",
      content: [
        "This policy establishes the educational model of Circle Up Volunteers, based on principles of community learning, knowledge exchange and local capacity development.",
        "Pedagogical approach: Practical and collaborative learning where participants build knowledge through direct experience. \"Learning by doing\" is privileged over passive information transmission.",
        "Activity structure: 1-2 hour workshops with 70% active practice, 20% applied theory and 10% group reflection. Each session must produce a tangible result that participants can use immediately.",
        "Quality criteria: Contents relevant to daily life, participatory methodologies, inclusive and respectful environment, and learning follow-up through constructive feedback.",
        "Evaluation and improvement: NPS (Net Promoter Score) system to measure satisfaction, follow-up surveys to evaluate knowledge application, and continuous feedback to improve contents and methodologies."
      ],
    }],
    pt: [
    {
      id: "privacy-policy",
      title: "Política de Privacidade",
      subtitle: "Proteção de dados pessoais",
      content: [
        "Esta Política descreve como Circle Up Volunteers (\"Circle Up\") coleta, usa, conserva e protege dados pessoais de participantes, voluntários, parceiros e outras pessoas relacionadas às suas atividades de aprendizagem comunitária. Buscamos tratamento responsável, proporcional e transparente, adequado à natureza jovem e de baixo risco do projeto.",
        "Responsável pelo tratamento: Circle Up Volunteers (iniciativa comunitária sem fins lucrativos). Canais de contato: formulários oficiais (YouForm) e canais do repositório do projeto. Esta Política é interpretada de acordo com a Lei 1581 de 2012 (Colômbia) e regulamentações relacionadas.",
        "Categorias de dados: Identificação e contato (nome, email, número WhatsApp). Operações de atividades (local, curso, data/hora, inscrição, confirmações, presença efetiva). Qualidade e melhoria (NPS, pesquisas breves, comentários voluntários). Conteúdos e evidências (fotografias, clipes de áudio, transcrições). Voluntariado (interesses, experiência, proposta de curso, rubricas e feedback). Marketing básico (tags UTM de campanhas, cidade/local). Tecnologia (registros mínimos de uso de formulários/plataformas para debug e segurança).",
        "Finalidades do tratamento: Gerenciar inscrições, vagas e comunicações de lembrete. Coordenar locais, horários e logística de atividades. Medir qualidade (NPS, presença) e melhorar conteúdos/operações. Emitir certificados digitais. Gerenciar ciclo de voluntariado. Manter evidências de aprendizagem comunitária. Relatórios operacionais internos e transparência mínima de resultados. Gerenciar bolsas educacionais semestrais.",
        "Base jurídica: Consentimento informado (inscrição, pesquisas, uso de imagem/áudio, menores). Execução de atividades próprias do Circle Up (comunicações e gestão operacional). Interesse legítimo em segurança e prevenção de abuso, com salvaguardas e minimização.",
        "Processadores terceiros: YouForm, Eventbrite, Lu.ma, Calendly, Auth0, Google Slides/Cloud, Weasyprint, Jellypod, Spotify, Deepgram, Snowflake, WhatsApp Business, GitHub Pages, Streamlit, plataformas educacionais. Cada provedor tem sua própria política de privacidade.",
        "Retenção: Inscrições e presença até 24 meses. Pesquisas/NPS até 24 meses. Materiais, fotos e áudio até 36 meses. Registros técnicos até 6 meses. Mantemos o mínimo necessário e aplicamos exclusão/anonimização.",
        "Segurança: Acesso por funções e princípio do menor privilégio. Criptografia em trânsito (HTTPS/TLS) e em repouso. Separação de ambientes e controle básico de mudanças. Pseudonimização para relatórios. Menores: Autorizações necessárias e regra de dois adultos. Dados mínimos e adequados. Não publicamos imagens identificando menores sem consentimento legal. Direitos: Acesso, retificação, exclusão, revogação do consentimento. Exercê-los através de formulários oficiais ou canais do repositório."
      ],
    },
    {
      id: "terms-conditions",
      title: "Termos e Condições",
      subtitle: "Regulação de participação",
      content: [
        "Estes Termos e Condições regulam a participação em atividades de aprendizagem comunitária organizadas por Circle Up Volunteers, tanto para participantes quanto para voluntários e parceiros. Ao se inscrever, participar ou facilitar atividades, você declara ter lido, compreendido e aceitado estes Termos e Condições.",
        "Definições: Participante (pessoa que participa de atividades), Voluntário (pessoa que facilita conteúdos ou apoia operações), Parceiro (entidade ou pessoa proprietária do local), Local (espaço físico onde as atividades acontecem), Atividades (cursos, oficinas, palestras), Menor (pessoa menor de 18 anos).",
        "Natureza das atividades: Gratuitas e abertas à comunidade. Em locais comerciais pode haver ticket de consumo mínimo acordado em MOU. Natureza informal, não concedem diplomas academicamente válidos oficialmente. Certificados digitais de participação simbólicos. Bolsas educacionais semestrais conforme política específica.",
        "Inscrição e presença: Através de formulários oficiais e plataformas autorizadas. Vagas limitadas com listas de espera. Confirmações com antecedência. Registro de presença efetiva no dia do evento.",
        "Direitos e deveres dos participantes: Receber ambiente respeitoso, seguro e inclusivo. Acessar informações claras. Cumprir regras de convivência, pontualidade e uso responsável de recursos. Seguir diretrizes do local e do Circle Up.",
        "Direitos e deveres dos voluntários: Ter diretrizes, modelos e suporte. Cumprir Código de Conduta, salvaguardas para menores e protocolos de segurança. Preparar conteúdos de acordo com rubricas de qualidade. Reportar incidentes e resultados.",
        "Proteção de menores: Participação sujeita a autorizações e acompanhamento. Regra de \"dois adultos\" para interação. Proibido coletar dados desnecessários. Conteúdos e materiais apropriados para a idade.",
        "Propriedade intelectual: Pertence a quem cria os materiais (geralmente voluntário). Uso de materiais por participantes limitado a fins pessoais e não comerciais. Circle Up pode solicitar licenças não exclusivas para disseminar materiais educacionais. Imagem e gravações: Fotografias ou clipes breves para fins de memória e disseminação educacional. Respeito às objeções de imagem. Consentimento do responsável legal para menores. Dados pessoais: Tratamento de acordo com regulamentações colombianas e Política de Privacidade. Minimização e acesso por funções. Direitos de acesso, retificação e exclusão."
      ],
    },
    {
      id: "code-conduct",
      title: "Código de Conduta",
      subtitle: "Padrões de comportamento",
      content: [
        "Este Código estabelece os padrões de comportamento esperados para todas as pessoas que interagem com Circle Up Volunteers: participantes, voluntários, equipe e parceiros. Seu propósito é garantir um ambiente seguro, inclusivo e profissional, dentro e fora das atividades.",
        "Alcance: Aplica-se a todas as atividades do Circle Up (cursos, oficinas, palestras, eventos) em qualquer local (espaço público, biblioteca, escola, empresa, café) e em canais digitais (redes sociais, grupos de mensagens, formulários, email).",
        "Princípios: Respeito e inclusão (dignidade para todas as pessoas, sem discriminação). Integridade e honestidade (coerência entre o que é comunicado e o que é feito). Segurança e salvaguarda (prevenção ativa de riscos, especialmente com menores). Responsabilidade e cuidado (tratamento responsável de pessoas, recursos e espaços). Transparência e dados mínimos (comunicação clara, manuseio responsável de informações pessoais).",
        "Respeito e inclusão: Proibido assédio, intimidação, discriminação e violência. Linguagem e conduta respeitosas. Escuta ativa e tolerância à diferença. Promoção de participação segura de grupos historicamente marginalizados.",
        "Interações com menores: Conteúdos e materiais apropriados para a idade. Atividades supervisionadas. Relatório imediato de qualquer suspeita de risco. Autorizações e protocolos definidos para sua participação.",
        "Segurança no local: Cumprir regras de cada local (capacidade, horários, ticket mínimo se aplicável, sinalização). Respeitar instruções do pessoal responsável e rotas de evacuação. Proibido porte de armas, consumo de substâncias psicoativas durante atividades e conduta perigosa.",
        "Uso responsável de recursos: Cuidado com materiais, equipamentos e espaços. Respeito aos direitos autorais. Materiais do curso para uso pessoal/não comercial, a menos que autorizado.",
        "Conduta digital: Uso de canais oficiais, sem spam. Não compartilhar dados pessoais de terceiros sem autorização. Imagens e áudio apenas com consentimento. Não publicar conteúdo identificando menores sem permissão legal. Respeito à privacidade em grupos de mensagens. Relatórios e investigação: Qualquer incidente pode ser relatado através de canais oficiais. Relatório anônimo permitido. Retaliação contra relatores de boa-fé proibida. Gestão com prazos indicativos e respeito à confidencialidade. Medidas possíveis: Advertência, remoção temporária ou permanente, restrições de acesso, comunicação às autoridades. Para ofensas graves: expulsão imediata e relatório."
      ],
    },
    {
      id: "educational-model",
      title: "Modelo Educacional",
      subtitle: "Aprendizagem comunitária",
      content: [
        "Esta política estabelece o modelo educacional do Circle Up Volunteers, baseado em princípios de aprendizagem comunitária, troca de conhecimentos e desenvolvimento de capacidades locais.",
        "Abordagem pedagógica: Aprendizagem prática e colaborativa onde os participantes constroem conhecimento através da experiência direta. \"Aprender fazendo\" é privilegiado sobre a transmissão passiva de informação.",
        "Estrutura de atividades: Oficinas de 1-2 horas com 70% de prática ativa, 20% de teoria aplicada e 10% de reflexão em grupo. Cada sessão deve produzir um resultado tangível que os participantes possam usar imediatamente.",
        "Critérios de qualidade: Conteúdos relevantes para a vida diária, metodologias participativas, ambiente inclusivo e respeitoso, e acompanhamento da aprendizagem através de feedback construtivo.",
        "Avaliação e melhoria: Sistema NPS (Net Promoter Score) para medir satisfação, pesquisas de acompanhamento para avaliar aplicação do conhecimento, e feedback contínuo para melhorar conteúdos e metodologias."
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
      const headerOffset = 120;
      const elementPosition = sectionRefs.current[index].getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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

      {/* Full Width Hero - Awwwards Style */}
      <section className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 lg:pb-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="max-w-[1800px] mx-auto">
          {/* Hero Particle Logo - Mobile (above title) */}
          <div className="lg:hidden h-[300px] sm:h-[350px] md:h-[400px] mb-12 md:mb-16">
            <HeroParticleLogo />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="relative z-20">
              <div className={`uppercase tracking-[0.25em] text-n-4 mb-6 md:mb-8 lg:mb-10 ${
              fontSize === 'small' 
                ? 'text-[clamp(0.5rem,0.8vw,0.65rem)]' 
                : fontSize === 'large'
                ? 'text-[clamp(0.65rem,1.1vw,0.875rem)]'
                : 'text-[clamp(0.55rem,0.95vw,0.75rem)]'
            } ${
                fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
              }`}>
                {articleMeta.heroLabel}
              </div>
              <h1 className={`leading-[0.9] font-bold text-n-1 mb-8 md:mb-12 lg:mb-16 tracking-tighter ${
                fontSize === 'small' 
                  ? 'text-[clamp(2.3rem,6.9vw,8.625rem)]' 
                  : fontSize === 'large'
                  ? 'text-[clamp(3.45rem,10.35vw,12.075rem)]'
                  : 'text-[clamp(2.875rem,8.625vw,10.35rem)]'
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
                  ? 'text-[clamp(0.55rem,0.85vw,0.75rem)]' 
                  : fontSize === 'large'
                  ? 'text-[clamp(0.7rem,1.1vw,1rem)]'
                  : 'text-[clamp(0.6rem,0.95vw,0.875rem)]'
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
            
            {/* Hero Particle Logo - Desktop (right side) */}
            <div className="hidden lg:block relative z-10">
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none scale-[1.4] lg:-translate-x-[20%]">
                {/* Background circles behind particles */}
                <div className="absolute inset-0 z-0">
                  <BackgroundCircles />
                </div>
                {/* Particles on top */}
                <div className="relative z-10">
                  <HeroParticleLogo />
                </div>
              </div>
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
                        ? 'text-[clamp(0.6rem,0.85vw,0.7rem)]' 
                        : fontSize === 'large'
                        ? 'text-[clamp(0.7rem,1.05vw,0.875rem)]'
                        : 'text-[clamp(0.65rem,0.95vw,0.75rem)]'
                    } ${
                      fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`transition-colors ${
                      fontSize === 'small' 
                        ? 'text-[clamp(1.125rem,2vw,1.5rem)]' 
                        : fontSize === 'large'
                        ? 'text-[clamp(1.5rem,3vw,2.25rem)]'
                        : 'text-[clamp(1.25rem,2.5vw,1.875rem)]'
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
                    ? 'text-[clamp(1rem,1.5vw,1.125rem)]' 
                    : fontSize === 'large'
                    ? 'text-[clamp(1.25rem,2vw,1.5rem)]'
                    : 'text-[clamp(1.125rem,1.75vw,1.25rem)]'
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
                          ? 'text-[clamp(0.5rem,0.8vw,0.65rem)]' 
                          : fontSize === 'large'
                          ? 'text-[clamp(0.65rem,1.1vw,0.875rem)]'
                          : 'text-[clamp(0.55rem,0.95vw,0.75rem)]'
                      } ${
                        fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
                      }`}>
                        {String(index + 1).padStart(2, '0')} — {section.subtitle}
                      </div>
                      <h2 className={`leading-[0.95] font-bold text-n-1 tracking-tighter mb-6 md:mb-8 ${
                        fontSize === 'small' 
                          ? 'text-[clamp(1.75rem,4.5vw,5rem)]' 
                          : fontSize === 'large'
                          ? 'text-[clamp(2.5rem,6.5vw,7rem)]'
                          : 'text-[clamp(2rem,5.5vw,6rem)]'
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
                              ? 'text-[clamp(1rem,1.5vw,1.25rem)]' 
                              : fontSize === 'large'
                              ? 'text-[clamp(1.375rem,2vw,1.625rem)]'
                              : 'text-[clamp(1.125rem,1.75vw,1.375rem)]'
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
                              ? 'text-[clamp(0.6rem,0.9vw,0.875rem)]' 
                              : fontSize === 'large'
                              ? 'text-[clamp(0.875rem,1.3vw,1.125rem)]'
                              : 'text-[clamp(0.75rem,1.1vw,1rem)]'
                          } ${
                            fontFamily === 'serif' ? 'font-serif font-light' : 'font-sans font-light'
                          }`}>{articleMeta.nextChapter}</span>
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

      <NeedHelp 
        title="¿Necesitas ayuda?"
        subtitle="¿Tienes dudas sobre nuestras políticas? Estamos aquí para ayudarte"
        cards={[
          {
            icon: "💬",
            title: "Únete a nuestra comunidad",
            description: "Conecta con otros miembros y resuelve dudas"
          },
          {
            icon: "📧",
            title: "Escríbenos",
            description: "",
            email: "hola@circleup.com.co"
          }
        ]}
      />

      <Footer />
    </div>
  );
};

export default PoliciesDocs;
