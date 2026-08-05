import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NeedHelp from "../components/NeedHelp";
import ButtonGradient from "../assets/svg/ButtonGradient";
import PublicPageHero from "../components/PublicPageHero";
import Section from "../components/Section";
import Button from "../components/Button";

const communitySections = [
  {
    id: "teach",
    navLabel: "Quiero compartir",
    subtitle: "VOLUNTARIOS",
    title: "Comparte tu experiencia con otras personas",
    content: [
      "Si sabes hacer algo bien, ya sea por tu profesion, tu oficio o la experiencia que has acumulado con el tiempo, puedes proponer un evento y compartirlo con personas de tu comunidad.",
      "No hace falta convertirlo en un curso largo ni asumir compromisos permanentes. La idea es simple: una hora, un grupo pequeno y una conversacion util alrededor de algo que conoces de verdad.",
      "Nosotros te ayudamos con la organizacion, los cupos y la coordinacion del espacio. Tu te concentras en proponer el tema y llegar a compartirlo con claridad y tranquilidad.",
    ],
    bullets: [
      "Eventos de 1 hora alrededor de tu experiencia.",
      "Nos encargamos de la organizacion y los cupos.",
      "Puedes proponer un evento unico, sin compromisos posteriores.",
    ],
    ctaLabel: "Quiero compartir un tema",
    ctaHref: "https://app.youform.com/forms/iamr7tnj",
    ctaExternal: true,
    supportTitle: "Un formato sencillo para empezar",
    supportBody:
      "La propuesta no busca complicarte. Queremos que compartir lo que sabes sea una invitacion clara, accesible y facil de poner en marcha.",
  },
  {
    id: "learn",
    navLabel: "Quiero aprender",
    subtitle: "EVENTOS",
    title: "Encuentra un evento y reserva tu lugar",
    content: [
      "Puedes participar en eventos sobre temas practicos, oficios o areas de conocimiento compartidas por personas de tu misma comunidad. Son encuentros pensados para conversar, preguntar y aprender sin fricciones.",
      "Los grupos son pequenos y la duracion es corta a proposito. Eso hace que el espacio sea mas cercano, mas facil de seguir y mas util para quien llega con preguntas concretas.",
      "Si prefieres recibir recordatorios y gestionar tu reserva desde el celular, tambien puedes usar Eventbrite. La aplicacion es opcional: si quieres, puedes entrar directamente a la pagina de eventos.",
    ],
    bullets: [
      "Eventos de 1 hora de duracion.",
      "Grupos pequenos para conversar y preguntar.",
      "Sin costos de inscripcion.",
    ],
    ctaLabel: "Ver proximos eventos",
    ctaPage: "events",
    secondaryActions: [
      {
        label: "Eventbrite App Store",
        href: "https://apps.apple.com/us/app/eventbrite/id487922291",
      },
      {
        label: "Eventbrite Google Play",
        href: "https://play.google.com/store/apps/details?id=com.eventbrite.attendee&hl=en",
      },
    ],
  },
];

