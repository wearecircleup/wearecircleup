import { useState } from "react";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import NeedHelp from "../components/NeedHelp";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import RoadmapSection from "../components/RoadmapSection";
import CallToActionSection from "../components/CallToActionSection";

const HowToUseParticipant = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Encuentra tu taller",
      description: "Explora temas útiles cerca de ti: habilidades para el trabajo, vida práctica y desarrollo personal. Todos los talleres son gratuitos y abiertos.",
      image: "/assets/circleimages/par-sub-nav-1.png"
    },
    {
      id: 1,
      title: "Inscríbete en 1 minuto",
      description: "Reserva tu cupo con un formulario corto y recibe recordatorios. Si el taller es en café con ticket simbólico, te lo contamos antes para que decidas.",
      image: "/assets/circleimages/par-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Participa y crea algo",
      description: "Sesiones prácticas de 1–2 horas donde haces, no solo escuchas. Te llevas algo concreto: un documento, un plan o una habilidad demostrable.",
      image: "/assets/circleimages/par-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Sigue aprendiendo",
      description: "Recibe recursos, certificado digital y opciones para continuar. Si te animas, también puedes enseñar lo que sabes en el futuro.",
      image: "/assets/circleimages/par-sub-nav-4.png"
    }
  ];

  const participationSteps = [
    {
      date: "PASO 1",
      title: "Registro en 1 minuto",
      description: "Sin costo ni requisitos. Completa tu perfil y recibe el calendario por WhatsApp o email.",
      completed: true
    },
    {
      date: "PASO 2", 
      title: "Reserva tu cupo",
      description: "Confirma con un clic. Si el taller es en café con ticket simbólico, te lo avisamos antes para que decidas.",
      completed: true
    },
    {
      date: "PASO 3",
      title: "Taller práctico 1–2 h", 
      description: "Haces algo concreto: CV, plan de presupuesto, portafolio o proyecto. Formato cercano e intergeneracional.",
      completed: true
    },
    {
      date: "PASO 4",
      title: "Certificado y siguientes pasos", 
      description: "Recibes certificado digital y recursos para continuar. Puedes volver a otros talleres o compartir lo aprendido.",
      completed: false
    }
  ];

  const participantTestimonials = [
    {
      name: "María González",
      role: "Madre de familia - Bogotá",
      text: "En 4 semanas reduje mis gastos 12% y abrí un ahorro programado. El formato paso a paso me ordenó.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Carlos Ramírez",
      role: "Emprendedor - Medellín",
      text: "Con el plan de negocio, formalicé y contraté a 3 personas. Usé las plantillas para costos y precios.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ana Sofía Herrera",
      role: "Estudiante universitaria - Cali",
      text: "Aprendí HTML/CSS básico y armé mi portafolio; ya hago trabajos freelance mientras estudio.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Pedro Martínez",
      role: "Trabajador independiente - Barranquilla",
      text: "Mejoré mi comunicación y conseguí un mejor contrato; ahora lidero un equipo de 8.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Lucía Vargas",
      role: "Ama de casa - Bucaramanga",
      text: "Volví a creer en mí. Hoy enseño repostería en mi barrio y vendo por encargo desde casa.",
      avatar: "/src/assets/benefits/image-2.png"
    }
  ];

  const participantFAQs = [
    {
      question: "¿Los talleres son completamente gratuitos?",
      answer: "Sí, 100% gratuitos. En cafés puede existir un ticket simbólico opcional; siempre te lo informamos antes."
    },
    {
      question: "¿Qué requisitos necesito para participar?",
      answer: "Ninguno. Solo ganas de aprender. No importa tu edad o nivel educativo: los talleres son accesibles y prácticos."
    },
    {
      question: "¿Cómo me inscribo a los talleres?",
      answer: "En 1 minuto: formulario corto desde la agenda. También puedes inscribirte en puntos comunitarios o por WhatsApp."
    },
    {
      question: "¿Recibo algún certificado al completar los talleres?",
      answer: "Sí, certificado digital por taller que puedes anexar a tu hoja de vida o LinkedIn."
    },
    {
      question: "¿Qué pasa si no puedo asistir a todas las sesiones?",
      answer: "Hay horarios flexibles y material de apoyo. Puedes reprogramar y retomar cuando puedas."
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
          quote="Talleres prácticos de 1–2 horas. Temas útiles para tu trabajo y vida. Sin requisitos. Inscripción en 1 minuto, certificado digital y flexibilidad para retomar cuando puedas."
          authorTitle="Circle Up Volunteer"
          authorRole="Coordinador Proyecto"
          steps={participationSteps}
        />

        {/* Community Testimonials Section */}
        {/* <Section className="overflow-hidden relative"> */}
          {/* Background elements */}
          {/* <div className="absolute inset-0 opacity-2">
            <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-full opacity-6">
            <img src="/src/assets/gradient.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container relative z-2">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-n-7 rounded text-xs font-code font-bold tracking-wider uppercase text-n-4 mb-4">
                [ HISTORIAS DE ÉXITO ]
              </div>
              <h2 className="h2">Lo que dicen nuestros participantes</h2>
            </div>
            
            <div className="max-w-[70%] mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                {participantTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-n-7 rounded-lg border border-n-6 break-inside-avoid mb-5 flex flex-col">
                  <div className="p-5 flex-1">
                    <p className="text-sm text-n-1 font-mono leading-relaxed">{testimonial.text}</p>
                  </div>
                  <div className="bg-n-8 rounded-b-lg p-3 border-t border-n-6">
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="text-n-1 font-semibold text-xs">{testimonial.name}</h4>
                        <p className="text-n-4 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </Section> */}

        <FAQ 
          faqs={participantFAQs}
        />


        <CallToActionSection 
          title="Aprende haciendo, gratis y cerca de ti con"
          subtitle="Talleres prácticos de 1–2 horas. Temas útiles para tu trabajo y vida. Sin requisitos."
          buttonText="INSCRIBIRME GRATIS"
          buttonAction={() => { window.location.href = 'mailto:hola@circleup.com.co?subject=Quiero%20inscribirme&body=Nombre%3A%0ATaller%20de%20inter%C3%A9s%3A%0ACiudad%3A%0ATel%C3%A9fono%3A'; }}
        />

        <NeedHelp 
          title="¿Listo para transformar tu vida?"
          subtitle="Únete a miles de personas que ya están creciendo con Circle Up"
          cards={[
            {
              icon: "💬",
              title: "Comunidad de Aprendizaje",
              description: "Conecta con otros participantes y mentores"
            },
            {
              icon: "📧",
              title: "Inscríbete Ya",
              description: "",
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

export default HowToUseParticipant;
