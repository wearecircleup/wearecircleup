import { useState } from "react";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import NeedHelp from "../components/NeedHelp";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import RoadmapSection from "../components/RoadmapSection";
import CallToActionSection from "../components/CallToActionSection";
import { curve } from "../assets";

const HowToUseBusiness = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Explora cómo apoyar",
      description: "Si eres un café, biblioteca, entidad pública o empresa, cuéntanos qué puedes ofrecer: espacio, insumos/materiales, mentorías técnicas o tiempo profesional.",
      image: "/assets/circleimages/aliado-sub-nav-1.png"
    },
    {
      id: 1,
      title: "Define tu aporte",
      description: "Acordamos duración, frecuencia y tipo de apoyo. En cafés: ticket de consumo simbólico o donación. En espacios públicos: horarios que aumenten su uso. En empresas: mentorías técnicas o materiales.",
      image: "/assets/circleimages/aliado-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Activamos sesiones",
      description: "Coordinamos comunidad y facilitación; tú aportas el recurso. Sesiones prácticas e intergeneracionales de 1–2 horas (CBL), formato sencillo y cercano, sin trámites pesados.",
      image: "/assets/circleimages/aliado-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Reconocimiento y continuidad",
      description: "Damos visibilidad en redes y web; contamos la historia y, si te gusta, repetimos o escalamos a otras sedes/temas para fortalecer la sostenibilidad del territorio.",
      image: "/assets/circleimages/aliado-sub-nav-4.png"
    }
  ];

  const partnershipSteps = [
    {
      date: "PASO 1",
      title: "Conversemos 15 minutos",
      description: "Alineamos tu aporte (espacios, insumos o mentorías técnicas) con necesidades del territorio y definimos un piloto simple.",
      completed: true
    },
    {
      date: "PASO 2", 
      title: "Define tu aporte",
      description: "En cafés: ticket simbólico (opcional) o donación; en espacios públicos: horarios de mayor uso; en empresas: mentorías técnicas o materiales.",
      completed: true
    },
    {
      date: "PASO 3",
      title: "Diseño CBL intergeneracional", 
      description: "Co-diseñamos una sesión práctica de 1–2 h con enfoque de aprendizaje comunitario (CBL) y aprendizaje a lo largo de la vida (Lifelong). Roles claros, sin trámites pesados.",
      completed: true
    },
    {
      date: "PASO 4",
      title: "Activación en tu espacio", 
      description: "Operamos la sesión en tu espacio. Tú aportas el recurso; nosotros llevamos a la comunidad y la facilitación.",
      completed: true
    },
    {
      date: "PASO 5",
      title: "Visibilidad y sostenibilidad", 
      description: "Publicamos tu apoyo en redes y en la web, documentamos la historia y definimos continuidad o réplica en otras sedes/temas.",
      completed: false
    }
  ];

  const partnerTestimonials = [
    {
      name: "Carmen Delgado",
      role: "Directora de RSE - Banco Nacional",
      text: "Aportamos horas de mentoría y materiales. Circle Up se encargó de la comunidad y la ejecución. Obtuvimos visibilidad en redes y web, y el equipo se sintió orgulloso de apoyar una causa local.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ricardo Morales",
      role: "CEO - TechSolutions",
      text: "Nuestros desarrolladores participaron como mentores. El proceso fue simple y la visibilidad del apoyo fue clara. Excelente para marca empleadora sin procesos pesados.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ana Lucia Vega",
      role: "Gerente de Talento Humano - Retail Corp",
      text: "Donamos insumos y tiempo profesional. Circle Up reconoce el apoyo públicamente y eso nos ayuda a contar nuestra historia de impacto real con la comunidad.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "José Manuel Torres",
      role: "Director de Sostenibilidad - Manufactura S.A.",
      text: "Usamos un salón en nuestra sede para activar sesiones abiertas. Vimos mayor uso del espacio y una relación más cercana con el barrio. La difusión fue muy valiosa.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Patricia Ruiz",
      role: "Coordinadora de Alianzas - Fundación Empresarial",
      text: "Aportamos materiales y mentores. La logística la llevó Circle Up y nosotros recibimos reconocimiento y contenidos para nuestras redes. Muy sencillo y efectivo.",
      avatar: "/src/assets/benefits/image-2.png"
    }
  ];

  const partnerFAQs = [
    {
      question: "¿Qué tipos de apoyo son útiles?",
      answer: "Espacios (cafés, bibliotecas, salones de empresas, espacios públicos), insumos/materiales (papelería, kits, refrigerios) y mentorías técnicas o tiempo profesional pro bono."
    },
    {
      question: "¿Qué recibe mi organización a cambio?",
      answer: "Visibilidad en nuestras redes y sitio web, historias de apoyo publicadas, y, según el caso, mayor uso del espacio (públicos) o más tráfico (cafeterías)."
    },
    {
      question: "¿Cómo funciona el ticket de consumo en cafés?",
      answer: "En cafeterías se acuerda un ticket de consumo simbólico para asistentes. Si el aliado lo prefiere, puede donarlo. Buscamos que no sea barrera de acceso."
    },
    {
      question: "¿Qué requisitos tiene un espacio público o biblioteca?",
      answer: "Capacidad para 15–20 personas, sillas/mesas básicas y horarios disponibles. El beneficio principal es aumentar su uso y cercanía con la comunidad."
    },
    {
      question: "¿Cuál es el compromiso de tiempo?",
      answer: "Flexible. Puedes apoyar una sola sesión o una serie corta. Nos adaptamos a tu disponibilidad y repetimos si la experiencia te gusta."
    }
  ];


  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        <HowItWorks 
          steps={steps}
          title="CÓMO FUNCIONA"
        />

        <RoadmapSection 
          quote="Somos una iniciativa de aprendizaje comunitario (CBL), intergeneracional y de aprendizaje a lo largo de la vida (Lifelong Learning), inicialmente financiada con recursos públicos y orientada a la sostenibilidad. Buscamos apoyos en especie: espacios, insumos/materiales y mentorías técnicas o tiempo profesional. A cambio, brindamos visibilidad en redes y en nuestra web, fortalecemos tu vínculo con la comunidad y aumentamos el uso de los espacios públicos o el tráfico en cafés."
          authorTitle="Circle Up Volunteer"
          authorRole="Director Proyecto"
          steps={partnershipSteps}
        />

        <FAQ 
          faqs={partnerFAQs}
        />


        <CallToActionSection 
          title="Activa aprendizaje comunitario en tu territorio con"
          subtitle="Activa aprendizaje intergeneracional y uso vivo de espacios: cafés con más vida, bibliotecas con programación útil y personas aprendiendo durante toda la vida."
          buttonText="CONVERTIRSE EN ALIADO"
          buttonAction={() => console.log("Iniciar alianza")}
        />

        <NeedHelp 
          title="¿Listo para ser aliado?"
          subtitle="Construyamos juntos un programa de impacto social sostenible"
          cards={[
            {
              icon: "💬",
              title: "Tipos de apoyo que buscamos",
              description: "Espacios, insumos/materiales y mentorías técnicas/tiempo profesional"
            },
            {
              icon: "📧",
              title: "Visibilidad y contacto",
              description: "Publicamos tu apoyo en redes y en nuestra web.",
              email: "hola@circleup.com.co"
            }
          ]}
        />

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default HowToUseBusiness;
