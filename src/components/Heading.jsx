import Tagline from "./Tagline";

const Heading = ({ className, title, text, tag, fontSize = 'normal' }) => {
  return (
    <div
      className={`${
        className || ""
      } max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <Tagline className="mb-4 md:justify-center">{tag}</Tagline>}
      {title && <h2 className={`h2 ${
        fontSize === 'small' 
          ? 'text-[clamp(1.5rem,3vw,2.5rem)]' 
          : fontSize === 'large'
          ? 'text-[clamp(2.5rem,5vw,4rem)]'
          : 'text-[clamp(2rem,4vw,3rem)]'
      }`}>{title}</h2>}
      {text && <p className={`body-2 mt-4 text-n-4 ${
        fontSize === 'small' 
          ? 'text-[clamp(0.875rem,1.5vw,1.125rem)]' 
          : fontSize === 'large'
          ? 'text-[clamp(1.25rem,2.5vw,1.875rem)]'
          : 'text-[clamp(1rem,2vw,1.5rem)]'
      }`}>{text}</p>}
    </div>
  );
};

export default Heading;
