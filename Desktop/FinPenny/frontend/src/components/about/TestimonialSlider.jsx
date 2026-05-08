import React, { useState, useEffect, useRef } from "react";
import { Quote, Star, ShieldCheck } from "lucide-react";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isResetting, setIsResetting] = useState(false); // Controls the "speedy" return
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      title: "Clear Investment Guidance",
      author: "Mr. Yuvraj singh",
      content:
        "I have been working with Nirmita ji for my investment planning, and her expertise has been invaluable. She takes a highly disciplined and data-driven approach to wealth management. What I appreciate most is her ability to explain complex market trends in a way that is easy to understand. My portfolio is now much better structured, and I feel confident about my long-term financial goals.",
    },
    {
      id: 2,
      title: "Reliable SIP Guidance",
      author: "Ms. Bonisha",
      content:
        "Reliable guidance for SIP investments and always responsive to queries.",
    },
    {
      id: 3,
      title: "Optimized Financial Returns",
      author: "Mr. Nirav Shah",
      content:
        "I have been working with Nirmita Shah for over Four years, and their expertise has optimized my financial Returns. As a busy professional, I appreciate their clear, personalized investment Plans in Different Segments & building a secure portfolio. Their proactive approach and honest communication gave me complete peace of mind—I highly recommend them to anyone seeking reliable financial guidance.",
    },
    {
      id: 4,
      title: "Expert Wealth Management",
      author: "Mr. Amit Sharma",
      content:
        "The level of transparency and structured planning is exceptional. They helped me transition from random savings to a goal-oriented investment strategy.",
    },
    {
      id: 5,
      title: "Future-Proof Planning",
      author: "Mrs. Priya Das",
      content:
        "Finpenny helped me understand that investing isn't just about the next year, but the next decade. Their youth-focused guidance is perfect for professionals.",
    },
    {
      id: 6,
      title: "Seamless Support",
      author: "Mr. Rohan Mehta",
      content:
        "The team is always available to answer my questions. They provide a very structured approach to sustainable financial growth and long-term wealth creation.",
    },
  ];

  // Total pages = Total items - (items per view - 1) => 6 - 2 = 4 pages
  const totalPages = testimonials.length - 2;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= totalPages - 1) {
          // Trigger the "speedy" return
          setIsResetting(true);
          return 0;
        } else {
          setIsResetting(false);
          return prev + 1;
        }
      });
    }, 4000); // 4 seconds normal slide

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [totalPages]);

  // Logic to split the heading into two lines
  const line1Text = "What's our satisfied clients";
  const line2Text = "feedback about Finpenny";

  const line1Words = line1Text.split(" ");
  const line2Words = line2Text.split(" ");

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
          }
          .testimonial-container {
            display: flex;
            transition: transform ${isResetting ? "0.5s ease-in-out" : "1.2s cubic-bezier(0.4, 0, 0.2, 1)"};
          }
        `}
      </style>

      <div className="container mx-auto ">
        {/* Updated Header Section with 2 Lines */}
        <div className="text-center mb-20 space-y-4">
          <div
            className={`flex items-center justify-center space-x-2 text-[#D9231D] transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="bg-[#D9231D] p-1 rounded-full">
              <ShieldCheck
                size={16}
                className="text-white"
                fill="currentColor"
              />
            </div>
            <span className="uppercase tracking-[0.2em] font-bold text-[19px]">
              Testimonial
            </span>
          </div>

          <h2 className="text-4xl md:text-4xl text-[#2B5A84] leading-tight max-w-5xl mx-auto">
            {/* First Line */}
            <span className="block">
              {isVisible &&
                line1Words.map((word, i) => (
                  <span
                    key={`l1-${i}`}
                    className="animate-wave"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      marginRight: "0.25em",
                    }}
                  >
                    {word}
                  </span>
                ))}
            </span>

            {/* Second Line */}
            <span className="block">
              {isVisible &&
                line2Words.map((word, i) => (
                  <span
                    key={`l2-${i}`}
                    className="animate-wave"
                    style={{
                      animationDelay: `${(line1Words.length + i) * 0.08}s`,
                      marginRight: "0.25em",
                    }}
                  >
                    <span
                      className={word === "feedback" ? "text-[#D9231D]" : ""}
                    >
                      {word}
                    </span>
                  </span>
                ))}
            </span>
          </h2>
        </div>

        {/* Sliding Window */}
        <div className="relative overflow-hidden mb-16">
          <div
            className="testimonial-container"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="min-w-[33.333%] px-6">
                <div className="group flex flex-col min-h-[380px]">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-4">
                      <Quote
                        className="text-[#2B5A84]"
                        size={20}
                        fill="currentColor"
                      />
                      <h3 className="text-[20px] font-semibold text-[#2B5A84]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex text-orange-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                      <span className="ml-2 text-slate-500 text-sm font-semibold">
                        5
                      </span>
                    </div>
                    <p className="text-slate-600 text-[15px] leading-[1.8] text-justify">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-8 pb-6 relative">
                    <p className="font-bold text-[#2B5A84] text-lg">
                      {item.author}
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#E5F4F6] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2B5A84]/10 transition-all duration-700 group-hover:bg-[#2B5A84]/40 w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Page Dots */}
        <div className="flex justify-center items-center space-x-3 mb-20">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsResetting(false);
                setCurrentIndex(i);
              }}
              className={`transition-all duration-500 rounded-full ${
                currentIndex === i
                  ? "w-10 h-2 bg-[#2B5A84]"
                  : "w-2 h-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