const CommunityPage = ({ setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((section, index) => {
        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;

        if (scrollPosition >= absoluteTop && scrollPosition < absoluteTop + rect.height) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index) => {
    if (!sectionRefs.current[index]) {
      return;
    }

    const offset = 120;
    const elementPosition = sectionRefs.current[index].getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen bg-n-8">
      <Header setCurrentPage={setCurrentPage} />
      <ButtonGradient />

      <PublicPageHero
        heroLabel="COMUNIDAD"
        heroTitle="Aprender en comunidad"
        readTime="Eventos de 1 hora"
        lastUpdated="Abierto a todos"
        location="Tocancipa, Colombia"
        fontSize="small"
        titleClassName="max-w-[12ch] sm:max-w-[14ch] lg:max-w-[13ch] mx-auto lg:mx-0"
      />

      <Section className="pt-0 pb-20 md:pb-32 lg:pb-40">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 xl:gap-32">
            <aside className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
              <nav className="space-y-2">
                {communitySections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className={`w-full text-left py-4 transition-all duration-300 group border-l-[1px] pl-6 ${
                      activeSection === index
                        ? "border-n-1 text-n-1"
                        : "border-n-7 text-n-4 hover:text-n-2 hover:border-n-5"
                    }`}
                  >
                    <div className="uppercase tracking-[0.2em] mb-2 opacity-60 text-[0.7rem] md:text-xs font-light">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div
                      className={`transition-colors text-xl md:text-2xl lg:text-3xl leading-[0.95] ${
                        activeSection === index ? "font-medium" : "font-light"
                      }`}
                    >
                      {section.navLabel}
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-16 pt-10 border-t border-n-7">
                <div className="text-n-5 mb-4 tracking-wider text-lg md:text-xl font-light">
                  {Math.round(((activeSection + 1) / communitySections.length) * 100)}%
                </div>
                <div className="h-[1px] bg-n-7 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-n-1 transition-all duration-1000 ease-out"
                    style={{ width: `${((activeSection + 1) / communitySections.length) * 100}%` }}
                  />
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="max-w-5xl mb-16 md:mb-20 lg:mb-24">
                <div className="uppercase tracking-[0.25em] text-n-5 mb-5 text-[0.65rem] sm:text-[0.75rem] font-light">
                  CIRCLEUP COMMUNITY
                </div>
                <h2 className="text-n-1 text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] xl:text-[6rem] leading-[0.95] tracking-tighter font-bold mb-6 md:mb-8">
                  Un espacio abierto para aprender y compartir lo que sabes.
                </h2>
                <p className="text-n-3 text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] lg:text-[1.375rem] leading-[1.85] font-thin max-w-4xl">
                  El lugar donde estas ahora mismo forma parte de una red de espacios donde las personas
                  se reunen a aprender unas de otras. Organizamos eventos de 1 hora, sencillos y
                  abiertos a todos.
                </p>
              </div>

              <div className="space-y-24 md:space-y-40 lg:space-y-48 xl:space-y-56">
                {communitySections.map((section, index) => (
                  <article
                    key={section.id}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-32"
                  >
                    <header className="mb-10 md:mb-14 lg:mb-16">
                      <div className="uppercase tracking-[0.25em] text-n-5 mb-4 md:mb-6 text-[0.6rem] sm:text-[0.65rem] md:text-xs font-light">
                        {String(index + 1).padStart(2, "0")} - {section.subtitle}
                      </div>
                      <h2 className="leading-[0.95] font-bold text-n-1 tracking-tighter text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] xl:text-[6rem] mb-6 md:mb-8">
                        {section.title}
                      </h2>
                      <div className="w-12 md:w-16 h-[1px] bg-n-1"></div>
                    </header>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
                      <div className="xl:col-span-7">
                        <div className="space-y-8 md:space-y-10">
                          {section.content.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="text-n-3 text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] lg:text-[1.375rem] leading-[1.85] font-thin"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        <ul className="mt-10 md:mt-12 space-y-4">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-n-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-color-1 flex-shrink-0" />
                              <span className="text-sm sm:text-base md:text-lg leading-[1.8] font-thin">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-10 md:mt-12 flex flex-col gap-4 max-w-4xl">
                          {section.ctaHref ? (
                            <Button
                              href={section.ctaHref}
                              external={section.ctaExternal}
                              className="w-full justify-center px-8 sm:px-10 h-16 sm:h-[4.5rem] text-base sm:text-lg font-semibold tracking-[0.04em]"
                              white
                            >
                              {section.ctaLabel}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setCurrentPage && setCurrentPage(section.ctaPage)}
                              className="w-full justify-center px-8 sm:px-10 h-16 sm:h-[4.5rem] text-base sm:text-lg font-semibold tracking-[0.04em]"
                              white
                            >
                              {section.ctaLabel}
                            </Button>
                          )}

                          {section.secondaryActions?.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {section.secondaryActions.map((action) => (
                                <Button
                                  key={action.href}
                                  href={action.href}
                                  external
                                  className="w-full justify-center px-7 sm:px-8 h-16 sm:h-[4.5rem] text-base sm:text-lg font-medium tracking-[0.03em]"
                                >
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="xl:col-span-5">
                        {section.id === "teach" ? (
                          <div className="rounded-[1.75rem] border border-n-6 bg-n-7/20 p-6 sm:p-8 md:p-10">
                            <div className="uppercase tracking-[0.25em] text-n-5 mb-4 text-[0.65rem] sm:text-[0.75rem] font-light">
                              FORMATO
                            </div>
                            <h3 className="text-n-1 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[0.98] mb-4">
                              {section.supportTitle}
                            </h3>
                            <p className="text-n-3 text-sm sm:text-base md:text-lg leading-[1.8] font-thin mb-8">
                              {section.supportBody}
                            </p>
                            <div className="space-y-4">
                              <div className="rounded-[1.25rem] border border-n-6 bg-n-8/80 px-5 py-4">
                                <p className="text-n-1 text-sm font-medium mb-1">1 hora</p>
                                <p className="text-n-4 text-sm leading-[1.7]">
                                  Lo suficientemente breve para ser facil de proponer y lo
                                  suficientemente util para abrir una buena conversacion.
                                </p>
                              </div>
                              <div className="rounded-[1.25rem] border border-n-6 bg-n-8/80 px-5 py-4">
                                <p className="text-n-1 text-sm font-medium mb-1">Sin friccion innecesaria</p>
                                <p className="text-n-4 text-sm leading-[1.7]">
                                  No necesitas estructurar una formacion extensa. Solo algo concreto que
                                  puedas compartir con honestidad.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-[1.75rem] border border-n-6 bg-n-7/20 p-6 sm:p-8 md:p-10">
                            <div className="uppercase tracking-[0.25em] text-n-5 mb-4 text-[0.65rem] sm:text-[0.75rem] font-light">
                              EVENTBRITE
                            </div>
                            <h3 className="text-n-1 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[0.98] mb-4">
                              Inscripciones y recordatorios desde donde te quede mas comodo
                            </h3>
                            <p className="text-n-3 text-sm sm:text-base md:text-lg leading-[1.8] font-thin mb-8">
                              Puedes entrar directamente a la pagina de eventos o, si lo prefieres, usar
                              la aplicacion de Eventbrite para seguir tus reservas desde el celular.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                              <div className="inline-flex items-center gap-3 rounded-2xl border border-n-6 bg-n-8/80 px-4 py-3">
                                <img
                                  src="/assets/circleimages/event.png"
                                  alt="Eventbrite"
                                  className="h-10 w-10 rounded-xl object-cover"
                                />
                                <div>
                                  <p className="text-n-1 text-sm font-medium">Eventbrite</p>
                                  <p className="text-n-4 text-xs">Registro y recordatorios</p>
                                </div>
                              </div>

                              <div className="inline-flex items-center gap-3 rounded-2xl border border-n-6 bg-n-8/80 px-4 py-3">
                                <img
                                  src="/assets/circleimages/everyone.png"
                                  alt="Content rated by ESRB"
                                  className="h-10 w-auto object-contain"
                                />
                                <div>
                                  <p className="text-n-1 text-sm font-medium">Contenido para todos</p>
                                  <p className="text-n-4 text-xs">Referencia visual de la app</p>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-[1.25rem] border border-n-6 bg-n-8/80 p-4 sm:p-5">
                              <img
                                src="/assets/circleimages/appstores.png"
                                alt="App Store y Google Play"
                                className="w-full h-auto object-contain rounded-2xl"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {index < communitySections.length - 1 && (
                      <div className="mt-16 md:mt-20 lg:mt-24 pt-12 md:pt-14 lg:pt-16 border-t border-n-7">
                        <button
                          onClick={() => scrollToSection(index + 1)}
                          className="group flex items-center gap-3 md:gap-4 text-n-3 hover:text-n-1 transition-all duration-500"
                        >
                          <span className="uppercase tracking-[0.2em] text-xs sm:text-sm md:text-base font-light">
                            Siguiente punto
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
            </div>
          </div>
        </div>
      </Section>

      <NeedHelp
        title="¿Necesitas ayuda?"
        subtitle="Si tienes dudas sobre como participar, registrarte o proponer un evento, estamos aqui para ayudarte."
        cards={[
          {
            iconType: "community",
            title: "Quiero aprender",
            description: "Si no sabes por donde empezar, revisa los eventos activos y encuentra el espacio que mejor se ajuste a ti.",
          },
          {
            iconType: "email",
            title: "Escribenos",
            description: "Si quieres compartir un tema o necesitas orientacion para participar, podemos ayudarte.",
            email: "hola@circleup.com.co",
          },
        ]}
      />

      <Footer />
    </div>
  );
};

export default CommunityPage;
