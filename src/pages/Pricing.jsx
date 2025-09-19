import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import ButtonGradient from "../assets/svg/ButtonGradient";

const Pricing = ({ setCurrentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 0,
      name: "Jane Smith",
      role: "UX Designer",
      text: "I was blown away by the accuracy and speed of the AI chatbot on Brainwave. It was able to understand my queries and provide relevant recommendations in seconds.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 1,
      name: "Jane Doe",
      role: "UX Designer", 
      text: "Brainwave has revolutionized the way I interact with digital assistants. The AI chatbot is able to understand my preferences and provide customized suggestions that are tailored to my needs. The app is user-friendly and intuitive, making it a joy to use.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UX Designer",
      text: "The AI capabilities of Brainwave are truly impressive. It understands context and provides meaningful responses that help me be more productive.",
      image: "/src/assets/services/service-3.png"
    },
    {
      id: 3,
      name: "Jane Smith",
      role: "UX Designer", 
      text: "Amazing experience with Brainwave! The interface is clean and the AI responses are incredibly accurate and helpful.",
      image: "/src/assets/services/service-3.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, testimonials.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, testimonials.length - 1)) % Math.max(1, testimonials.length - 1));
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        {/* Sign-up Section */}
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
              
              {/* Right side - Sign up content */}
              <div className="relative">
                <div className="mb-4">
                  <span className="text-xs font-code font-bold tracking-wider uppercase text-n-4">[ HOW IT WORKS: 01. ]</span>
                </div>
                <h1 className="h1 mb-6">Sign up</h1>
                <p className="body-1 mb-8 text-n-4">
                  Create an account with Brainwave - AI chat app by providing your name, email address, and password. Once you sign up, you can start exploring the app.
                </p>
                <button className="button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 px-7 text-n-8">
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
              </div>
            </div>
          </div>
        </Section>

        {/* Testimonials Carousel Section */}
        <Section className="overflow-hidden">
          <div className="container relative z-2">
            <div className="relative">
              {/* Carousel container */}
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 50}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="w-1/2 flex-shrink-0 px-4">
                      <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem] border border-n-6">
                        {/* Background image */}
                        <div className="absolute inset-0">
                          <img
                            src={testimonial.image}
                            className="w-full h-full object-cover pointer-events-none select-none"
                            width={520}
                            height={400}
                            alt="Background"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                        </div>
                        
                        {/* Logo */}
                        <div className="absolute top-6 left-6 flex items-center">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                            <span className="text-black font-bold text-sm">Y</span>
                          </div>
                          <span className="text-white font-semibold">yourlogo</span>
                        </div>
                        
                        {/* User info */}
                        <div className="absolute bottom-6 left-6">
                          <h4 className="text-white font-semibold text-lg mb-1">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                        
                        {/* Testimonial text */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90%]">
                          <div className="bg-n-7/90 backdrop-blur-sm border border-purple-500 rounded-xl p-6">
                            <p className="text-white text-sm leading-relaxed mb-4 font-mono">
                              {testimonial.text}
                            </p>
                            <button className="text-xs font-code font-bold tracking-wider uppercase border border-white/20 rounded px-4 py-2 text-white hover:bg-white/10 transition-colors">
                              VISIT LINK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-center mt-8 space-x-4">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 bg-n-7 border border-n-6 rounded-full flex items-center justify-center hover:bg-n-6 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
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
                    Brainwave
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
                  Unleash the power of AI within Brainwave. Upgrade your productivity with Brainwave, the open AI chat app.
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

export default Pricing;
