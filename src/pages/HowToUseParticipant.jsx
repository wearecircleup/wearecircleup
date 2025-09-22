import { useState, useEffect } from "react";
import NeedHelp from "../components/NeedHelp";
import Section from "../components/Section";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Button from "../components/Button";
import { curve } from "../assets";

const HowToUseParticipant = ({ setCurrentPage }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Encuentra tu taller",
      description: "Explora temas útiles cerca de ti: habilidades para el trabajo, vida práctica y desarrollo personal. Todos los talleres son gratuitos y abiertos.",
      image: "/src/assets/circleimages/par-sub-nav-1.png"
    },
    {
      id: 1,
      title: "Inscríbete en 1 minuto",
      description: "Reserva tu cupo con un formulario corto y recibe recordatorios. Si el taller es en café con ticket simbólico, te lo contamos antes para que decidas.",
      image: "/src/assets/circleimages/par-sub-nav-2.png"
    },
    {
      id: 2,
      title: "Participa y crea algo",
      description: "Sesiones prácticas de 1–2 horas donde haces, no solo escuchas. Te llevas algo concreto: un documento, un plan o una habilidad demostrable.",
      image: "/src/assets/circleimages/par-sub-nav-3.png"
    },
    {
      id: 3,
      title: "Sigue aprendiendo",
      description: "Recibe recursos, certificado digital y opciones para continuar. Si te animas, también puedes enseñar lo que sabes en el futuro.",
      image: "/src/assets/circleimages/par-sub-nav-4.png"
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
                [ CÓMO FUNCIONA: {String(activeStep + 1).padStart(2, '0')}. ]
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
                {/* Logo in bottom right corner */}
                <div className="absolute bottom-0 right-0 z-10">
                  <Logo 
                    logoSize={{ width: 48, height: 48 }}
                    textSize="text-sm"
                    showText={true}
                  />
                </div>
                
                <h2 className="h2 mb-6">{steps[activeStep].title}</h2>
                <p className="body-1 text-n-4 mb-8 leading-relaxed">
                  {steps[activeStep].description}
                </p>
                
                <button onClick={() => { window.location.href = 'mailto:participantes@circleup.org?subject=Quiero%20inscribirme&body=Nombre%3A%0ATaller%20de%20inter%C3%A9s%3A%0ACiudad%3A%0ATel%C3%A9fono%3A'; }} className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8 mb-8">
                  <span className="relative z-10">INSCRIBIRME GRATIS</span>
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
                  <span className="text-n-3 text-sm">¿Tienes dudas?</span>
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
                    Talleres prácticos de 1–2 horas. Temas útiles para tu trabajo y vida. Sin requisitos. Inscripción en 1 minuto, certificado digital y flexibilidad para retomar cuando puedas.
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
                      <p className="body-2 text-n-4">Coordinador Proyecto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-n-6"></div>
              
              <div className="space-y-12">
                {participationSteps.map((step, index) => (
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
                {participantFAQs.map((faq, index) => (
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
                  Aprende haciendo, gratis y cerca de ti con{" "}
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
                  Talleres prácticos de 1–2 horas. Temas útiles para tu trabajo y vida. Sin requisitos.
                </p>
                <button onClick={() => { window.location.href = 'mailto:participantes@circleup.org?subject=Quiero%20inscribirme&body=Nombre%3A%0ATaller%20de%20inter%C3%A9s%3A%0ACiudad%3A%0ATel%C3%A9fono%3A'; }} className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8">
                  <span className="relative z-10">INSCRIBIRME GRATIS</span>
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
              email: "participantes@circleup.org"
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
