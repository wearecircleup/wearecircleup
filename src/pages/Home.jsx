import { useState, useEffect, useRef } from "react";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NeedHelp from "../components/NeedHelp";
import Roadmap from "../components/Roadmap";
import Services from "../components/Services";
import StorySection from "../components/StorySection";
import Button from "../components/Button";

const Home = ({ setCurrentPage }) => {
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [menuLanguage, setMenuLanguage] = useState('es');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccessibilityMenu(false);
      }
    };

    if (showAccessibilityMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAccessibilityMenu]);

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem]">
        <Header setCurrentPage={setCurrentPage} />
        
        {/* Accessibility Button */}
        <div 
          className="fixed top-24 left-4 sm:left-6 md:left-8 lg:left-12 z-50 transition-all duration-500"
          ref={menuRef}
        >
          <Button 
            onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
            white
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-semibold">Aa</span>
            </span>
          </Button>

          {/* Accessibility Menu */}
          {showAccessibilityMenu && (
            <div className="absolute top-full mt-2 left-0 bg-n-8/95 backdrop-blur-xl border border-n-6/50 rounded-2xl p-4 sm:p-6 shadow-2xl w-72 sm:w-80 animate-fadeIn">
              <div className="flex justify-end gap-1 mb-4 pb-4 border-b border-n-6/30">
                <button
                  onClick={() => setMenuLanguage('en')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    menuLanguage === 'en' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setMenuLanguage('es')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    menuLanguage === 'es' ? 'bg-color-1 text-n-1' : 'text-n-4 hover:text-n-2'
                  }`}
                >
                  ES
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                  {menuLanguage === 'en' ? 'FONT SIZE' : 'TAMAÑO DE FUENTE'}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setFontSize(fontSize === 'normal' ? 'small' : fontSize === 'large' ? 'normal' : 'small')}
                    className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <div className="flex-1 mx-4 text-center">
                    <div className="text-n-1 font-semibold">
                      {fontSize === 'small' 
                        ? (menuLanguage === 'en' ? 'Small' : 'Pequeño')
                        : fontSize === 'large' 
                        ? (menuLanguage === 'en' ? 'Large' : 'Grande')
                        : (menuLanguage === 'en' ? 'Medium' : 'Mediano')}
                    </div>
                  </div>
                  <button
                    onClick={() => setFontSize(fontSize === 'small' ? 'normal' : fontSize === 'normal' ? 'large' : 'large')}
                    className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setFontSize('small')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'small' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Small' : 'Pequeño'}
                  </button>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'normal' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Medium' : 'Mediano'}
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                      fontSize === 'large' ? 'bg-n-1 text-n-8' : 'bg-n-7 text-n-3 hover:bg-n-6'
                    }`}
                  >
                    {menuLanguage === 'en' ? 'Large' : 'Grande'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Hero fontSize={fontSize} />
        <Benefits fontSize={fontSize} />
        <Services fontSize={fontSize} />
        <StorySection fontSize={fontSize} />
        <Roadmap setCurrentPage={setCurrentPage} />
        <div className="w-full bg-n-8 border-t border-n-6">
          <NeedHelp 
            title="Tu conocimiento importa"
            subtitle="Empieza con un taller. Sin compromisos."
            cards={[
              {
                iconType: "community",
                title: "Quiero aprender",
                description: "Talleres gratuitos cada semana. Inscríbete y llega."
              },
              {
                iconType: "email",
                title: "Quiero enseñar",
                description: "Tienes algo que compartir. Nosotros te ayudamos con el resto.",
                email: "hola@circleup.com.co"
              }
            ]}
          />
        </div>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Home;
