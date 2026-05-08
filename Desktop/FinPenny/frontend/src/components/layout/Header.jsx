import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Added for mobile

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "#" },
    { name: "Essentials", path: "/essentials" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" }
  ];
  
  const serviceLinks = [
    { name: "Mutual Fund Investments", path: "/mutual-funds" },
    { name: "SIP Planning", path: "/sip-planning" },
    { name: "ELSS (Tax Saving)", path: "/elss-tax-saving" },
    { name: "Goal Based Investments", path: "/goal-based-investments" }
  ];

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container px-18">
        
        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex justify-between items-center py-4">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#2B5C91]">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu - Remains exactly as your original */}
        <ul className="hidden lg:flex">
          {navItems.map((item) => (
            <li 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => item.name === 'Services' && setIsServicesOpen(true)}
              onMouseLeave={() => item.name === 'Services' && setIsServicesOpen(false)}
            >
              <NavLink
                to={item.path}
                onClick={(e) => item.path === "#" && e.preventDefault()}
                className={({ isActive }) => `
                  nav-font cursor-pointer flex items-center transition-all duration-300
                  ${isActive && item.path !== '#' 
                    ? 'text-[#2B5C91] font-bold border-b-2 border-[#2B5C91]' 
                    : 'text-[#2B5C91] hover:text-[#D9231D]'}
                `}
                style={{ padding: '18px 20px', fontSize: '16px' }}
              >
                <span>{item.name}</span>
                {item.name === 'Services' && (
                  <ChevronDown 
                    size={16} 
                    className={`ml-1 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} 
                  />
                )}
              </NavLink>

              {item.name === 'Services' && (
                <div 
                  className={`absolute left-0 w-72 bg-white shadow-2xl border-t-2 border-[#2B5C91] transition-all duration-300 transform 
                    ${isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                >
                  <ul className="py-0">
                    {serviceLinks.map((service, index) => (
                      <li key={index} className="border-b border-gray-100 last:border-none">
                        <Link 
                          to={service.path}
                          onClick={() => setIsServicesOpen(false)}
                          className="block px-8 py-5 text-[#444] font-playfair text-[16px] hover:bg-gray-50 hover:text-[#D9231D] transition-colors"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu - Simple list for small screens */}
        {isMobileMenuOpen && (
          <ul className="lg:hidden flex flex-col bg-white border-t border-gray-100 pb-4">
            {navItems.map((item) => (
              <li key={item.name} className="border-b border-gray-50 last:border-none">
                <NavLink 
                  to={item.path} 
                  className="block px-4 py-3 text-[#2B5C91] font-playfair"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;