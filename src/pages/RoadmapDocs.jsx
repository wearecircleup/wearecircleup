import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";

// Help Carousel Component
const HelpCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/wearecircleup/assets/circleimages/help-carrusel-1.png",
    "/wearecircleup/assets/circleimages/help-carrusel-2.png",
    "/wearecircleup/assets/circleimages/help-carrusel-3.png",
    "/wearecircleup/assets/circleimages/help-carrusel-4.png",
    "/wearecircleup/assets/circleimages/help-carrusel-5.png",
    "/wearecircleup/assets/circleimages/help-carrusel-6.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Help carousel ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

const RoadmapDocs = ({ setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [expandedGroup, setExpandedGroup] = useState("getting-started");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sectionRefs = useRef({});

  const navigationGroups = [
    {
      id: "getting-started",
      title: "Primeros pasos",
      items: [
        { id: "introduction", title: "Nuestra propuesta" },
        { id: "how-it-works", title: "Cómo funciona" },
        { id: "stakeholders", title: "Participantes del ecosistema" },
      ],
    },
    {
      id: "for-allies",
      title: "Aliados",
      items: [
        { id: "space-requirements", title: "Requisitos de espacios" },
        { id: "mou-process", title: "Proceso de alianza" },
        { id: "partnership-benefits", title: "Beneficios de colaborar" },
      ],
    },
    {
      id: "for-volunteers",
      title: "Voluntarios",
      items: [
        { id: "volunteer-onboarding", title: "Cómo empezar" },
        { id: "course-creation", title: "Proponer un taller" },
        { id: "volunteer-growth", title: "Seguir participando" },
      ],
    },
    {
      id: "for-participants",
      title: "Participantes",
      items: [
        { id: "how-to-join", title: "Cómo participar" },
        { id: "course-catalog", title: "Tipos de talleres" },
        { id: "certificates", title: "Certificados" },
      ],
    },
    {
      id: "operations-quality",
      title: "Operaciones y Calidad",
      items: [
        { id: "educational-approach", title: "Nuestro enfoque educativo" },
        { id: "quality-control", title: "Control de calidad" },
        { id: "workshop-execution", title: "Cómo funcionan los talleres" },
      ],
    },
    {
      id: "tools-support",
      title: "Herramientas y Soporte",
      items: [
        { id: "available-tools", title: "Herramientas disponibles" },
        { id: "technical-support", title: "Soporte técnico" },
      ],
    },
  ];

  const sections = [
    {
      id: "introduction",
      title: "Nuestra propuesta",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Somos una comunidad donde jóvenes y adultos aprenden juntos. Creamos espacios de aprendizaje en bibliotecas, colegios, cafés y otros lugares de la ciudad. La idea es simple: personas que saben algo lo comparten con quienes quieren aprender.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            Funciona así: si sabes cocinar, programar, hablar en público, manejar dinero o cualquier habilidad, puedes enseñarla. Si quieres aprender algo nuevo, puedes venir a nuestras sesiones. Todo es gratuito y abierto para la comunidad.
          </p>

          <p className="text-sm text-n-4 mb-5">
            ¿Por qué lo hacemos? Porque creemos que todos tenemos algo que enseñar y algo que aprender. Cuando compartimos conocimiento, toda la comunidad se fortalece. Los jóvenes encuentran nuevas oportunidades, los adultos comparten su experiencia, y los espacios locales se vuelven más activos.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            Nuestro objetivo es crear una red donde el aprendizaje sea contagioso. Mientras más personas participen, más temas podemos ofrecer, más horarios tenemos disponibles, y más oportunidades creamos para todos. Es un círculo positivo que beneficia a toda la comunidad.
          </p>
        </>
      ),
    },
    {
      id: "how-it-works",
      title: "Cómo funciona",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Nuestra comunidad funciona de manera sencilla. Hay tres grupos de personas que hacen posible todo esto: quienes quieren aprender, quienes quieren enseñar, y quienes nos prestan espacios para reunirnos.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Si quieres aprender algo:</strong> Miras qué talleres hay disponibles, te inscribes en el que te interese, y vienes el día acordado. Las sesiones duran entre 1 y 2 horas. Al final, te damos un certificado de participación y te contamos sobre otros talleres que te pueden interesar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Si quieres enseñar algo:</strong> Nos cuentas qué sabes hacer y qué te gustaría compartir. Te ayudamos a organizar tu taller y te damos materiales básicos. No necesitas ser un experto, solo tener ganas de compartir lo que sabes. Te acompañamos en todo el proceso.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Si tienes un espacio:</strong> Puede ser una biblioteca, un café, un salón comunal, o cualquier lugar donde se puedan reunir unas 15-20 personas. Nos ayudas prestando el lugar y nosotros nos encargamos de organizar las actividades y cuidar que todo salga bien.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            Todo se coordina de manera simple. Usamos EventBrite para comunicarnos, confirmamos asistencia un día antes de cada taller, y siempre pedimos opiniones para mejorar. La idea es que sea fácil participar y que todos se sientan cómodos.
          </p>
        </>
      ),
    },
    {
      id: "stakeholders",
      title: "Participantes del ecosistema",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Nuestra comunidad está formada por tres tipos de personas, y cada una aporta algo diferente pero igualmente importante.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Los que prestan espacios:</strong> Son bibliotecas, colegios, cafés, centros comunitarios, empresas, o cualquier lugar donde nos podamos reunir. Ellos nos dan el lugar físico donde hacer los talleres. A cambio, sus espacios se vuelven más activos y conocidos en la comunidad.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Los que enseñan:</strong> Pueden ser profesionales, estudiantes universitarios, emprendedores, jubilados, o cualquier persona que sepa hacer algo útil y quiera compartirlo. No importa si tienes título universitario o no, lo importante es que tengas conocimiento práctico y ganas de ayudar a otros. Puedes enseñar desde cómo hacer un currículum hasta cómo cocinar, desde matemáticas básicas hasta manejo de redes sociales.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Los que aprenden:</strong> Jóvenes, adultos, estudiantes, trabajadores, madres de familia, emprendedores, jubilados... cualquier persona que quiera aprender algo nuevo. No hay límite de edad ni se necesita experiencia previa. Solo ganas de aprender y participar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            Lo bonito es que una misma persona puede ser las tres cosas: puedes aprender en un taller, enseñar en otro, y hasta ayudar a conseguir espacios. La comunidad crece cuando todos participamos de diferentes maneras.
          </p>
        </>
      ),
    },
    {
      id: "space-requirements",
      title: "Requisitos de espacios",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Si tienes un espacio y quieres que hagamos talleres ahí, estos son los requisitos básicos que necesitamos. No son muchos, pero sí importantes para que todo salga bien.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Lo básico del lugar:</strong> Necesitamos espacio para que se sienten cómodamente entre 15 y 20 personas. Debe tener buena luz para leer y escribir, y estar bien ventilado. También es importante que haya baños cerca y que el lugar sea seguro, con salidas claras en caso de emergencia.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Tecnología:</strong> Si hay internet, perfecto, pero no es obligatorio. Sí necesitamos enchufes para conectar equipos. Si hay una pantalla o televisor, genial, pero también podemos trabajar con una pared blanca donde proyectar. Para grupos grandes, un micrófono ayuda, pero no es indispensable.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Disponibilidad:</strong> Los talleres suelen ser en tardes entre semana o fines de semana. Necesitamos que alguien del lugar esté presente durante las actividades. También es importante que el espacio sea flexible para diferentes tipos de talleres: desde charlas hasta actividades más dinámicas.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Compromiso:</strong> Idealmente, buscamos espacios que puedan trabajar con nosotros por al menos 3 meses, para poder planificar una serie de talleres y crear continuidad en la comunidad.
          </p>
        </>
      ),
    },
    {
      id: "volunteer-onboarding",
      title: "Cómo empezar",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Si quieres enseñar algo en nuestra comunidad, el proceso es muy sencillo. No necesitas experiencia previa como instructor ni llenar formularios complicados. Solo necesitas saber hacer algo útil y tener ganas de compartirlo con otros.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Primer paso - Conoce la comunidad:</strong> Te damos una introducción rápida sobre cómo funcionamos. Esto toma entre 30 y 45 minutos y lo puedes hacer a tu ritmo. Te explicamos nuestros valores, cómo cuidamos la seguridad de todos, y te damos acceso a materiales que te pueden ayudar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Segundo paso - Encuentra tu compañero:</strong> Si quieres, te conectamos con alguien que ya tiene experiencia enseñando en la comunidad. Esta persona puede acompañarte en tu primera experiencia, responder tus preguntas, y darte consejos prácticos. Esto es opcional, pero muchos lo encuentran muy útil.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Tercer paso - Empieza gradualmente:</strong> No tienes que empezar enseñando un taller completo. Puedes comenzar observando cómo otros lo hacen, luego ayudar en un taller, y después liderar tu propio taller cuando te sientas listo. Cada persona va a su ritmo.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            Todo el proceso está diseñado para que sea fácil y sin presión. Nosotros nos encargamos de los aspectos técnicos como conseguir el lugar, hacer la publicidad, y manejar las inscripciones. Tú solo te enfocas en compartir tu conocimiento de la mejor manera posible.
          </p>
        </>
      ),
    },
    {
      id: "course-creation",
      title: "Proponer un taller",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Proponer un taller es muy fácil. No necesitas crear materiales desde cero ni hacer presentaciones complicadas. Te ayudamos en todo el proceso para que puedas enfocarte en lo que mejor sabes hacer.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Qué necesitas definir?</strong> Solo tres cosas básicas: qué van a aprender las personas (1-3 cosas específicas), qué van a hacer durante el taller (la actividad principal), y qué se van a llevar al final (algo concreto que puedan usar después). Por ejemplo, si enseñas a hacer currículum, las personas aprenderán a estructurar su experiencia, durante el taller crearán su propio currículum, y se llevarán un documento listo para usar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Cuánto tiempo toma?</strong> Los talleres suelen durar entre 1 y 2 horas. La mayor parte del tiempo (como el 70%) debe ser práctica - que las personas hagan cosas, no solo escuchen. Al final, cada persona debe tener algo concreto que mostrar o llevarse.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Qué pasa después de proponer?</strong> Alguien de nuestro equipo revisa tu propuesta en máximo 2 días. Si necesita ajustes, te ayudamos a mejorarla. Una vez aprobada, programamos el taller y nos encargamos de toda la logística. Tú solo vienes el día acordado y compartes tu conocimiento.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            Recuerda que tenemos una biblioteca de materiales que puedes usar y adaptar. No tienes que inventar todo desde cero. La idea es que sea fácil para ti y útil para quienes participen.
          </p>
        </>
      ),
    },
    {
      id: "volunteer-growth",
      title: "Seguir participando",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Una vez que hayas dado tu primer taller, hay muchas maneras de seguir participando en la comunidad. La idea es que puedas contribuir de la forma que más te guste y según el tiempo que tengas disponible.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Diferentes formas de participar:</strong> Puedes dar más talleres sobre el mismo tema o sobre cosas nuevas, ayudar a otros voluntarios nuevos como mentor, colaborar en la mejora de materiales, o incluso ayudar a conseguir nuevos espacios para los talleres. Cada contribución es valiosa, sin importar cuánto tiempo puedas dedicar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Crecimiento personal:</strong> Mientras participas, también puedes aprender cosas nuevas. Otros voluntarios pueden enseñarte habilidades que no tienes, puedes mejorar tus habilidades de enseñanza, y hacer conexiones valiosas en la comunidad. Muchos voluntarios dicen que aprenden tanto como enseñan.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Flexibilidad total:</strong> Puedes participar cuando quieras y como quieras. Si necesitas tomar un descanso, no hay problema. Si quieres cambiar el tipo de talleres que das, perfecto. Si solo puedes participar una vez al mes, está bien. La comunidad se adapta a tu ritmo de vida.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Reconocimiento:</strong> Valoramos mucho tu contribución. Compartimos historias de éxito, reconocemos públicamente a los voluntarios, y creamos oportunidades para que puedas crecer profesional y personalmente. Tu participación hace una diferencia real en la comunidad.
          </p>
        </>
      ),
    },
    {
      id: "mou-process",
      title: "Proceso de alianza",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Si representas una organización, empresa, biblioteca, colegio o cualquier espacio que quiera ser nuestro aliado, el proceso es directo y profesional. Valoramos mucho las alianzas porque nos permiten llegar a más personas y crear mayor impacto en la comunidad.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Primer contacto:</strong> Nos reunimos para conocernos y entender qué busca cada parte. Hablamos sobre sus objetivos, nuestras necesidades, y cómo podemos trabajar juntos de manera que beneficie a ambos. Esta conversación inicial nos ayuda a ver si somos una buena pareja para colaborar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Carta de intención:</strong> Si decidimos trabajar juntos, firmamos una carta de intención. Este documento establece los compromisos básicos de cada parte: qué van a aportar ustedes (espacio, recursos, difusión) y qué vamos a aportar nosotros (talleres, coordinación, materiales). Es un acuerdo inicial que nos permite empezar a trabajar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Acuerdo formal:</strong> Después de trabajar juntos por un tiempo y ver que la alianza funciona bien, formalizamos la relación con un memorando de entendimiento. Este documento detalla los términos de la colaboración, las responsabilidades de cada parte, y cómo vamos a medir el éxito de la alianza.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Seguimiento continuo:</strong> Mantenemos comunicación regular para asegurar que la alianza esté funcionando bien para todos. Revisamos resultados, ajustamos lo que sea necesario, y buscamos nuevas oportunidades de colaboración. La idea es construir una relación a largo plazo que beneficie a toda la comunidad.
          </p>
        </>
      ),
    },
    {
      id: "partnership-benefits",
      title: "Beneficios de colaborar",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Ser nuestro aliado trae beneficios concretos para su organización y para la comunidad. Hemos visto cómo las alianzas exitosas crean valor para todos los involucrados.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Para espacios físicos:</strong> Sus instalaciones se vuelven más activas y conocidas en la comunidad. Atraen nuevos visitantes que pueden convertirse en clientes regulares. Su marca se asocia con educación y desarrollo comunitario, lo que mejora su reputación. Además, sus empleados pueden participar en los talleres y desarrollar nuevas habilidades.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Para empresas:</strong> Sus empleados acceden a capacitación gratuita en habilidades útiles. La empresa se posiciona como socialmente responsable y comprometida con el desarrollo local. Pueden identificar talento local para futuras contrataciones. También es una excelente oportunidad de networking con otros aliados y la comunidad.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Para instituciones educativas:</strong> Complementan su oferta académica con talleres prácticos. Sus estudiantes acceden a conocimiento de profesionales activos. Fortalecen su conexión con la comunidad local. Pueden identificar oportunidades de colaboración académica y proyectos conjuntos.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Beneficios operativos:</strong> Nosotros manejamos toda la logística, promoción y coordinación. Ustedes solo proporcionan el espacio y apoyo básico. Reciben reportes regulares sobre el impacto de las actividades. Pueden usar estos resultados para sus propios reportes de responsabilidad social o impacto comunitario.
          </p>
        </>
      ),
    },
    {
      id: "educational-approach",
      title: "Nuestro enfoque educativo",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Nuestro enfoque educativo se basa en principios simples pero efectivos que han demostrado funcionar en comunidades como la nuestra. La idea central es que el aprendizaje debe ser práctico, útil, y respetuoso con el tiempo de las personas.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Aprender haciendo:</strong> En nuestros talleres, las personas pasan la mayor parte del tiempo practicando, no solo escuchando. Creemos que se aprende mejor cuando se hace, no cuando se memoriza teoría. Por eso, al menos el 70% del tiempo de cada taller es práctica activa donde los participantes crean, resuelven, o practican algo concreto.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Resultados visibles:</strong> Cada taller debe producir algo tangible que los participantes se puedan llevar: un documento, un plan, una habilidad demostrable, o una solución a un problema real. No hacemos talleres solo para "conocer sobre" algo, sino para "saber hacer" algo específico y útil.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Ambiente de respeto:</strong> Creamos espacios donde todos se sienten cómodos para participar, hacer preguntas, y cometer errores. Promovemos la crítica constructiva: comentarios que sean amables, específicos, y útiles para mejorar. No permitimos burlas, discriminación, o actitudes que hagan sentir mal a otros.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Continuidad del aprendizaje:</strong> Al final de cada taller, siempre damos un siguiente paso claro: otro taller relacionado, recursos para seguir aprendiendo, o un pequeño reto para practicar lo aprendido. La idea es que el aprendizaje no se detenga cuando termina el taller.
          </p>
        </>
      ),
    },
    {
      id: "quality-control",
      title: "Control de calidad",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Mantenemos estándares de calidad para asegurar que todos los talleres sean útiles y bien organizados. El proceso es simple y rápido, diseñado para ayudar, no para complicar las cosas.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Qué revisamos?</strong> Verificamos que el taller tenga objetivos claros (qué van a aprender las personas), que la mayor parte del tiempo sea práctica, que los participantes se lleven algo concreto, y que haya un siguiente paso para seguir aprendiendo. También nos aseguramos de que el contenido sea apropiado y seguro para todos.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Cómo funciona?</strong> Cuando propones un taller, alguien de nuestro equipo lo revisa en máximo 2 días. Si está listo, lo aprobamos inmediatamente. Si necesita ajustes, te damos comentarios específicos y útiles para mejorarlo. Normalmente solo se necesita una ronda de ajustes, y siempre te ayudamos en el proceso.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Comentarios constructivos:</strong> Si hay algo que mejorar, te lo decimos de manera amable y específica. No hacemos críticas personales, solo sugerencias sobre el contenido del taller. El objetivo es que el taller sea lo mejor posible para quienes van a participar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Apoyo continuo:</strong> Si tienes dudas durante el proceso de revisión, puedes preguntarnos. Si necesitas ayuda para hacer ajustes, te apoyamos. La idea es que te sientas acompañado, no evaluado. Queremos que tengas éxito.
          </p>
        </>
      ),
    },
    {
      id: "workshop-execution",
      title: "Cómo funcionan los talleres",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Los talleres siguen una estructura simple que ha demostrado funcionar bien. Esto ayuda tanto a quien enseña como a quienes participan a saber qué esperar y aprovechar mejor el tiempo.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Inicio (5-10 minutos):</strong> Recibimos a las personas, nos presentamos, explicamos qué vamos a hacer y establecemos algunas reglas básicas de respeto y participación. Es importante que todos se sientan bienvenidos y sepan qué esperar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Práctica principal (60-90 minutos):</strong> Esta es la parte más importante. Las personas trabajan activamente: crean algo, resuelven problemas, practican habilidades. El instructor guía y apoya, pero los participantes son quienes hacen el trabajo. Al final de esta parte, cada persona debe tener algo concreto que mostrar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Compartir y mejorar (10-20 minutos):</strong> Los participantes muestran lo que hicieron, hacen preguntas, y reciben comentarios útiles de otros y del instructor. Es un momento para celebrar lo logrado y aprender de las experiencias de todos.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Cierre (5-10 minutos):</strong> Resumimos lo aprendido, damos el siguiente paso para seguir practicando, y pedimos opiniones sobre cómo mejorar. También entregamos certificados de participación y información sobre otros talleres que pueden interesar.
          </p>
        </>
      ),
    },
    {
      id: "available-tools",
      title: "Herramientas disponibles",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Ponemos a tu disposición herramientas y recursos para que puedas enfocar tu tiempo en enseñar, no en tareas técnicas o administrativas. Nuestro objetivo es hacer tu experiencia como voluntario lo más fácil posible.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Biblioteca de materiales:</strong> Tenemos una colección de plantillas, ejemplos, y materiales que puedes usar y adaptar para tu taller. No necesitas crear todo desde cero. Puedes tomar lo que te sirva y personalizarlo según tu estilo y necesidades.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Herramientas técnicas:</strong> Te damos acceso a las herramientas que necesites: plataformas para crear presentaciones, sistemas para generar certificados automáticamente, herramientas para grabar audio si es necesario. Todo está configurado y listo para usar.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Soporte administrativo:</strong> Nosotros manejamos las inscripciones, recordatorios, confirmaciones de asistencia, y seguimiento posterior. Tú solo te presentas el día del taller y compartes tu conocimiento. Al final, generamos automáticamente los certificados y materiales de seguimiento.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Acceso rápido:</strong> Una vez que confirmes tu participación, te damos acceso a todas las herramientas en menos de 24 horas. Si tienes problemas técnicos, los resolvemos en máximo 2 días. La idea es que nunca te quedes bloqueado por temas técnicos.
          </p>
        </>
      ),
    },
    {
      id: "how-to-join",
      title: "Cómo participar",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Participar en nuestros talleres es muy fácil y no cuesta nada. Solo necesitas ganas de aprender algo nuevo y un poco de tiempo libre.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Encuentra talleres:</strong> Publicamos los talleres disponibles en nuestras redes sociales y plataformas como EventBrite. Ahí puedes ver qué temas están disponibles, cuándo y dónde son, y qué vas a aprender en cada uno. Escoge el que más te interese.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Inscríbete:</strong> Una vez que encuentres un taller que te guste, solo tienes que inscribirte. Es gratis y toma menos de un minuto. Te pedimos información básica como tu nombre y contacto para poder confirmarte los detalles.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Confirma tu asistencia:</strong> Un día antes del taller, te enviamos un recordatorio para confirmar si vas a asistir. Esto nos ayuda a preparar el espacio y los materiales correctamente. Si no puedes ir, no hay problema, solo avísanos para darle el cupo a otra persona.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Participa activamente:</strong> El día del taller, llega puntual y con ganas de participar. Los talleres son prácticos, así que vas a estar haciendo cosas, no solo escuchando. Al final, te llevas algo concreto que puedes usar en tu vida diaria.
          </p>
        </>
      ),
    },
    {
      id: "course-catalog",
      title: "Tipos de talleres",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Ofrecemos talleres sobre temas útiles para la vida diaria y el desarrollo personal y profesional. Los temas varían según los voluntarios disponibles y las necesidades de la comunidad.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Habilidades para el trabajo:</strong> Talleres sobre cómo hacer un buen currículum, prepararse para entrevistas de trabajo, usar programas de computadora básicos, manejar redes sociales profesionalmente, o desarrollar habilidades de comunicación y liderazgo.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Vida práctica:</strong> Talleres sobre manejo de dinero personal, cocina básica y nutritiva, huerta casera, reparaciones menores en el hogar, o cómo usar aplicaciones útiles en el teléfono.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Desarrollo personal:</strong> Talleres sobre hablar en público, manejar el estrés, organizar el tiempo, establecer metas personales, o desarrollar la creatividad.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Tecnología básica:</strong> Talleres sobre usar internet de manera segura, crear contenido digital básico, usar herramientas de productividad, o entender conceptos tecnológicos importantes.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            Los talleres cambian regularmente porque dependen de qué voluntarios están disponibles y qué necesidades identificamos en la comunidad. Siempre estamos buscando nuevos temas que sean útiles para las personas.
          </p>
        </>
      ),
    },
    {
      id: "certificates",
      title: "Certificados",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Al completar cada taller, recibes un certificado de participación que puedes usar para demostrar que adquiriste nuevas habilidades.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Qué incluye el certificado?</strong> Tu nombre, el tema del taller, las habilidades que desarrollaste, la fecha de participación, y las horas de duración. También incluye información sobre nuestra organización y los instructores que dirigieron el taller.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Cómo lo recibes?</strong> El certificado se genera automáticamente después del taller y te llega por correo electrónico. No tienes que hacer nada especial, solo participar activamente en el taller completo.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>¿Para qué sirve?</strong> Puedes incluir estos certificados en tu currículum, mostrarlos en entrevistas de trabajo, o usarlos para demostrar tu compromiso con el aprendizaje continuo. Muchas empresas valoran que las personas busquen capacitarse por su cuenta.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Certificados especiales:</strong> Si participas en varios talleres relacionados, puedes recibir certificados de trayectoria que muestran tu desarrollo en un área específica. Por ejemplo, si tomas varios talleres sobre habilidades digitales, puedes recibir un certificado que reconozca tu competencia digital básica.
          </p>
        </>
      ),
    },
    {
      id: "technical-support",
      title: "Soporte técnico",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Si tienes problemas técnicos o necesitas ayuda con algún aspecto de tu participación, estamos aquí para apoyarte. Nuestro objetivo es que nunca te quedes sin poder participar por temas técnicos.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Problemas con inscripciones:</strong> Si no puedes inscribirte en un taller, tienes problemas con la plataforma, o no recibes confirmaciones, contáctanos inmediatamente. Resolvemos estos problemas en menos de 24 horas.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Acceso a materiales:</strong> Si no puedes acceder a materiales del taller, no recibes tu certificado, o tienes problemas para descargar recursos, te ayudamos a solucionarlo rápidamente.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Talleres virtuales:</strong> Si un taller es virtual y tienes problemas de conexión, no sabes usar la plataforma, o necesitas ayuda técnica durante la sesión, tenemos personal disponible para apoyarte.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Cómo contactarnos:</strong> Puedes escribirnos por WhatsApp, correo electrónico, o redes sociales. Siempre respondemos rápido y te ayudamos hasta resolver completamente tu problema. No dejes que un problema técnico te impida aprender.
          </p>
        </>
      ),
    },
  ];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsSidebarOpen(false);
  };

  const toggleGroup = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        <div className="flex min-h-screen bg-n-8">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-20 left-4 z-50 lg:hidden w-10 h-10 bg-n-7 border border-n-6 rounded-lg flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Sidebar */}
          <div className={`fixed lg:sticky top-[4.75rem] lg:top-[5.25rem] left-0 h-[calc(100vh-4.75rem)] lg:h-[calc(100vh-5.25rem)] w-80 bg-n-8 border-r border-n-6 overflow-hidden z-40 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="h4 text-n-1 mb-6">Documentación</h2>
              
              <nav className="space-y-1">
                {navigationGroups.map((group) => (
                  <div key={group.id} className="border-b border-n-6 last:border-b-0 pb-2 last:pb-0">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-center justify-between w-full text-left py-2 text-n-1 hover:text-color-1 transition-colors"
                    >
                      <span className="font-semibold text-sm uppercase tracking-wider">{group.title}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${expandedGroup === group.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedGroup === group.id && group.items.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left py-2 px-4 text-sm rounded transition-colors ${
                              activeSection === item.id
                                ? 'bg-color-1/10 text-color-1 border-l-2 border-color-1'
                                : 'text-n-4 hover:text-n-1 hover:bg-n-7'
                            }`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 lg:ml-0">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="mb-12 scroll-mt-24"
                  id={section.id}
                >
                  <div className="max-w-4xl">
                    <h1 className="text-xl font-medium text-n-1 mb-4">{section.title}</h1>
                    <div className="text-sm font-light leading-relaxed text-n-3 space-y-4">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Need help Section - Full width outside main content */}
        <div className="w-full bg-n-8 border-t border-n-6">
          <Section className="overflow-hidden">
            {/* Background grid only on left side */}
            <div className="absolute top-0 left-0 w-1/2 h-full opacity-40 z-0">
              <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
            </div>
            
            <div className="container relative z-2">
              <div className="relative z-1 grid gap-10 lg:grid-cols-2 items-center">
                <div className="relative flex justify-center lg:justify-start">
                  <div className="relative">
                    {/* 3D Stacked boxes effect - spread out card deck */}
                    <div className="relative">
                      {/* Third card (back of deck) */}
                      <div className="absolute top-8 left-12 w-[28rem] h-[28rem] bg-n-6/15 rounded-2xl transform rotate-12 shadow-lg"></div>
                      {/* Second card (middle of deck) */}
                      <div className="absolute top-5 left-8 w-[28rem] h-[28rem] bg-n-6/25 rounded-2xl transform rotate-6 shadow-lg"></div>
                      {/* First card (almost top of deck) */}
                      <div className="absolute top-2 left-4 w-[28rem] h-[28rem] bg-n-6/35 rounded-2xl transform rotate-3 shadow-lg"></div>
                      {/* Front card with carousel images (top of deck) */}
                      <div className="relative w-[28rem] h-[28rem] bg-n-8 rounded-2xl overflow-hidden shadow-2xl">
                        <HelpCarousel />
                        {/* Subtle overlay for better contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-n-8/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
                  
                
                {/* Voice input indicator */}
                <div className="absolute bottom-0 left-0 flex items-center bg-n-7 rounded-full px-4 py-2 border border-n-6">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">?</span>
                  </div>
                  <span className="text-n-3 text-sm">Ask anything</span>
                  <div className="ml-4 flex space-x-1">
                    <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <h1 className="h1 mb-6">Need help?</h1>
                  <p className="body-1 mb-8 text-n-4">
                    Can't find your answer, contact us
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center p-6 bg-n-7 rounded-xl border border-n-6">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">💬</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-n-1 mb-1">Join our community</h3>
                        <p className="text-n-4">Discuss anything with other users</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-6 bg-n-7 rounded-xl border border-n-6">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white text-xl">📧</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-n-1 mb-1">Email us</h3>
                        <p className="text-color-1">hello@brainwave.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default RoadmapDocs;