import React from 'react';
import { ChevronRight } from 'lucide-react';

const EssentialHero = () => {
  // Updated background image to match the financial/calculator aesthetic in your image
  const bgImage = "https://finpenny.com/wp-content/uploads/2026/03/4-1-1536x449.png";

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
        {/* The specific dark teal/blue overlay for consistent branding */}
        <div className="absolute inset-0 bg-[#1a2f27]/65 backdrop-blur-[1px]"></div>
      </div>

      <div className="container px-22 relative pt-40 z-10">
        <div className="max-w-4xl">
          {/* Main Heading - Changed to Essentials */}
          <h1 className="text-white text-6xl md:text-6xl font-bold mb-5 tracking-tight">
            Essentials
          </h1>

          {/* Breadcrumbs - Matching Home -> Essentials */}
          <div className="flex items-center space-x-3 text-white/90 font-medium text-lg">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            
            <div className="flex items-center">
              <div className="w-8 h-[1px] bg-white/60"></div>
              <ChevronRight size={18} className="-ml-1" />
            </div>

            <span className="text-white/70">Essentials</span>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default EssentialHero;