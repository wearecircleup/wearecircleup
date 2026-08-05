import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import NeedHelp from "../components/NeedHelp";
import Button from "../components/Button";
import PublicPageHero from "../components/PublicPageHero";
import {
  policiesApproachContentByLanguage,
  policiesArticleMetaByLanguage,
  policiesLegalContentByLanguage,
} from "../content/policiesDocsContent";

const PoliciesDocs = ({ setCurrentPage }) => {
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [fontFamily, setFontFamily] = useState("sans");
  const [fontSize, setFontSize] = useState("normal");
  const [menuLanguage, setMenuLanguage] = useState("es");
  const [pageLanguage, setPageLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccessibilityMenu(false);
      }
    };

    if (showAccessibilityMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showAccessibilityMenu]);

  const articleMeta = policiesArticleMetaByLanguage[pageLanguage];
  const allContent = policiesLegalContentByLanguage[pageLanguage];
  const approachContent = policiesApproachContentByLanguage[pageLanguage];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;

          if (
            scrollPosition >= absoluteTop &&
            scrollPosition < absoluteTop + rect.height
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      const headerOffset = 120;
      const elementPosition = sectionRefs.current[index].getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-n-8">
      <Header setCurrentPage={setCurrentPage} />
      <ButtonGradient />

      <div
        className="fixed top-24 left-4 sm:left-6 md:left-8 lg:left-12 z-40 transition-all duration-500"
        ref={menuRef}
      >
        <Button onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)} white>
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-semibold">Aa</span>
          </span>
        </Button>

        {showAccessibilityMenu && (
          <div className="absolute top-full mt-2 left-0 bg-n-8/95 backdrop-blur-xl border border-n-6/50 rounded-2xl p-4 sm:p-6 shadow-2xl w-72 sm:w-80 animate-fadeIn">
            <div className="mb-6">
              <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                {menuLanguage === "en"
                  ? "PAGE LANGUAGE"
                  : menuLanguage === "pt"
                    ? "IDIOMA DA PÁGINA"
                    : "IDIOMA DE PÁGINA"}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setPageLanguage("es")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    pageLanguage === "es" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setPageLanguage("en")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    pageLanguage === "en" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setPageLanguage("pt")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    pageLanguage === "pt" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  PT
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-1 mb-4 pb-4 border-b border-n-6/30">
              <button
                onClick={() => setMenuLanguage("en")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  menuLanguage === "en" ? "bg-color-1 text-n-1" : "text-n-4 hover:text-n-2"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setMenuLanguage("es")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  menuLanguage === "es" ? "bg-color-1 text-n-1" : "text-n-4 hover:text-n-2"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setMenuLanguage("pt")}
                className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                  menuLanguage === "pt" ? "bg-color-1 text-n-1" : "text-n-4 hover:text-n-2"
                }`}
              >
                PT
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                {menuLanguage === "en"
                  ? "FONT FAMILY"
                  : menuLanguage === "pt"
                    ? "FAMÍLIA DA FONTE"
                    : "FAMILIA DE FUENTE"}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontFamily("sans")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    fontFamily === "sans" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  Sans Serif
                </button>
                <button
                  onClick={() => setFontFamily("serif")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    fontFamily === "serif" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  Serif
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-n-1 text-xs font-bold uppercase tracking-wider mb-3">
                {menuLanguage === "en"
                  ? "FONT SIZE"
                  : menuLanguage === "pt"
                    ? "TAMANHO DA FONTE"
                    : "TAMAÑO DE FUENTE"}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() =>
                    setFontSize(
                      fontSize === "normal"
                        ? "small"
                        : fontSize === "large"
                          ? "normal"
                          : "small",
                    )
                  }
                  className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <div className="flex-1 mx-4 text-center">
                  <div className="text-n-1 font-semibold">
                    {fontSize === "small"
                      ? menuLanguage === "en"
                        ? "Small"
                        : menuLanguage === "pt"
                          ? "Pequeno"
                          : "Pequeño"
                      : fontSize === "large"
                        ? menuLanguage === "en"
                          ? "Large"
                          : menuLanguage === "pt"
                            ? "Grande"
                            : "Grande"
                        : menuLanguage === "en"
                          ? "Medium"
                          : menuLanguage === "pt"
                            ? "Médio"
                            : "Mediano"}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setFontSize(
                      fontSize === "small"
                        ? "normal"
                        : fontSize === "normal"
                          ? "large"
                          : "large",
                    )
                  }
                  className="p-2 rounded-lg bg-n-7 hover:bg-n-6 text-n-1 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFontSize("small")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    fontSize === "small" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  {menuLanguage === "en" ? "Small" : menuLanguage === "pt" ? "Pequeno" : "Pequeño"}
                </button>
                <button
                  onClick={() => setFontSize("normal")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    fontSize === "normal" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  {menuLanguage === "en" ? "Medium" : menuLanguage === "pt" ? "Médio" : "Mediano"}
                </button>
                <button
                  onClick={() => setFontSize("large")}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-medium transition-all ${
                    fontSize === "large" ? "bg-n-1 text-n-8" : "bg-n-7 text-n-3 hover:bg-n-6"
                  }`}
                >
                  {menuLanguage === "en" ? "Large" : menuLanguage === "pt" ? "Grande" : "Grande"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PublicPageHero
        heroLabel={articleMeta.heroLabel}
        heroTitle={articleMeta.heroTitle}
        readTime={articleMeta.readTime}
        lastUpdated={articleMeta.lastUpdated}
        location={articleMeta.location}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />

      <section className="relative pb-20 md:pb-32 lg:pb-40">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 xl:gap-32">
            <aside className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
              <nav className="space-y-2">
                {allContent.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className={`w-full text-left py-4 transition-all duration-300 group border-l-[1px] pl-6 ${
                      activeSection === index
                        ? "border-n-1 text-n-1"
                        : "border-n-7 text-n-4 hover:text-n-2 hover:border-n-5"
                    }`}
                  >
                    <div
                      className={`uppercase tracking-[0.2em] mb-2 opacity-60 ${
                        fontSize === "small"
                          ? "text-[clamp(0.6rem,0.85vw,0.7rem)]"
                          : fontSize === "large"
                            ? "text-[clamp(0.7rem,1.05vw,0.875rem)]"
                            : "text-[clamp(0.65rem,0.95vw,0.75rem)]"
                      } ${fontFamily === "serif" ? "font-serif font-light" : "font-sans font-light"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div
                      className={`transition-colors ${
                        fontSize === "small"
                          ? "text-[clamp(1.125rem,2vw,1.5rem)]"
                          : fontSize === "large"
                            ? "text-[clamp(1.5rem,3vw,2.25rem)]"
                            : "text-[clamp(1.25rem,2.5vw,1.875rem)]"
                      } ${fontFamily === "serif" ? "font-serif" : "font-sans"} ${
                        activeSection === index ? "font-medium" : "font-light"
                      }`}
                    >
                      {section.title}
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-16 pt-10 border-t border-n-7">
                <div
                  className={`text-n-5 mb-4 tracking-wider ${
                    fontSize === "small"
                      ? "text-[clamp(1rem,1.5vw,1.125rem)]"
                      : fontSize === "large"
                        ? "text-[clamp(1.25rem,2vw,1.5rem)]"
                        : "text-[clamp(1.125rem,1.75vw,1.25rem)]"
                  } ${fontFamily === "serif" ? "font-serif font-light" : "font-sans font-light"}`}
                >
                  {Math.round(((activeSection + 1) / allContent.length) * 100)}%
                </div>
                <div className="h-[1px] bg-n-7 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-n-1 transition-all duration-1000 ease-out"
                    style={{ width: `${((activeSection + 1) / allContent.length) * 100}%` }}
                  />
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="space-y-24 md:space-y-40 lg:space-y-48 xl:space-y-56">
                {allContent.map((section, index) => (
                  <article
                    key={section.id}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-32"
                  >
                    <header className="mb-12 md:mb-16 lg:mb-20">
                      <div
                        className={`uppercase tracking-[0.25em] text-n-5 mb-4 md:mb-6 ${
                          fontSize === "small"
                            ? "text-[clamp(0.5rem,0.8vw,0.65rem)]"
                            : fontSize === "large"
                              ? "text-[clamp(0.65rem,1.1vw,0.875rem)]"
                              : "text-[clamp(0.55rem,0.95vw,0.75rem)]"
                        } ${fontFamily === "serif" ? "font-serif font-light" : "font-sans font-light"}`}
                      >
                        {String(index + 1).padStart(2, "0")} - {section.subtitle}
                      </div>
                      <h2
                        className={`leading-[0.95] font-bold text-n-1 tracking-tighter mb-6 md:mb-8 ${
                          fontSize === "small"
                            ? "text-[clamp(1.75rem,4.5vw,5rem)]"
                            : fontSize === "large"
                              ? "text-[clamp(2.5rem,6.5vw,7rem)]"
                              : "text-[clamp(2rem,5.5vw,6rem)]"
                        } ${fontFamily === "serif" ? "font-serif" : "font-sans"}`}
                      >
                        {section.title}
                      </h2>
                      <div className="w-12 md:w-16 h-[1px] bg-n-1"></div>
                    </header>

                    <div className="max-w-4xl space-y-10">
                      {section.content.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className={`leading-[1.8] text-n-3 ${
                            fontSize === "small"
                              ? "text-[clamp(1rem,1.5vw,1.25rem)]"
                              : fontSize === "large"
                                ? "text-[clamp(1.375rem,2vw,1.625rem)]"
                                : "text-[clamp(1.125rem,1.75vw,1.375rem)]"
                          } ${fontFamily === "serif" ? "font-serif" : "font-sans"} font-thin`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {index < allContent.length - 1 && (
                      <div className="mt-16 md:mt-20 lg:mt-24 pt-12 md:pt-14 lg:pt-16 border-t border-n-7">
                        <button
                          onClick={() => scrollToSection(index + 1)}
                          className="group flex items-center gap-3 md:gap-4 text-n-3 hover:text-n-1 transition-all duration-500"
                        >
                          <span
                            className={`uppercase tracking-[0.2em] ${
                              fontSize === "small"
                                ? "text-[clamp(0.6rem,0.9vw,0.875rem)]"
                                : fontSize === "large"
                                  ? "text-[clamp(0.875rem,1.3vw,1.125rem)]"
                                  : "text-[clamp(0.75rem,1.1vw,1rem)]"
                            } ${fontFamily === "serif" ? "font-serif font-light" : "font-sans font-light"}`}
                          >
                            {articleMeta.nextChapter}
                          </span>
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <article className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-32 mt-24 md:mt-40 lg:mt-48 xl:mt-56 pt-16 border-t border-n-7">
                <header className="mb-12 md:mb-16 lg:mb-20">
                  <div
                    className={`uppercase tracking-[0.25em] text-n-5 mb-4 md:mb-6 ${
                      fontSize === "small"
                        ? "text-[clamp(0.5rem,0.8vw,0.65rem)]"
                        : fontSize === "large"
                          ? "text-[clamp(0.65rem,1.1vw,0.875rem)]"
                          : "text-[clamp(0.55rem,0.95vw,0.75rem)]"
                    } ${fontFamily === "serif" ? "font-serif font-light" : "font-sans font-light"}`}
                  >
                    05 - {approachContent.subtitle}
                  </div>
                  <h2
                    className={`leading-[0.95] font-bold text-n-1 tracking-tighter mb-6 md:mb-8 ${
                      fontSize === "small"
                        ? "text-[clamp(1.75rem,4.5vw,5rem)]"
                        : fontSize === "large"
                          ? "text-[clamp(2.5rem,6.5vw,7rem)]"
                          : "text-[clamp(2rem,5.5vw,6rem)]"
                    } ${fontFamily === "serif" ? "font-serif" : "font-sans"}`}
                  >
                    {approachContent.title}
                  </h2>
                  <div className="w-12 md:w-16 h-[1px] bg-n-1"></div>
                </header>

                <div className="max-w-4xl space-y-10">
                  {approachContent.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`leading-[1.8] text-n-3 ${
                        fontSize === "small"
                          ? "text-[clamp(1rem,1.5vw,1.25rem)]"
                          : fontSize === "large"
                            ? "text-[clamp(1.375rem,2vw,1.625rem)]"
                            : "text-[clamp(1.125rem,1.75vw,1.375rem)]"
                      } ${fontFamily === "serif" ? "font-serif" : "font-sans"} font-thin`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <NeedHelp
        title="¿Necesitas ayuda?"
        subtitle="¿Tienes dudas sobre nuestras políticas? Estamos aquí para ayudarte."
        cards={[
          {
            iconType: "community",
            title: "Únete a nuestra comunidad",
            description: "Conecta con otros miembros y resuelve tus dudas sobre el proyecto.",
          },
          {
            iconType: "email",
            title: "Escríbenos",
            description: "Si necesitas orientación adicional sobre privacidad, participación o protección de menores, podemos ayudarte.",
            email: "hola@circleup.com.co",
          },
        ]}
      />

      <Footer />
    </div>
  );
};

export default PoliciesDocs;
