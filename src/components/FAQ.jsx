import { useState } from "react";
import Section from "./Section";

const FAQ = ({ 
  title = "Preguntas frecuentes",
  subtitle = "¿No encuentras lo que buscas?",
  contactText = "Contáctanos",
  faqs = [],
  className = "",
  sectionClassName = "overflow-hidden relative"
}) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <Section className={sectionClassName}>
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 opacity-2 rotate-45">
        <img src="/wearecircleup/assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className={`container relative z-2 ${className}`}>
        <div className="grid gap-6 md:gap-8 lg:gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h2 mb-4">{title}</h2>
            <p className="body-1 text-n-4 mb-6">
              {subtitle} <span className="text-color-1 cursor-pointer hover:underline">{contactText}</span>
            </p>
          </div>
          
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-t border-n-6 first:border-t-0 last:border-b border-b-n-6">
                <button 
                  className="w-full px-0 py-4 sm:py-6 text-left flex items-center justify-between hover:text-color-1 transition-colors group"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={expandedFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-n-1 font-medium text-base sm:text-lg pr-4 group-hover:text-color-1 transition-colors">
                    {faq.question}
                  </span>
                  <span className="text-n-3 text-xl sm:text-2xl font-light flex-shrink-0 transition-transform duration-200 ease-in-out">
                    {expandedFAQ === index ? '−' : '+'}
                  </span>
                </button>
                {expandedFAQ === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="pb-4 sm:pb-6 -mt-2 transition-all duration-300 ease-out"
                  >
                    <p className="text-n-3 leading-relaxed pr-4 sm:pr-8 text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </Section>
  );
};

export default FAQ;
