import { useState, useEffect } from "react";
import NeedHelp from "../components/NeedHelp";
import HowItWorks from "../components/HowItWorks";
import Section from "../components/Section";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Button from "../components/Button";
import { curve } from "../assets";

const HowToUseBusiness = ({ setCurrentPage }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Explora cómo apoyar",
      description: "Si eres un café, biblioteca, entidad pública o empresa, cuéntanos qué puedes ofrecer: espacio, insumos/materiales, mentorías técnicas o tiempo profesional.",
      image: "/wearecircleup/assets/circleimages/aliado-sub-nav-1.png"
    },
    {
      id: 1,
      title: "Define tu aporte",
      description: "Acordamos duración, frecuencia y tipo de apoyo. En cafés: ticket de consumo simbólico o donación. En espacios públicos: horarios que aumenten su uso. En empresas: mentorías técnicas o materiales.",
      image: "/wearecircleup/assets/circleimages/aliado-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Activamos sesiones",
      description: "Coordinamos comunidad y facilitación; tú aportas el recurso. Sesiones prácticas e intergeneracionales de 1–2 horas (CBL), formato sencillo y cercano, sin trámites pesados.",
      image: "/wearecircleup/assets/circleimages/aliado-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Reconocimiento y continuidad",
      description: "Damos visibilidad en redes y web; contamos la historia y, si te gusta, repetimos o escalamos a otras sedes/temas para fortalecer la sostenibilidad del territorio.",
      image: "/wearecircleup/assets/circleimages/aliado-sub-nav-4.png"
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

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        <HowItWorks 
          steps={steps}
          title="CÓMO FUNCIONA"
          buttonText="INICIAR ALIANZA"
          buttonAction={() => console.log("Iniciar alianza")}
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
                    Somos una iniciativa de aprendizaje comunitario (CBL), intergeneracional y de aprendizaje a lo largo de la vida (Lifelong Learning), inicialmente financiada con recursos públicos y orientada a la sostenibilidad. Buscamos apoyos en especie: espacios, insumos/materiales y mentorías técnicas o tiempo profesional. A cambio, brindamos visibilidad en redes y en nuestra web, fortalecemos tu vínculo con la comunidad y aumentamos el uso de los espacios públicos o el tráfico en cafés.
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
                      <p className="body-2 text-n-4">Director Proyecto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-n-6"></div>
              
              <div className="space-y-12">
                {partnershipSteps.map((step, index) => (
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
                [ CASOS DE ÉXITO ]
              </div>
              <h2 className="h2">Lo que dicen nuestros aliados</h2>
            </div>
            
            <div className="max-w-[70%] mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
                {partnerTestimonials.map((testimonial, index) => (
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

        {/* FAQ Section */}
        <Section className="overflow-hidden relative">
          {/* Background elements */}
          <div className="absolute top-1/2 left-1/4 w-80 h-80 opacity-2 rotate-45">
            <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="container relative z-2">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="h2 mb-4">Preguntas frecuentes</h2>
                <p className="body-1 text-n-4 mb-6">
                  ¿No encuentras lo que buscas? <span className="text-color-1 cursor-pointer">Contáctanos</span>
                </p>
              </div>
              
              <div className="space-y-0">
                {partnerFAQs.map((faq, index) => (
                  <div key={index} className="border-t border-n-6 first:border-t-0 last:border-b border-b-n-6">
                    <button 
                      className="w-full px-0 py-6 text-left flex items-center justify-between hover:text-color-1 transition-colors"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="text-n-1 font-medium text-lg">{faq.question}</span>
                      <span className="text-n-3 text-2xl font-light">
                        {expandedFAQ === index ? '−' : '+'}
                      </span>
                    </button>
                    {expandedFAQ === index && (
                      <div className="pb-6 -mt-2">
                        <p className="text-n-3 leading-relaxed pr-8">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>


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
                  Activa aprendizaje comunitario en tu territorio con{" "}
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
                  Activa aprendizaje intergeneracional y uso vivo de espacios: cafés con más vida, bibliotecas con programación útil y personas aprendiendo durante toda la vida.
                </p>
                <button className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8">
                  <span className="relative z-10">CONVERTIRSE EN ALIADO</span>
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
              email: "aliados@circleup.org"
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
