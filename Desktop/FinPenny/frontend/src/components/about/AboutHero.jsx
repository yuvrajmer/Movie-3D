import React from 'react';
import { ChevronRight } from 'lucide-react';

const AboutHero = () => {
  // Using a placeholder that matches the desk/laptop/plant aesthetic of your image
  const bgImage = "/images/2-3.png";

  return (
    <div className="relative h-[550px] w-full flex items-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* The specific dark teal/blue overlay from your image */}
        <div className="absolute inset-0 bg-[#1a2f33]/80 backdrop-blur-[1px]"></div>
      </div>

      <div className="container px-22 relative pt-40 z-10">
        <div className="max-w-4xl">
          {/* Main Heading - Exact Font Style */}
          <h1 className="text-white text-6xl md:text-6xl font-bold  mb-5 tracking-tight">
            About Us
          </h1>

          {/* Breadcrumbs - Matching the exact arrow and spacing */}
          <div className="flex items-center space-x-3 text-white/90 font-medium text-lg">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            
            <div className="flex items-center">
              <div className="w-8 h-[1px] bg-white/60"></div>
              <ChevronRight size={18} className="-ml-1" />
            </div>

            <span className="text-white/70">About Us</span>
          </div>
        </div>
      </div>

      {/* Decorative element: Matching the "Finpenny" logo placement on the laptop in your image */}
      <div className="absolute right-20 hidden lg:block opacity-20 pointer-events-none">
         <div className="border-[12px] border-white/10 rounded-full w-64 h-64 flex items-center justify-center text-8xl font-bold text-white/10">
           @
         </div>
      </div>
    </div>
  );
};

export default AboutHero;