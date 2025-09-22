import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="flex gap-4 md:gap-[1rem] max-lg:flex-wrap px-4 lg:px-0">
      {pricing.map((plan, i) => (
        <div
          key={plan.id}
          className="w-full sm:w-[19rem] max-lg:w-full h-full px-4 sm:px-6 bg-n-8 border border-n-6 rounded-xl sm:rounded-[2rem] lg:w-auto even:py-8 sm:even:py-14 odd:py-6 sm:odd:py-8 odd:my-2 sm:odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <h4 className="h4 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl">{plan.title}</h4>
          <p className="body-2 min-h-[3rem] sm:min-h-[4rem] mb-3 text-n-1/50 text-sm sm:text-base">
            {plan.description}
          </p>

          <div className="flex items-center h-[4rem] sm:h-[5.5rem] mb-4 sm:mb-6">
            {plan.price && (
              <>
                <div className="h-2 sm:h-3 text-lg sm:text-xl">$</div>
                <div className="text-3xl sm:text-[5.5rem] leading-none font-bold">
                  {plan.price}
                </div>
              </>
            )}
          </div>

          <Button
            className="w-full mb-4 sm:mb-6 text-sm sm:text-base py-2 sm:py-3"
            href={plan.price ? "#" : "mailto:info@example.com"}
            white={!plan.premium}
          >
            {plan.price ? "Get started" : "Contact us"}
          </Button>

          <ul>
            {plan.features.map((feature, j) => (
              <li
                key={`plan-${i}-feature-${j}`}
                className="flex items-start py-3 sm:py-5 border-t border-n-6"
              >
                <img
                  src={check}
                  alt="Check"
                  width={20}
                  height={20}
                  className="pointer-events-none select-none sm:w-6 sm:h-6 mt-0.5"
                />
                <p className="body-2 ml-3 sm:ml-4 text-sm sm:text-base">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
