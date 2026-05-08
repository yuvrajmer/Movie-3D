import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalHeight) * 100;
      setScrollProgress(progress);

      if (currentScroll > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-8 right-8 z-[999] transition-all duration-500 transform ${
        showButton ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-2xl group active:scale-90"
      >
        <svg className="absolute w-full h-full -rotate-90">
          <circle cx="28" cy="28" r={radius} stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
          <circle
            cx="28" cy="28" r={radius}
            stroke="#D9231D" strokeWidth="3" fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.1s linear' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="relative z-10 text-[#2B5A84] group-hover:text-[#D9231D] transition-colors">
          <ArrowUp size={24} strokeWidth={3} />
        </div>
      </button>
    </div>
  );
};

export default ScrollToTop;