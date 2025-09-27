import { check, curve } from "../assets";
// import logo from "../assets/circleimages/logo.svg";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import Section from "./Section";

const Collaboration = () => {
  return (
    <Section crosses>
      <div className="container lg:flex">
        <div className="max-w-[25rem] px-4 lg:px-0">
          <h2 className="h2 mb-4 md:mb-8 text-center lg:text-left">
            Herramientas que potencian nuestro
            <span className="inline-block relative font-semibold">
              ecosistema
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14 mx-auto lg:mx-0">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img
                    src={check}
                    width={20}
                    alt="check"
                    height={20}
                    className="pointer-events-none select-none md:w-6 md:h-6"
                  />
                  <h6 className="body-2 ml-3 md:ml-5 text-sm md:text-base">{item.title}</h6>
                </div>

                {item.text && (
                  <p className="body-2 mt-2 md:mt-3 text-n-4 text-sm md:text-base ml-6 md:ml-8">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <div className="text-center lg:text-left">
            <Button>Ver talleres</Button>
          </div>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-8 lg:mt-4 px-4 lg:px-0">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[32rem] lg:mx-auto text-center lg:text-left text-sm md:text-base">
            {collabText}
          </p>

          <div className="relative left-1/2 flex w-[18rem] sm:w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale-75 sm:scale-90 md:scale-100">
            <div className="flex w-48 sm:w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-20 sm:w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src="/wearecircleup/assets/circleimages/logo.svg"
                    width={32}
                    height={32}
                    alt="CircleUp Logo"
                    className="sm:w-12 sm:h-12"
                  />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, i) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.2rem] sm:-ml-[1.6rem] origin-bottom`}
                  style={{ transform: `rotate(${i * 45}deg)` }}
                >
                  <div
                    className={`relative -top-[1.2rem] sm:-top-[1.6rem] flex w-[2.4rem] h-[2.4rem] sm:w-[3.2rem] sm:h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl animate-pulse`}
                    style={{ transform: `rotate(-${i * 45}deg)` }}
                  >
                    <img
                      src={app.icon}
                      alt={app.title}
                      width={app.height}
                      height={app.height}
                      className="m-auto w-4 h-4 sm:w-6 sm:h-6"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
