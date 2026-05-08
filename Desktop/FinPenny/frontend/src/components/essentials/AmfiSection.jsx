import React from 'react';

const AmfiSection = () => {
  return (
    <section className="py-24 bg-white mt-20">
      <div className="container mx-auto">
        
        {/* First Row: AMFI Info (Logo Left, Text Right) */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="https://finpenny.com/wp-content/uploads/2026/03/1-e1773022826878.png" 
              alt="AMFI Logo" 
              className="max-w-[600px] w-full h-auto object-contain"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-5">
            {/* Added text-justify to make start and end widths the same */}
            <p className="text-slate-600 leading-relaxed text-[16px] text-justify">
              <span className="font-bold text-slate-800">The Association of Mutual Funds in India (AMFI)</span> is a non-profit organization established on 22 August 1995. It represents Asset Management Companies (AMCs) registered with the Securities and Exchange Board of India (SEBI) and works towards strengthening the mutual fund industry in India.
            </p>
            <p className="text-slate-600 leading-relaxed text-[16px] text-justify">
              The primary objectives of AMFI include promoting the growth and development of the mutual fund sector, enhancing investor awareness, and maintaining high ethical and professional standards across the industry.
            </p>
            <p className="text-slate-600 text-[16px]">
              For more information, visit: <a href="https://www.amfiindia.com" target="_blank" rel="noreferrer" className="text-[#2B5A84] font-bold hover:underline">www.amfiindia.com</a>
            </p>
          </div>
        </div>

        {/* Second Row: Mutual Funds Sahi Hai (Text Left, Logo Right) */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-5">
            {/* Added text-justify to make start and end widths the same */}
            <p className="text-slate-600 leading-relaxed text-[16px] text-justify">
              <span className="font-bold text-slate-800">"Mutual Funds Sahi Hai"</span> is an investor awareness campaign launched by the <span className="font-bold text-slate-800">Association of Mutual Funds in India (AMFI)</span> in March 2017. The initiative aims to educate investors and promote mutual funds as a reliable and effective investment option.
            </p>
            <p className="text-slate-600 leading-relaxed text-[16px] text-justify">
              The campaign focuses on increasing awareness about mutual fund investing, addressing common misconceptions, and encouraging individuals to make informed financial decisions.
            </p>
            <p className="text-slate-600 text-[16px]">
              For more information, visit: <a href="https://www.mutualfundssahihai.com" target="_blank" rel="noreferrer" className="text-[#2B5A84] font-bold hover:underline">www.mutualfundssahihai.com</a>
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="https://finpenny.com/wp-content/uploads/2026/03/2-e1773022898208.png" 
              alt="Mutual Funds Sahi Hai Logo" 
              className="max-w-[600px] w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AmfiSection;