import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Key to force re-animation
  const sectionRef = useRef(null);

  const data = [
    {
      id: "01",
      title: "AMFI Registered",
      desc: "We operate as an AMFI registered mutual fund distributor, ensuring compliance, credibility, and trusted investment guidance.",
      image: "https://finpenny.com/wp-content/uploads/2026/03/1-1.png"
    },
    {
      id: "02",
      title: "CFP® Certified",
      desc: "Our guidance is backed by professional expertise to help investors make well-informed investment decisions.",
      image: "https://finpenny.com/wp-content/uploads/2026/03/2-2.png"
    },
    {
      id: "03",
      title: "Youth-Focused Guidance",
      desc: "We specialize in helping young professionals start their investment journey early and build long-term wealth through disciplined investing.",
      image: "https://finpenny.com/wp-content/uploads/2026/03/3.png"
    },
    {
      id: "04",
      title: "Transparent & Structured Approach",
      desc: "Our investment process focuses on clarity, goal-based planning, and structured strategies designed for sustainable financial growth.",
      image: "https://finpenny.com/wp-content/uploads/2026/03/4.png"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Increment key to restart the animation timeline
          setAnimationKey(prev => prev + 1); 
        } else {
          // Reset when scrolling away so it can trigger again
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headingText = "Trusted Guidance for Smarter Investing";
  const words = headingText.split(" ");

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <style>
        {`
          @keyframes waveReveal {
            from { clip-path: inset(0 100% 0 0); transform: translateX(-20px); opacity: 0; }
            to { clip-path: inset(0 0 0 0); transform: translateX(0); opacity: 1; }
          }
          .animate-wave {
            display: inline-block;
            animation: waveReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
          }
        `}
      </style>

      <div className="container mx-auto  mt-10">
        <div className="text-center mb-16 space-y-4">
          <div className={`flex items-center justify-center space-x-2 text-[#D9231D] transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#D9231D] p-1.5 rounded-full">
              <ShieldCheck size={19} className="text-white" />
            </div>
            <span className="uppercase tracking-[0.2em] font-bold text-[16px]">Why Choose Us</span>
          </div>
          
          {/* Using animationKey here ensures the heading re-renders and re-animates */}
          <h2 key={animationKey} className="text-4xl md:text-5xl text-[#2B5A84] leading-tight">
            {words.map((word, i) => (
              <span 
                key={`${animationKey}-${i}`} 
                className={`animate-wave ${isVisible ? 'inline-block' : 'hidden'}`}
                style={{ animationDelay: `${i * 0.1}s`, marginRight: '0.25em' }}
              >
                <span className={word === "Smarter" || word === "Investing" ? "text-[#2B5A84] font-extrabold" : ""}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 mt-10 lg:gap-24">
          <div className="lg:w-1/2 relative min-h-[450px] w-full flex items-center justify-center">
            {data.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform 
                  ${activeTab === index 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="lg:w-1/2 mt-8 relative">
            <div className="absolute left-[26px] top-6 bottom-6 w-[1px] bg-gray-100 z-0"></div>
            <div className="space-y-10 relative z-10">
              {data.map((item, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setActiveTab(index)}
                  className="flex items-start cursor-default"
                >
                  <div className={`
                    min-w-[52px] h-[52px] rounded-full flex items-center justify-center text-[15px] font-bold transition-colors duration-300 border-2
                    ${activeTab === index 
                      ? 'bg-[#D9231D] text-white border-[#D9231D]' 
                      : 'bg-white text-gray-400 border-gray-100'}
                  `}>
                    {item.id}
                  </div>

                  <div className="ml-8">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${activeTab === index ? 'text-[#2B5A84]' : 'text-slate-700'}`}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-justify text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;