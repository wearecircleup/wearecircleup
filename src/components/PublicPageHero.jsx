import HeroParticleLogo from "./HeroParticleLogo";
import { BackgroundCircles } from "./design/Hero";

const labelSizeClasses = {
  small: "text-[clamp(0.5rem,0.8vw,0.65rem)]",
  normal: "text-[clamp(0.55rem,0.95vw,0.75rem)]",
  large: "text-[clamp(0.65rem,1.1vw,0.875rem)]",
};

const titleSizeClasses = {
  small: "text-[clamp(2.3rem,6.9vw,8.625rem)]",
  normal: "text-[clamp(2.875rem,8.625vw,10.35rem)]",
  large: "text-[clamp(3.45rem,10.35vw,12.075rem)]",
};

const metaSizeClasses = {
  small: "text-[clamp(0.55rem,0.85vw,0.75rem)]",
  normal: "text-[clamp(0.6rem,0.95vw,0.875rem)]",
  large: "text-[clamp(0.7rem,1.1vw,1rem)]",
};

const renderTitleLine = (line, keyPrefix) => {
  const normalizedLine = line
    .split(" ")
    .map((word, index, words) => (index === words.length - 1 ? word : `${word} `))
    .join("");

  return normalizedLine.split("CircleUp").map((part, index) => (
    <span key={`${keyPrefix}-${index}`}>
      {index > 0 && <br />}
      {index > 0 ? "CircleUp" : ""}
      {part}
    </span>
  ));
};

const renderHeroTitle = (heroTitle) => {
  return heroTitle.split("\n").map((line, index, lines) => (
    <span key={`line-${index}`}>
      {renderTitleLine(line, `line-${index}`)}
      {index < lines.length - 1 && <br />}
    </span>
  ));
};

const PublicPageHero = ({
  heroLabel,
  heroTitle,
  readTime,
  lastUpdated,
  location,
  fontSize = "normal",
  fontFamily = "sans",
  titleClassName = "",
  contentClassName = "",
  visualClassName = "",
}) => {
  const familyClass = fontFamily === "serif" ? "font-serif" : "font-sans";
  const lightFamilyClass = fontFamily === "serif" ? "font-serif font-light" : "font-sans font-light";

  return (
    <section className="relative pt-32 sm:pt-36 md:pt-40 lg:pt-48 pb-12 sm:pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className={`lg:col-span-7 text-center lg:text-left relative z-20 px-4 sm:px-6 lg:px-0 ${contentClassName}`}>
            <div className={`uppercase tracking-[0.25em] text-n-4 mb-6 md:mb-8 lg:mb-10 ${labelSizeClasses[fontSize]} ${lightFamilyClass}`}>
              {heroLabel}
            </div>
            <h1 className={`leading-[0.9] font-bold text-n-1 mb-8 md:mb-12 lg:mb-16 tracking-tighter ${titleSizeClasses[fontSize]} ${familyClass} ${titleClassName}`}>
              {renderHeroTitle(heroTitle)}
            </h1>
            <div className={`flex flex-wrap items-center gap-4 md:gap-6 lg:gap-8 text-n-4 tracking-wider ${metaSizeClasses[fontSize]} ${lightFamilyClass}`}>
              <span>{readTime}</span>
              <span className="w-1 h-1 rounded-full bg-n-6"></span>
              <span>{lastUpdated}</span>
              <span className="w-1 h-1 rounded-full bg-n-6"></span>
              <span className="hidden sm:inline">{location}</span>
            </div>
          </div>

          <div className={`lg:col-span-5 relative group z-10 mt-8 lg:mt-0 flex items-end ${visualClassName}`}>
            <div className="relative aspect-square w-full max-w-[336px] sm:max-w-[384px] md:max-w-[480px] mx-auto lg:max-w-none">
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <BackgroundCircles />
                </div>
              </div>
              <div className="relative z-10 h-full">
                <HeroParticleLogo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicPageHero;
