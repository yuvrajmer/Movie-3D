import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Wand2,
  Target,
  BarChart3,
  Check,
  ShieldCheck,
} from "lucide-react";

const commitments = [
  {
    title: "Smart Scheme Selection",
    desc: "We help you choose suitable mutual fund schemes based on your financial goals, investment horizon, and risk comfort.",
    icon: <Wand2 className="w-6 h-6" />,
  },
  {
    title: "Goal-Based Portfolio Planning",
    desc: "Your investments are mapped to specific financial goals, ensuring a structured approach toward long-term wealth creation.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "Portfolio Review & Continuous Support",
    desc: "Regular portfolio reviews and ongoing guidance help keep your investments aligned with your goals and changing market conditions.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

const WhyFinpenny = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT CONTENT - KEPT EXACTLY THE SAME */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-primary-red p-1 rounded-full text-white">
                <ShieldCheck size={19} />
              </div>
              <span className="uppercase tracking-[0.2em] font-bold text-[16px] text-[#D9231D]">
                Why Finpenny
              </span>
            </div>

            <h2 className="text-5xl text-[#2B5A84] leading-tight">
              Trusted Guidance for <br />
              <span className="font-semibold text-[#2B5A84]">
                Smarter Investing
              </span>
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              With professional financial expertise and a structured advisory
              approach, Finpenny supports investors in making smarter financial
              choices for the future.
            </p>

            <ul className="space-y-4">
              {[
                "Start Your Investment Journey Today",
                "Build Wealth with the Right Strategy",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-3 text-[#2B5A84] font-bold"
                >
                  {/* Red circle wrapper */}
                  <div className="bg-[#D9231D] rounded-full p-1 flex items-center justify-center min-w-[19px] h-[21px]">
                    <Check size={13} className="text-white stroke-[4px]" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button className="flex items-center space-x-3 bg-[#2B5A84] text-white px-8 py-4 rounded-full font-bold hover:bg-[#D9231D] transition-all duration-300 group shadow-xl">
              <span className="text-sm uppercase tracking-widest">
                More About
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </button>
          </div>

          {/* RIGHT CONTENT - ONLY THE ICONS UPDATED */}
          <div className="space-y-10">
            <div
              className={`flex items-start space-x-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="mt-1">
                {/* Red circle wrapper */}
                <div className="bg-[#D9231D] rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-lg shadow-red-100">
                  <Check size={30} className="text-white stroke-[4px]" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#2B5A84] leading-snug max-w-xs">
                We Are Committed to Your Financial Growth
              </h3>
            </div>

            <div className="w-full h-[1px] bg-slate-100"></div>

            <div className="space-y-12">
              {commitments.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-6" /* Added "group" here */
                  style={{
                    transitionDelay: `${(index + 4) * 150}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDuration: "700ms",
                  }}
                >
                  {/* ONLY CHANGED CLASSES BELOW: Added group-hover for red color and jump animation */}
                  <div className=" mt-1 flex-shrink-0 w-20 h-20 rounded-xl border border-slate-200 flex items-center justify-center text-[#2B5A84] bg-slate-50 transition-all duration-300 group-hover:bg-[#D9231D] group-hover:text-white group-hover:animate-[icon-vibrate-jump_0.5s_ease-in-out]">
                    {item.icon}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-[#2B5A84]">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-[16px]">
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

export default WhyFinpenny;
