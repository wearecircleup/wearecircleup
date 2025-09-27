import { useState } from "react";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import NeedHelp from "../components/NeedHelp";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import RoadmapSection from "../components/RoadmapSection";
import CallToActionSection from "../components/CallToActionSection";

const HowToUseVolunteer = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Define tu rol",
      description: "Cuéntanos qué sabes y a quién quieres apoyar. Desde 2 h al mes. No necesitas ser docente.",
      image: "/wearecircleup/assets/circleimages/vol-sub-nav-1.png"
    },
    {
      id: 1,
      title: "Onboarding 90 min",
      description: "Metodología, plantillas y tips. Quedas listo para tu primera sesión.",
      image: "/wearecircleup/assets/circleimages/vol-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Primer taller acompañado",
      description: "Sesión práctica de 1–2 h con apoyo de un coordinador. Tú pones el conocimiento; nosotros la logística y la comunidad.",
      image: "/wearecircleup/assets/circleimages/vol-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Suma impacto",
      description: "Itera con feedback, propone nuevos temas y, si quieres, mentoriza a nuevos voluntarios.",
      image: "/wearecircleup/assets/circleimages/vol-sub-nav-4.png"
    }
  ];

  const volunteerJourney = [
    {
      date: "PASO 1",
      title: "Registro y Perfil",
      description: "Completa tu registro con tus habilidades, experiencia y disponibilidad. Define qué conocimientos quieres compartir con la comunidad.",
      completed: true
    },
    {
      date: "PASO 2", 
      title: "Capacitación Inicial",
      description: "Participa en nuestra sesión de onboarding donde aprenderás nuestra metodología de enseñanza comunitaria y herramientas digitales.",
      completed: true
    },
    {
      date: "PASO 3",
      title: "Primer Taller", 
      description: "Facilita tu primer taller con el apoyo de un coordinador experimentado. Recibirás retroalimentación para mejorar tu técnica.",
      completed: true
    },
    {
      date: "PASO 4",
      title: "Autonomía y Crecimiento", 
      description: "Desarrolla talleres independientes, mentoriza a otros voluntarios y contribuye al crecimiento del ecosistema educativo.",
      completed: false
    }
  ];

  const volunteerTestimonials = [
    {
      name: "Carlos Mendoza",
      role: "Voluntario Experto - Marketing",
      text: "Facilité talleres de marketing digital con 15–25 asistentes. Con las plantillas y el acompañamiento, preparé cada sesión en menos de 1 hora y los emprendedores salieron con su plan de contenidos listo.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ana Sofía Torres",
      role: "Coordinadora de Sede",
      text: "Activamos programación semanal en la biblioteca. Con la guía de Circle Up estructuramos la agenda y el registro; el espacio se usa más y llegan nuevos públicos.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Roberto Vásquez",
      role: "Voluntario - Finanzas Personales",
      text: "En 8 meses facilité 12 sesiones de finanzas personales. Los asistentes organizan su presupuesto y varios abrieron cuentas de ahorro por primera vez.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Lucía Ramírez",
      role: "Voluntaria - Habilidades Digitales",
      text: "Diseñé un taller de Excel básico para adultos mayores. Usando ejemplos cotidianos, la mayoría completó su primera hoja de gastos y practicó fórmulas simples.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Diego Herrera",
      role: "Mentor de Voluntarios",
      text: "Acompaño a nuevos voluntarios en su primer taller. Con el esquema de observación y retroalimentación, la curva de aprendizaje es corta y en dos sesiones ya facilitan con autonomía.",
      avatar: "/src/assets/benefits/image-2.png"
    }
  ];

  const volunteerFAQs = [
    {
      question: "¿Qué requisitos necesito para ser voluntario?",
      answer: "Necesitas experiencia profesional en el área que quieres enseñar, disponibilidad desde 2 horas mensuales y ganas de compartir conocimientos. No requieres experiencia previa como instructor: te capacitamos en metodología de enseñanza comunitaria."
    },
    {
      question: "¿Cómo funciona el proceso de capacitación?",
      answer: "Tras el registro, asistes a un onboarding de 90 minutos con metodología, herramientas y técnicas de facilitación. Tu primer taller lo haces acompañado por un coordinador experimentado."
    },
    {
      question: "¿Qué apoyo recibo como voluntario?",
      answer: "Capacitación inicial, plantillas y checklists, materiales didácticos, acceso a plataforma, acompañamiento de coordinadores, retroalimentación constante y constancia digital de voluntariado."
    },
    {
      question: "¿Puedo elegir mi horario y ubicación?",
      answer: "Sí, trabajamos con tu disponibilidad. Puedes elegir entre talleres presenciales en bibliotecas y espacios comunitarios, o talleres virtuales. Tú defines cuándo y dónde te sientes más cómodo enseñando."
    },
    {
      question: "¿Cómo mido el impacto de mis talleres?",
      answer: "Tienes un tablero simple con 3 señales: asistencia, práctica aplicada y retroalimentación. Recibes constancia digital y recomendaciones concretas para mejorar."
    }
  ];


  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        <HowItWorks 
          steps={steps}
          title="CÓMO FUNCIONA"
          buttonText="APLICAR COMO VOLUNTARIO"
          buttonAction={() => { window.location.href = 'mailto:voluntarios@circleup.org?subject=Quiero%20ser%20voluntario&body=Nombre%3A%0AExperiencia%3A%0ADisponibilidad%3A%0A'; }}
        />

        <RoadmapSection 
          quote="Facilita sesiones prácticas de 1–2 horas con plantillas y acompañamiento. Tú pones el conocimiento; nosotros la logística y la comunidad. Desde 2 horas al mes, sin experiencia previa como instructor."
          authorTitle="Circle Up Volunteer"
          authorRole="Coordinador Voluntarios"
          steps={volunteerJourney}
        />

        <FAQ 
          faqs={volunteerFAQs}
        />


        <CallToActionSection 
          title="Comparte tu experiencia con tu comunidad en"
          subtitle="Facilita sesiones prácticas de 1–2 horas con plantillas y acompañamiento. Tú pones el conocimiento; nosotros la logística y la comunidad."
          buttonText="APLICAR COMO VOLUNTARIO"
          buttonAction={() => { window.location.href = 'mailto:voluntarios@circleup.org?subject=Quiero%20ser%20voluntario&body=Nombre%3A%0AExperiencia%3A%0ADisponibilidad%3A%0A'; }}
        />

        <NeedHelp 
          title="¿Necesitas apoyo?"
          subtitle="Estamos aquí para acompañarte en tu journey como voluntario"
          cards={[
            {
              icon: "💬",
              title: "Únete a nuestra comunidad",
              description: "Conecta con otros voluntarios y coordinadores"
            },
            {
              icon: "📧",
              title: "Escríbenos",
              description: "",
              email: "voluntarios@circleup.org"
            }
          ]}
        />

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default HowToUseVolunteer;
