import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

const AboutFinpenny = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationKey((prev) => prev + 1);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const headingText =
    "Helping You Invest Smarter for a Secure Financial Future";
  const words = headingText.split(" ");

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <style>
        {`
          @keyframes waveReveal {
            from {
              clip-path: inset(0 100% 0 0);
              transform: translateX(-20px);
              opacity: 0;
            }
            to {
              clip-path: inset(0 0 0 0);
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-wave {
            display: inline-block;
            animation: waveReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
          }
        `}
      </style>

      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Side: Exact Overlap Image Layout */}
          <div
            className={`lg:w-1/2 relative flex items-center justify-center transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Background Image (The wood/pattern background) */}
            <div className="relative w-full max-w-[550px]">
              <img
                src="https://nexta.themevally.com/wp-content/uploads/2024/12/inner-thumb-bg.png"
                alt="Background Decor"
                className="w-full h-auto rounded-2xl opacity-100"
              />

              {/* Foreground Image (The Lady) - Positioned centered and overlapping */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] h-[104%] -mt-4  ">
                  <img
                    src="https://finpenny.com/wp-content/uploads/2026/03/Untitled-design-7-scaled.png"
                    alt="Ms. Nirmita Shah"
                    className="w-full h-full object-cover transition-transform duration-700 "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2 space-y-6">
            <div
              className={`flex items-center space-x-3 text-[#D9231D] transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <div className="bg-[#D9231D] p-1.5 rounded-full shadow-sm">
                <ShieldCheck size={19} className="text-white" />
              </div>
              <span className="uppercase tracking-[0.2em] font-bold text-[16px]">
                About Finpenny
              </span>
            </div>

            {/* Wave Reveal Heading */}
            <h2
              key={animationKey}
              className="text-4xl md:text-4xl text-[#2B5A84] leading-tight"
            >
              {words.map((word, i) => (
                <span
                  key={`${animationKey}-${i}`}
                  className={`animate-wave ${isVisible ? "inline-block" : "hidden"}`}
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    marginRight: "0.25em",
                  }}
                >
                  <span
                    className={
                      word === "Financial" || word === "Future"
                        ? "text-[#2B5A84] font-extrabold"
                        : ""
                    }
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <div
              className={`space-y-6 text-slate-600 leading-relaxed text-[16px] transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Added "text-justify" to the paragraph tags below */}
              <p className="text-justify">
                Finpenny was founded with a clear purpose that successful
                investing begins with consistency, clarity and the right
                guidance. Our mission is to make mutual fund investing
                straightforward and accessible for individuals who are serious
                about building their financial future. The firm is led by{" "}
                <strong>Ms. Nirmita Shah, CFP®, Founder of Finpenny</strong> and
                an AMFI Registered Mutual Fund Distributor. As a Certified
                Financial Planner (CFP®), she follows a disciplined and ethical
                approach to financial guidance, placing the client's interests
                and goals at the center of every recommendation.
              </p>

              <p className="text-justify">
                At Finpenny, we work closely with young professionals and
                first-time corporate earners who are beginning their investment
                journey. Through clear communication and structured investment
                planning, we help clients understand how consistent investing in
                mutual funds can play a powerful role in achieving their
                financial goals. Our focus is not just on investments, but on
                building long-term relationships based on transparency,
                reliability and trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFinpenny;
