import { useState } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Button from "../components/Button";
import HowItWorks from "../components/HowItWorks";
import NeedHelp from "../components/NeedHelp";
import FAQ from "../components/FAQ";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import { curve } from "../assets";

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

        {/* Roadmap Section */}
        <Section className="overflow-hidden relative">
          {/* Background elements with modern design */}
          <div className="absolute inset-0 opacity-5">
            <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="container relative z-2">
            <div className="flex justify-center mb-16">
              <div className="relative max-w-[50rem] p-8 border border-n-1/10 rounded-3xl bg-n-8/80 backdrop-blur-sm">
                {/* Quote icon */}
                <div className="absolute top-6 left-8">
                  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                  </svg>
                </div>
                
                {/* Content */}
                <div className="pt-8">
                  <p className="body-1 mb-8 text-n-1 font-mono">
                    Facilita sesiones prácticas de 1–2 horas con plantillas y acompañamiento. Tú pones el conocimiento; nosotros la logística y la comunidad. Desde 2 horas al mes, sin experiencia previa como instructor.
                  </p>
                  
                  {/* Author info */}
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Logo 
                        logoSize={{ width: 48, height: 48 }}
                        textSize="text-xs"
                        showText={false}
                      />
                    </div>
                    <div>
                      <h6 className="h6 text-n-1">Circle Up Volunteer</h6>
                      <p className="body-2 text-n-4">Coordinador Voluntarios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-n-6"></div>
              
              <div className="space-y-12">
                {volunteerJourney.map((step, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="absolute left-1/3 w-4 h-4 bg-purple-500 rounded-full border-4 border-n-8 transform -translate-x-1/2 z-10 mt-1">
                      {step.completed && (
                        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                          <span className="text-purple-500 text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Date on the left */}
                    <div className="w-1/3 pr-8 text-right">
                      <div className="inline-block px-3 py-1 bg-n-7 rounded text-xs font-code font-bold tracking-wider uppercase text-n-4">
                        [ {step.date} ]
                      </div>
                    </div>
                    
                    {/* Content on the right */}
                    <div className="flex-1 pl-8">
                      <h3 className="text-xl font-semibold text-n-1 mb-3 flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        {step.title}
                      </h3>
                      <p className="text-n-4 max-w-xl">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

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
                [ TESTIMONIOS REALES ]
              </div>
              <h2 className="h2">Lo que dicen nuestros voluntarios</h2>
            </div>
            
            <div className="max-w-[70%] mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                {volunteerTestimonials.map((testimonial, index) => (
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
          faqs={volunteerFAQs}
        />


        {/* Call to Action Section */}
        <Section className="overflow-hidden">
          <div className="container relative z-2">
            <div className="relative flex flex-col items-center justify-center min-h-[40rem]">
              {/* Circular background elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative block w-full h-full">
                  <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
                    <div className="w-2 h-2 -ml-1 -mt-36 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
                  </div>
                  <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]">
                    <div className="w-4 h-4 -ml-1 -mt-32 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
                  </div>
                  <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[54deg]">
                    <div className="w-4 h-4 -ml-1 mt-[12.9rem] bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
                  </div>
                  <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
                    <div className="w-3 h-3 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
                  </div>
                  <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[85deg]">
                    <div className="w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out translate-y-0 opacity-100"></div>
                  </div>
                  
                  {/* Additional circles for more visual impact */}
                  <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-b from-[#AC6AFF] to-[#1A1A32] rounded-full opacity-60"></div>
                  <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-b from-[#FFC876] to-[#1A1A32] rounded-full opacity-40"></div>
                  <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-gradient-to-b from-[#FF6B6B] to-[#1A1A32] rounded-full opacity-50"></div>
                </span>
              </div>
              
              {/* Background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 border border-n-6 rounded-full opacity-80"></div>
                <div className="absolute w-80 h-80 border border-n-6 rounded-full opacity-80"></div>
                <div className="absolute w-64 h-64 border border-n-6 rounded-full opacity-80"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-[40rem]">
                <h2 className="h2 mb-6">
                  Comparte tu experiencia con tu comunidad en{" "}
                  <span className="inline-block relative font-semibold">
                    Circle Up
                    <img
                      src="./assets/hero/curve.png"
                      className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                      width={624}
                      height={28}
                      alt="Curve"
                    />
                  </span>
                </h2>
                <p className="body-1 mb-8 text-n-4">
                  Facilita sesiones prácticas de 1–2 horas con plantillas y acompañamiento. Tú pones el conocimiento; nosotros la logística y la comunidad.
                </p>
                <button onClick={() => { window.location.href = 'mailto:voluntarios@circleup.org?subject=Quiero%20ser%20voluntario&body=Nombre%3A%0AExperiencia%3A%0ADisponibilidad%3A%0A'; }} className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8">
                  <span className="relative z-10">APLICAR COMO VOLUNTARIO</span>
                  <svg className="absolute top-0 left-0" width="21" height="44" viewBox="0 0 21 44">
                    <path fill="white" stroke="white" strokeWidth="2" d="M21,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1"></path>
                  </svg>
                  <svg className="absolute top-0 left-[1.3125rem] w-[calc(100%-2.625rem)]" height="44" viewBox="0 0 100 44" preserveAspectRatio="none" fill="white">
                    <polygon fill="white" fillRule="nonzero" points="100 0 100 44 0 44 0 0"></polygon>
                  </svg>
                  <svg className="absolute top-0 right-0" width="21" height="44" viewBox="0 0 21 44">
                    <path fill="white" stroke="white" strokeWidth="2" d="M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.18,2.77735 C5.792,1.61115 4.147,1 2.466,1 L0,1"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Section>

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
