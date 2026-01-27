import Section from "./Section";
import Logo from "./Logo";

const RoadmapSection = ({ 
  quote, 
  authorTitle, 
  authorRole, 
  steps,
  fontSize = 'normal'
}) => {
  return (
    <Section className="overflow-hidden relative">
      {/* Background elements with modern design */}
      <div className="absolute inset-0 opacity-5">
        <img src="/src/assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="container relative z-2">
        <div className="flex justify-center mb-16">
          <div className="relative max-w-[50rem] p-8 border border-n-1/10 rounded-3xl bg-n-8/80 backdrop-blur-sm">
            {/* Quote icon */}
            <div className="absolute top-6 left-8">
              <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 32V16C0 7.2 7.2 0 16 0V8C11.6 8 8 11.6 8 16V20H16V32H0ZM24 32V16C24 7.2 31.2 0 40 0V8C35.6 8 32 11.6 32 16V20H40V32H24Z" fill="#AC6AFF"/>
              </svg>
            </div>
            
            {/* Content */}
            <div className="pt-8">
              <p className={`body-1 mb-8 text-n-1 font-mono ${
                fontSize === 'small' 
                  ? 'text-base md:text-lg' 
                  : fontSize === 'large'
                  ? 'text-2xl md:text-3xl'
                  : 'text-xl md:text-2xl'
              }`}>
                {quote}
              </p>
              
              {/* Author info */}
              <div className="flex items-center">
                <div className="mr-4">
                  <Logo 
                    logoSize={{ width: 48, height: 48 }}
                    textSize="text-xs"
                    showText={false}
                  />
                </div>
                <div>
                  <h6 className="h6 text-n-1">{authorTitle}</h6>
                  <p className="body-2 text-n-4">{authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-n-6"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="absolute left-1/3 w-4 h-4 bg-purple-500 rounded-full border-4 border-n-8 transform -translate-x-1/2 z-10 mt-1">
                  {step.completed && (
                    <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-500 text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                {/* Date on the left */}
                <div className="w-1/3 pr-8 text-right">
                  <div className="inline-block px-3 py-1 bg-n-7 rounded text-xs font-code font-bold tracking-wider uppercase text-n-4">
                    [ {step.date} ]
                  </div>
                </div>
                
                {/* Content on the right */}
                <div className="flex-1 pl-8">
                  <h3 className={`font-semibold text-n-1 mb-3 flex items-center ${
                    fontSize === 'small' 
                      ? 'text-xl md:text-2xl' 
                      : fontSize === 'large'
                      ? 'text-3xl md:text-4xl'
                      : 'text-2xl md:text-3xl'
                  }`}>
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    {step.title}
                  </h3>
                  <p className={`text-n-4 max-w-xl ${
                    fontSize === 'small' 
                      ? 'text-base md:text-lg' 
                      : fontSize === 'large'
                      ? 'text-xl md:text-2xl'
                      : 'text-lg md:text-xl'
                  }`}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default RoadmapSection;
