import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Plus, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: "01.",
    title: "Mutual Fund Investments",
    desc: "Smart mutual fund investing designed for disciplined wealth",
    icon: "https://finpenny.com/wp-content/uploads/2025/05/1.png",
    link: "/mutual-funds",
  },
  {
    id: "02.",
    title: "SIP Planning",
    desc: "Build wealth step-by-step with consistent SIP",
    icon: "https://finpenny.com/wp-content/uploads/2025/05/2.png",
    link: "/sip-planning",
  },
  {
    id: "03.",
    title: "ELSS (Tax Saving)",
    desc: "Tax-efficient investing designed for long-term financial",
    icon: "https://finpenny.com/wp-content/uploads/2025/05/3.png",
    link: "/elss-tax-saving",
  },
  {
    id: "04.",
    title: "Goal Based Investments",
    desc: "Invest with purpose and stay focused on your financial",
    icon: "https://finpenny.com/wp-content/uploads/2025/05/4.png",
    link: "/goal-based-investments",
  },
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
    <section
      ref={sectionRef}
      className="py-24 bg-[#2B5A84] relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* HEADING BOX */}
          <div
            className={`flex flex-col space-y-6 mb-10 lg:mb-0 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="flex items-center space-x-3 text-white">
              {/* Updated Header Icon to match reference */}
              <div className="bg-primary-red p-1 rounded-full text-white">
                  <ShieldCheck size={19} />
                </div>
              <span className="uppercase tracking-[0.2em] font-semibold text-[16px]">
                Services
              </span>
            </div>
            <p className="text-5xl text-white leading-tight">
              Smarter <br /> <span className="font-bold">Investing</span> <br />{" "}
              Starts Here
            </p>

            <Link to="/mutual-funds">
              <button className="w-fit flex items-center space-x-3 bg-white text-[#2B5A84] px-8 py-4 rounded-full font-bold hover:bg-[#D9231D] hover:text-white transition-all duration-500 group shadow-xl uppercase text-xs tracking-widest">
                <span>All Services</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </button>
            </Link>
          </div>

          {/* SERVICES CARDS */}
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative p-10 rounded-3xl cursor-pointer h-full flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"}
                ${hoveredIndex === index ? "bg-[#1E4162] shadow-2xl" : "bg-white shadow-lg"}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* ID Number - Color changed to theme blue for visibility */}
              <span
                className={`absolute top-8 right-8 font-bold text-xl transition-all duration-500 
    ${hoveredIndex === index ? "text-white/20" : "text-[#2B5A84]"}`}
              >
                {service.id}
              </span>

              {/* STAGGERED CONTENT ENTRY */}
              <div
                className={`transition-all duration-700 delay-[300ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div className="mb-8 h-16 w-16">
                  <img
                    src={service.icon}
                    alt=""
                    /* Applied filter-theme-blue for normal state */
                    className={`w-full h-full object-contain transition-all duration-500 ${hoveredIndex === index ? "brightness-0 invert" : "filter-theme-blue"}`}
                  />
                </div>
              </div>

              <div
                className={`w-full h-[1px] mb-8 transition-all duration-700 delay-[400ms] ${isVisible ? "scale-x-100" : "scale-x-0"} ${hoveredIndex === index ? "bg-white/20" : "bg-gray-100"} origin-left`}
              ></div>

              <div className="flex-grow space-y-4">
                <h3
                  className={`text-2xl font-bold transition-all duration-700 delay-[500ms] 
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  ${hoveredIndex === index ? "text-white" : "text-[#2B5A84]"}`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-[15px] leading-relaxed transition-all duration-700 delay-[600ms]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  ${hoveredIndex === index ? "text-white/80" : "text-slate-500"}`}
                >
                  {service.desc}
                </p>
              </div>

              {/* INTERACTION AREA */}
              <div className="mt-8 flex items-center h-12 overflow-hidden transition-all duration-700 delay-[700ms]">
                <div className="relative w-full h-full">
                  <div
                    className={`absolute inset-0 flex items-center transition-all duration-500 ${hoveredIndex === index ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}
                  >
                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-[#2B5A84] group-hover:scale-90 transition-transform">
                      <Plus size={22} />
                    </div>
                  </div>

                  <Link
                    to={service.link}
                    className={`absolute inset-0 flex items-center transition-all duration-500 ${hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  >
                    <div className="flex items-center space-x-3 text-white bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg">
                      <Plus size={18} /> <span>View Details</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
