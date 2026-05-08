import React from 'react';
import { ChevronRight } from 'lucide-react';

const ContactHero = () => {
  // Professional contact/communication themed image
  const bgImage = "/images/1-2.png";

  return (
    <div className="relative h-[550px] w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-95"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Proper and Clean Black Background Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>
      </div>

      <div className="container px-22 relative pt-40 z-10">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-white text-6xl md:text-6xl font-bold mb-5 tracking-tight">
            Contact Us
          </h1>

          {/* Breadcrumbs - Matching Home -> Contact Us */}
          <div className="flex items-center space-x-3 text-white/90 font-medium text-lg">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            
            <div className="flex items-center">
              <div className="w-8 h-[1px] bg-white/60"></div>
              <ChevronRight size={18} className="-ml-1" />
            </div>

            <span className="text-white/70">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Decorative element: Consistent branding icon */}
      <div className="absolute right-20 hidden lg:block opacity-20 pointer-events-none">
         <div className="border-[12px] border-white/10 rounded-full w-64 h-64 flex items-center justify-center text-8xl font-bold text-white/10">
           @
         </div>
      </div>
    </div>
  );
};

export default ContactHero;