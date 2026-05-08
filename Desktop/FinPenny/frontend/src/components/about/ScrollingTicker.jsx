import React from 'react';

const ScrollingTicker = () => {
  const tickerItems = [
    "Smart Guidance",
    "Free Consultation",
    "Goal Planning",
    "SIP Investment",
    "Wealth Growth",
    "Trusted Support"
  ];

  // We double the array to ensure a seamless infinite loop
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <section className="bg-[#2B5C91] py-9 overflow-hidden mt-15 border-y border-white/10">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          @keyframes slow-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .animate-ticker {
            display: flex;
            width: max-content;
            animation: scroll 30s linear infinite;
          }

          .ticker-container:hover .animate-ticker {
            animation-play-state: paused;
          }

          .spinning-logo {
            animation: slow-spin 12s linear infinite;
          }
        `}
      </style>

      <div className="ticker-container relative flex ">
        <div className="animate-ticker flex items-center">
          {displayItems.map((item, index) => (
            <div key={index} className="flex items-center px-12 group">
              {/* Spinning Logo Image */}
              <img 
                src="https://finpenny.com/wp-content/uploads/2026/03/Untitled-design-11.png" 
                alt="Finpenny Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain spinning-logo"
              />
              
              {/* Title Text */}
              <span className="ml-6 text-white  uppercase text-[12px] md:text-[22px] whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingTicker;