import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  ArrowRight,
  TrendingUp,
  Search,
  ShieldCheck,
} from "lucide-react";

const AboutSection = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = 6;
    if (start === end) return;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 200);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Image with Animated Badge */}
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src="https://finpenny.com/wp-content/uploads/2026/03/Untitled-design-13.png"
                alt="FinPenny Office"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute -bottom-10 -right-4 bg-primary-blue text-white p-8 rounded-2xl shadow-2xl min-w-[180px] text-center animate-bounce-subtle">
              <h2 className="text-5xl font-bold mb-2">
                {count}
                <span className="text-primary">+</span>
              </h2>
              <p className="text-sm font-medium leading-tight opacity-90 uppercase tracking-wider">
                Years of <br /> Experience
              </p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="about-subheading">
                <div className="bg-primary-red p-1 rounded-full text-white">
                  <ShieldCheck size={19} />
                </div>
                <span className="text-[16px] font-semibold">
                  About FinPenny
                </span>
              </div>

              <h2 className="section-heading font-inter">
                Helping You Invest Smarter for a <br />
                <span className="font-extrabold">Secure Future</span>
              </h2>

              <p className="text-slate-500 text-[16px] leading-relaxed">
                FINPENNY is a trusted mutual fund distributor providing
                disciplined SIP planning, tax-efficient investment solutions,
                and goal-based portfolio strategies for working professionals
                across India.
              </p>
            </div>

            {/* Feature Circles with Jump Animation */}
            <div className="grid grid-cols-2 gap-6 py-2">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="feature-circle animate-jump-vibrate">
                  <TrendingUp size={24} />
                </div>
                <span className="text-primary-blue font-bold text-[15px] leading-snug">
                  Personal Financial Goal <br /> Planning
                </span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="feature-circle animate-jump-vibrate">
                  <Search size={24} />
                </div>
                <span className="text-primary-blue font-bold text-[15px] leading-snug">
                  Portfolio Review & <br /> Ongoing Support
                </span>
              </div>
            </div>

            {/* Checklist with Square Icons */}
            <div className="space-y-3">
              {[
                "Structured & transparent investment process",
                "Youth-focused, beginner-friendly approach",
                "CFP® Certified & AMFI Registered",
                "Long-term investor relationship management",
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-3">
                  {/* Wrapper changed to a red circle */}
                  <div className="bg-red-600 rounded-full p-0.5 flex items-center justify-center min-w-[20px] h-[20px]">
                    <Check size={12} className="text-white stroke-[4px]" />
                  </div>
                  <span className="text-primary-blue font-bold text-[15.5px]">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* More About Button */}
            <Link to="/about">
              <button className="flex items-center space-x-3 bg-primary-blue text-white px-9 py-4 rounded-full font-bold hover:bg-primary-red transition-all group shadow-lg shadow-blue-900/20">
                <span>More About</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
