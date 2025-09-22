import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import ButtonGradient from "../assets/svg/ButtonGradient";

const Features = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Sign up",
      description: "Create an account with Circle Up Volunteer - community learning platform by providing your name, email address, and password. Once you sign up, you can start exploring the platform.",
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
      title: "Explore and Engage",
      description: "Explore the recommendations provided by the AI chatbot and engage with the app. You can ask questions, provide feedback, and share your experience with the chatbot.",
      image: "/src/assets/roadmap/image-2.png"
    }
  ];
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        {/* Main Features Section */}
        <Section className="pt-[12rem] -mt-[5.25rem] relative" id="features">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-5">
            <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container relative z-2">
            <div className="relative z-1 grid gap-5 lg:grid-cols-2">
              {/* Left side - Text content */}
              <div className="relative min-h-[39rem] flex flex-col justify-center">
                <h1 className="h1 mb-6">
                  Main features
                  <br />
                  of Circle Up Volunteer
                </h1>
                <p className="body-1 mb-6 text-n-4 lg:mb-8">
                  Here are some of the core features of Circle Up Volunteer that make it stand out as a community-based learning platform
                </p>
              </div>
              
              {/* Right side - Hero Image with additional elements */}
              <div className="relative min-h-[39rem] flex items-center justify-center">
                <div className="relative">
                  
                  {/* Background gradient behind image */}
                  <div className="absolute inset-0 opacity-50 z-0">
                    <img src="/src/assets/gradient.png" alt="" className="w-small h-small object-cover" />
                  </div>
                  {/* Main image-3.png */}
                  <div className="mb-10 -my-10 -mx-15 relative z-10">
                    <img 
                      className="w-full pointer-events-none select-none" 
                      src="/src/assets/roadmap/hero.png" 
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
            </div>
          </div>
        </Section>

        {/* Notes Section */}
        <Section className="overflow-hidden">
          <div className="container relative z-2">
            <div className="flex justify-center">
              <div className="relative max-w-[50rem] p-8 border border-n-1/10 rounded-3xl bg-n-8/80 backdrop-blur-sm">
                {/* Quote icon */}
                <div className="absolute top-6 left-8">
                  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
                  </svg>
                </div>
                
                {/* Notes content */}
                <div className="pt-8">
                  <p className="body-1 mb-8 text-n-1 font-mono">
                    Circle Up Volunteer has been a game-changer for my professional development. The mentorship program and interactive workshops help me stay on top of industry trends and provide me with personalized guidance that helps me make informed career decisions. It's like having a community of experts at my fingertips. I would highly recommend this platform to anyone looking to improve their skills and expand their network.
                  </p>
                  
                  {/* Author info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">DC</span>
                    </div>
                    <div>
                      <h6 className="h6 text-n-1">Circle Up Volunteer</h6>
                      <p className="body-2 text-n-4">Alianzas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

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
                  Be part of the future of{" "}
                  <span className="inline-block relative font-semibold">
                    Circle Up Volunteer
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
                  Unleash the power of community learning within Circle Up Volunteer. Upgrade your skills and career with Circle Up Volunteer, the community-based learning platform.
                </p>
                <button className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8">
                  <span className="relative z-10">GET STARTED</span>
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

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Features;
