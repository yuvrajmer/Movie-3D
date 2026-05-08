import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

const steps = [
  {
    id: "01",
    // Title split into light and bold parts based on screenshot
    title: { light: "Understand Your", bold: "Goals" },
    desc: "We begin by understanding your financial goals, investment horizon, and risk comfort to create the right investment direction.",
    icon: "https://nexta.themevally.com/wp-content/uploads/2024/11/icon-comercial.png",
  },
  {
    id: "02",
    title: { light: "Build Your", bold: "SIP Strategy" },
    desc: "Based on your goals, we recommend suitable mutual funds and design a disciplined SIP investment strategy.",
    icon: "https://nexta.themevally.com/wp-content/uploads/2024/11/icon-infomsg.png",
  },
  {
    id: "03",
    title: { light: "Track &", bold: "Review Progress" },
    desc: "Regular portfolio tracking and reviews help ensure your investments stay aligned with your financial goals.",
    icon: "https://nexta.themevally.com/wp-content/uploads/2024/11/icon-finished.png",
  },
];

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headingText = "Start Your Investment Journey in 3 Simple Steps";
  const words = headingText.split(" ");

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <style>
        {`
          @keyframes waveReveal {
            from { clip-path: inset(0 100% 0 0); transform: translateX(-20px); opacity: 0; }
            to { clip-path: inset(0 0 0 0); transform: translateX(0); opacity: 1; }
          }
          @keyframes jumpTwice {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-10px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(-10px); }
          }
          .animate-wave {
            display: inline-block;
            animation: waveReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
          }
          .hover-jump {
            animation: jumpTwice 0.6s ease-in-out;
          }
        `}
      </style>

      <div className="container mx-auto px-10">
        <div className="text-center mb-20 space-y-4">
          <div className={`flex items-center justify-center space-x-3 text-[#D9231D] transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-[#D9231D] p-1.5 rounded-full shadow-md">
              <ShieldCheck size={19} className="text-white" />
            </div>
            <span className="uppercase tracking-[0.2em] font-bold text-[16px]">Simple Process</span>
          </div>

          <h2 className="text-2xl md:text-4xl text-[#2B5A84] leading-tight font-bold">
            {words.map((word, i) => (
              <span key={i} className={`animate-wave ${isVisible ? "inline-block" : "hidden"}`} style={{ animationDelay: `${i * 0.1}s`, marginRight: "0.25em" }}>
                <span className={i >= words.length - 3 ? "text-black font-extrabold" : ""}>{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group flex flex-col items-center transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${(index + 2) * 200}ms` }}
            >
              {/* Image Icon and Title Row */}
              <div className="flex items-center space-x-4 w-full mb-8">
                <div className={`w-16 h-16 flex-shrink-0 transition-all duration-500 ${hoveredIndex === index ? "hover-jump" : ""}`}>
                  <img src={step.icon} alt={step.title.bold} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl text-[#2B5A84] text-left ml-4 leading-snug">
                  {step.title.light} <br />
                  <span className="font-bold">{step.title.bold}</span>
                </h3>
              </div>

              {/* Description */}
              <div className="w-full mt-5 text-left">
                <p className="text-slate-500 leading-relaxed text-[16px]">
                  {step.desc}
                </p>
              </div>

              {/* ID and Line Animation */}
              <div className="relative mt-10 pt-16 w-full flex flex-col items-center">
                <div className={`w-[2px] bg-[#2B5A84] transition-all duration-700 ease-in-out absolute top-0 ${hoveredIndex === index ? "h-12 opacity-100" : "h-0 opacity-0"}`}>
                  <div className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-[#2B5A84]" />
                </div>
                <span className={`text-lg font-bold transition-all duration-500 mt-4 ${hoveredIndex === index ? "text-[#2B5A84] scale-110" : "text-slate-300"}`}>
                  {step.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;