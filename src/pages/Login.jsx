import { useState, useEffect } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { GitHubAuthService } from "../shared/utils/github";

const Login = ({ setCurrentPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    setIsAuthenticated(GitHubAuthService.isAuthenticated());
  }, []);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    window.location.href = GitHubAuthService.getAuthUrl();
  };

  const handleGoToDashboard = () => {
    setCurrentPage('dashboard');
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
          {/* Logo - Top Left */}
          <div className="mb-8 lg:mb-12">
            <Logo 
              logoSize={{ width: 50, height: 50 }}
              textSize="text-xl"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            
            {/* Left side - Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 text-n-1 leading-tight">
                Crea presentaciones{" "}
                <span className="inline-block relative">
                  con AI
                  <svg
                    className="absolute top-full left-0 w-full xl:-mt-2"
                    width="624"
                    height="28"
                    viewBox="0 0 624 28"
                    fill="none"
                  >
                    <path
                      d="M1 26.5C43 13.5 123.5 0.5 312 0.5C500.5 0.5 581 13.5 623 26.5"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="1" y1="26.5" x2="623" y2="26.5">
                        <stop stopColor="#AC6AFF" />
                        <stop offset="1" stopColor="#FFC876" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                en segundos
              </h1>
              
              <p className="text-base lg:text-lg text-n-4 mb-6 lg:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Genera presentaciones profesionales con GitHub Models API. 
                Sin costos, sin configuración. Solo conecta tu cuenta de GitHub y comienza.
              </p>

              <div className="space-y-4">
                <div className="hidden lg:flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-color-1/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-color-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-n-2 font-medium">100% Gratis</p>
                    <p className="text-n-4 text-sm">Usa GitHub Models API sin costo</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-color-2/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-color-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-n-2 font-medium">Múltiples modelos AI</p>
                    <p className="text-n-4 text-sm">GPT-4o, Llama 3.1, Phi-3</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-color-3/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-color-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-n-2 font-medium">Generación automática</p>
                    <p className="text-n-4 text-sm">De idea a presentación en minutos</p>
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentPage('home')}
                  white
                  className="mt-6 w-full sm:w-auto"
                >
                  ← Volver al inicio
                </Button>
              </div>
            </div>

            {/* Right side - Auth card */}
            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-3 -left-6 w-full h-full bg-n-6/15 rounded-2xl transform rotate-6 shadow-lg"></div>
                <div className="absolute -top-2 -left-3 w-full h-full bg-n-6/25 rounded-2xl transform rotate-3 shadow-lg"></div>
                <div className="absolute -top-1 -left-1 w-full h-full bg-n-6/35 rounded-2xl transform rotate-1 shadow-lg"></div>
                
                <div className="relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-2xl p-6 lg:p-12 shadow-2xl z-10">
                  {!isAuthenticated ? (
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-color-1 to-color-2 rounded-2xl flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-n-1 mb-2">Únete a Circle Up</h2>
                        <p className="text-n-4 text-sm">
                          Conecta tu cuenta de GitHub para acceder a la plataforma
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Button
                          onClick={handleGitHubLogin}
                          className="w-full"
                          white
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Conectando...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                              </svg>
                              Continuar con GitHub
                            </span>
                          )}
                        </Button>

                        <p className="text-xs text-n-4">
                          Al continuar, aceptas usar GitHub Models API para generar presentaciones.
                          Completamente gratis, sin costos ocultos.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-n-1 mb-2">¡Ya estás conectado!</h2>
                        <p className="text-n-4 text-sm">
                          Tu sesión está activa. Accede al dashboard para crear presentaciones.
                        </p>
                      </div>

                      <Button
                        onClick={handleGoToDashboard}
                        className="w-full"
                        white
                      >
                        Ir al Dashboard
                      </Button>
                    </div>
                  )}
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
