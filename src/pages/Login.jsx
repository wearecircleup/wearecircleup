import { useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log("Form submitted:", formData);
    // For now, just show an alert
    alert("¡Gracias por unirte a Circle Up! Pronto nos pondremos en contacto contigo.");
  };

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Stars background */}
      <div className="absolute inset-0 opacity-20">
        <img src="./assets/hero/stars.svg" alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 lg:top-20 lg:left-20 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-r from-color-1/20 to-color-2/20 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-16 lg:top-40 lg:right-32 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-color-2/20 to-color-3/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-16 lg:bottom-32 lg:left-32 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-r from-color-3/20 to-color-1/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 lg:bottom-20 lg:right-20 w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-r from-color-1/30 to-color-2/30 rounded-full blur-lg"></div>

      {/* Small floating dots */}
      <div className="absolute top-24 left-1/4 w-2 h-2 bg-color-1 rounded-full opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-color-2 rounded-full opacity-40"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-color-3 rounded-full opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-color-1 rounded-full opacity-70"></div>

      <Section className="min-h-screen flex items-center justify-center py-6 lg:py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            
            {/* Left side - Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 text-n-1 leading-tight">
                Únete a la revolución del{" "}
                <span className="inline-block relative">
                  aprendizaje colaborativo
                  <svg
                    className="absolute top-full left-0 w-full xl:-mt-2"
                    width="624"
                    height="28"
                    viewBox="0 0 624 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 26.5C43 13.5 123.5 0.5 312 0.5C500.5 0.5 581 13.5 623 26.5"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="1"
                        y1="26.5"
                        x2="623"
                        y2="26.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#AC6AFF" />
                        <stop offset="1" stopColor="#FFC876" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                con Circle Up
              </h1>
              
              <p className="text-base lg:text-lg text-n-4 mb-6 lg:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Comienza tu experiencia con Circle Up - la plataforma que conecta 
                conocimiento, comunidad y oportunidades de crecimiento en tu ciudad.
              </p>

              {/* Back to home button */}
              <div className="hidden lg:block">
                <Button
                  onClick={() => setCurrentPage('home')}
                  white
                  className="mb-4"
                >
                  ← Volver al inicio
                </Button>
              </div>
            </div>

            {/* Right side - Login form */}
            <div className="relative order-1 lg:order-2">
              {/* 3D Stacked effect like HowItWorks */}
              <div className="relative">
                {/* Third card (back) */}
                <div className="absolute -top-3 -left-6 w-full h-full bg-n-6/15 rounded-2xl transform rotate-6 shadow-lg"></div>
                {/* Second card (middle) */}
                <div className="absolute -top-2 -left-3 w-full h-full bg-n-6/25 rounded-2xl transform rotate-3 shadow-lg"></div>
                {/* First card (almost top) */}
                <div className="absolute -top-1 -left-1 w-full h-full bg-n-6/35 rounded-2xl transform rotate-1 shadow-lg"></div>
                {/* Main form card */}
                <div className="relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-2xl p-6 lg:p-12 shadow-2xl z-10">
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                  
                  {/* Name input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nombre completo"
                      className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 pl-11 lg:pl-12 pr-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors text-sm lg:text-base"
                      required
                    />
                  </div>

                  {/* Email input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22,6 12,13 2,6" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
                      className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 pl-11 lg:pl-12 pr-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors text-sm lg:text-base"
                      required
                    />
                  </div>

                  {/* Password input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#8C8C8C" strokeWidth="2"/>
                        <circle cx="12" cy="16" r="1" fill="#8C8C8C"/>
                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Contraseña"
                      className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 pl-11 lg:pl-12 pr-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors text-sm lg:text-base"
                      required
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full text-sm lg:text-base"
                      white
                    >
                      ÚNETE AHORA
                    </Button>
                  </div>
                </form>
                </div>
              </div>
            </div>

            {/* Mobile back button */}
            <div className="lg:hidden text-center mt-6">
              <Button
                onClick={() => setCurrentPage('home')}
                white
                className="text-sm"
              >
                ← Volver al inicio
              </Button>
            </div>

          </div>
        </div>
      </Section>
    </div>
  );
};

export default Login;
