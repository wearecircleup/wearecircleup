import { useState } from "react";
import Section from "../components/Section";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Button from "../components/Button";

const HowToUseBusiness = ({ setCurrentPage }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Sign up",
      description: "Create an account with Brainwave - AI chat app by providing your name, email address, and password. Once you sign up, you can start exploring the app.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 1,
      title: "Connect with AI chatbot",
      description: "Connect with the AI chatbot to start the conversation. The chatbot uses natural language processing to understand your queries and provide relevant responses.",
      image: "/src/assets/roadmap/image-2.png"
    },
    {
      id: 2,
      title: "Get Personalized Advices",
      description: "Based on the conversation with the AI chatbot, you will receive personalized recommendations related to your queries. The chatbot is trained to understand your preferences and provide customized suggestions.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 3,
      title: "Upgrade your plan",
      description: "Upgrade your plan to access premium features and unlock the full potential of Brainwave. With the premium plan, you can enjoy unlimited conversations, priority support, and advanced AI capabilities.",
      image: "/src/assets/roadmap/image-4.png"
    }
  ];

  const partnershipSteps = [
    {
      date: "PASO 1",
      title: "Identificación de Oportunidades",
      description: "Evaluamos juntos las necesidades de capacitación de tus empleados y cómo Circle Up puede complementar tu estrategia de desarrollo de talento.",
      completed: true
    },
    {
      date: "PASO 2", 
      title: "Diseño de Programa Personalizado",
      description: "Creamos un programa de talleres específicos para tu organización, alineado con tus objetivos de RSE y desarrollo profesional.",
      completed: true
    },
    {
      date: "PASO 3",
      title: "Implementación y Seguimiento", 
      description: "Ejecutamos los talleres con métricas claras de impacto, reportes regulares y ajustes basados en retroalimentación.",
      completed: true
    },
    {
      date: "PASO 4",
      title: "Escalamiento y Expansión", 
      description: "Expandimos el programa a más sedes, incorporamos nuevas temáticas y fortalecemos el impacto conjunto en la comunidad.",
      completed: false
    }
  ];

  const partnerTestimonials = [
    {
      name: "Carmen Delgado",
      role: "Directora de RSE - Banco Nacional",
      text: "Nuestra alianza con Circle Up ha transformado nuestro programa de RSE. Los talleres de educación financiera han impactado a más de 500 familias en 6 meses. El ROI social es incalculable y nuestros empleados se sienten orgullosos de participar como voluntarios.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ricardo Morales",
      role: "CEO - TechSolutions",
      text: "Circle Up nos ayudó a crear un programa de mentoría donde nuestros desarrolladores enseñan programación básica en comunidades vulnerables. Ha mejorado el engagement de nuestro equipo y fortalecido nuestra marca empleadora.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Ana Lucia Vega",
      role: "Gerente de Talento Humano - Retail Corp",
      text: "Los talleres de habilidades blandas que facilitamos a través de Circle Up han sido un éxito. Nuestros gerentes desarrollan liderazgo mientras enseñan y la comunidad recibe capacitación de calidad. Es un win-win perfecto.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "José Manuel Torres",
      role: "Director de Sostenibilidad - Manufactura S.A.",
      text: "Circle Up nos permitió llevar talleres de emprendimiento a las comunidades donde operamos. Hemos visto nacer 15 nuevos negocios locales y fortalecido nuestra licencia social para operar.",
      avatar: "/src/assets/benefits/image-2.png"
    },
    {
      name: "Patricia Ruiz",
      role: "Coordinadora de Voluntariado - Fundación Empresarial",
      text: "La metodología de Circle Up es excepcional. Nos ayudaron a estructurar nuestro programa de voluntariado corporativo y ahora tenemos métricas claras de impacto. Nuestros colaboradores están más comprometidos que nunca.",
      avatar: "/src/assets/benefits/image-2.png"
    }
  ];

  const partnerFAQs = [
    {
      question: "¿Qué beneficios obtiene mi empresa al aliarse con Circle Up?",
      answer: "Tu empresa fortalece su programa de RSE con impacto medible, mejora el engagement de empleados a través del voluntariado corporativo, desarrolla habilidades de liderazgo en tu equipo y construye una reputación sólida en las comunidades donde opera."
    },
    {
      question: "¿Cómo se mide el impacto de la alianza?",
      answer: "Utilizamos métricas cuantitativas (número de beneficiarios, horas de capacitación, empleados participantes) y cualitativas (historias de éxito, satisfacción de participantes, impacto en marca empleadora). Entregamos reportes trimestrales con resultados claros."
    },
    {
      question: "¿Qué inversión requiere una alianza?",
      answer: "Ofrecemos modelos flexibles: cofinanciamiento de talleres, donación de horas de voluntariado corporativo, o patrocinio de programas completos. Diseñamos la propuesta según tu presupuesto y objetivos de RSE."
    },
    {
      question: "¿Cómo participan nuestros empleados?",
      answer: "Tus empleados pueden ser facilitadores de talleres (con nuestra capacitación), mentores de emprendedores, coordinadores de sede, o participar en actividades de voluntariado puntual. Adaptamos los roles a sus habilidades y disponibilidad."
    },
    {
      question: "¿En qué ciudades podemos implementar?",
      answer: "Actualmente operamos en las principales ciudades de Colombia y estamos expandiendo a Latinoamérica. Podemos implementar programas donde tu empresa tenga presencia, utilizando nuestra red de coordinadores locales y espacios comunitarios."
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        {/* How It Works Section */}
        <Section className="overflow-hidden relative">
          {/* Background grid only on left side */}
          <div className="absolute inset-0 opacity-2">
            <div className="w-1/2 h-full">
              <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="container relative z-2">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-n-7 rounded text-xs font-code font-bold tracking-wider uppercase text-n-4 mb-4">
                [ HOW IT WORK: {String(activeStep + 1).padStart(2, '0')}. ]
              </div>
            </div>

            <div className="relative z-1 grid gap-16 lg:grid-cols-2 items-center mb-20">
              {/* Left side - 3D Stacked Boxes with Image */}
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative">
                  {/* 3D Stacked boxes effect - spread out card deck */}
                  <div className="relative">
                    {/* Third card (back of deck) */}
                    <div className="absolute top-8 left-12 w-[28rem] h-96 bg-n-6/15 rounded-2xl transform rotate-12 shadow-lg"></div>
                    {/* Second card (middle of deck) */}
                    <div className="absolute top-5 left-8 w-[28rem] h-96 bg-n-6/25 rounded-2xl transform rotate-6 shadow-lg"></div>
                    {/* First card (almost top of deck) */}
                    <div className="absolute top-2 left-4 w-[28rem] h-96 bg-n-6/35 rounded-2xl transform rotate-3 shadow-lg"></div>
                    {/* Front card with image (top of deck) */}
                    <div className="relative w-[28rem] h-96 bg-n-7/90 rounded-2xl border border-n-6/50 overflow-hidden shadow-2xl backdrop-blur-sm z-10">
                      <img 
                        className="w-full h-full object-cover pointer-events-none select-none" 
                        src={steps[activeStep].image}
                        alt={steps[activeStep].title}
                      />
                      {/* Subtle overlay for better contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-n-8/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Text Content */}
              <div className="relative">
                <h2 className="h2 mb-6">{steps[activeStep].title}</h2>
                <p className="body-1 text-n-4 mb-8 leading-relaxed">
                  {steps[activeStep].description}
                </p>
                
                <button className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8 mb-8">
                  <span className="relative z-10">CONNECT NOW</span>
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

                {/* Voice input indicator */}
                <div className="flex items-center bg-n-7 rounded-full px-4 py-2 border border-n-6 w-fit">
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
              </div>
            </div>

            {/* Step Navigation - Full width horizontal layout */}
            <div className="w-full">
              <div className="grid grid-cols-4 gap-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="cursor-pointer" onClick={() => setActiveStep(index)}>
                    {/* Step container */}
                    <div className={`p-6 rounded-lg border transition-all duration-300 ${
                      activeStep === index 
                        ? 'border-color-1 bg-color-1/5' 
                        : 'border-n-6 hover:border-n-4'
                    }`}>
                      {/* Number */}
                      <div className={`text-sm font-bold mb-3 transition-all duration-300 ${
                        activeStep === index ? 'text-color-1' : 'text-n-4'
                      }`}>
                        {String(index + 1).padStart(2, '0')}.
                      </div>
                      
                      {/* Step title */}
                      <h4 className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                        activeStep === index ? 'text-n-1' : 'text-n-3'
                      }`}>
                        {step.title}
                      </h4>
                      
                      {/* Step description */}
                      <p className={`text-sm leading-relaxed transition-all duration-300 ${
                        activeStep === index ? 'text-n-2' : 'text-n-4'
                      }`}>
                        {activeStep === index 
                          ? step.description.substring(0, 120) + '...'
                          : step.description.substring(0, 80) + '...'
                        }
                      </p>
                      
                      {/* Bottom border indicator */}
                      <div className={`mt-4 h-1 w-full transition-all duration-300 ${
                        activeStep === index 
                          ? 'bg-color-1' 
                          : 'bg-transparent'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Roadmap Section */}
        <Section className="overflow-hidden relative">
          {/* Background elements */}
          <div className="container relative z-2">
            <div className="text-center mb-16">
              <h2 className="h2 mb-4">Proceso de Alianza Estratégica</h2>
              <p className="body-1 text-n-4 max-w-3xl mx-auto">
                Desde la identificación de oportunidades hasta el escalamiento del impacto. Cada paso está diseñado para maximizar el valor compartido entre tu empresa y la comunidad.
              </p>
              
              <div className="mt-8">
                <Button className="text-xs font-code font-bold tracking-wider uppercase">
                  INICIAR ALIANZA
                </Button>
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
        <Section className="overflow-hidden relative">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-2">
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
        </Section>

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
                  Construye el futuro con{" "}
                  <span className="inline-block relative font-semibold">
                    Circle Up
                    <img
                      src="/src/assets/hero/curve.png"
                      className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                      width={624}
                      height={28}
                      alt="Curve"
                    />
                  </span>
                </h2>
                <p className="body-1 mb-8 text-n-4">
                  Transforma tu RSE en impacto real. Únete a nuestra red de empresas comprometidas con el desarrollo sostenible de las comunidades.
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

        {/* Need help Section */}
        <Section className="overflow-hidden">
          <div className="container relative z-2">
            <div className="relative z-1 grid gap-10 lg:grid-cols-2 items-center">
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative max-w-[28rem]">
                  {/* Background gradient behind image */}
                  <div className="absolute inset-0 opacity-50 z-0">
                    <img src="/src/assets/gradient.png" alt="" className="w-small h-small object-cover" />
                  </div>
                  {/* Main image-3.png */}
                  <div className="mb-10 -my-10 -mx-15 relative z-10">
                    <img 
                      className="w-full pointer-events-none select-none" 
                      src="/src/assets/roadmap/image-3.png" 
                      width={628} 
                      height={426} 
                      alt="Pricing illustration"
                    />
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
              </div>
              
              <div className="relative">
                <h1 className="h1 mb-6">¿Listo para ser aliado?</h1>
                <p className="body-1 mb-8 text-n-4">
                  Construyamos juntos un programa de impacto social sostenible
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center p-6 bg-n-7 rounded-xl border border-n-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">💬</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-n-1 mb-1">Red de Aliados</h3>
                      <p className="text-n-4">Conecta con otras empresas comprometidas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-6 bg-n-7 rounded-xl border border-n-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-n-1 mb-1">Contáctanos</h3>
                      <p className="text-color-1">aliados@circleup.org</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default HowToUseBusiness;
