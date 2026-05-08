import React, { useState } from "react";
import {
  Mail,
  Send,
  Bell,
  ArrowUp,
  Check,
  AlertCircle,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setModalTitle("Email Required");
      setModalMessage("Please enter your email address");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    if (!validateEmail(email)) {
      setModalTitle("Invalid Email");
      setModalMessage("Please enter a valid email address");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setModalTitle("Verification Email Sent! ✅");
        if (data.flagged) {
          setModalMessage(
            `Your subscription has been received! We've detected this might need manual verification. Our team will review your request within 24-48 hours.\n\nA confirmation email has been sent to: ${email}`,
          );
          setIsFlagged(true);
        } else {
          setModalMessage(
            `Great! A verification link has been sent to:\n\n${email}\n\nPlease check your inbox and click the link to confirm your subscription.`,
          );
          setIsFlagged(false);
        }
        setIsSuccess(true);
        setEmail("");
      } else {
        setModalTitle("Subscription Error");
        setModalMessage(
          data.message || "Failed to subscribe. Please try again.",
        );
        setIsSuccess(false);
      }
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Failed to subscribe. Please try again later.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <footer className="w-full mt-0 font-sans">
      {/* Subscription Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {isSuccess ? (
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {modalTitle}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
                {modalMessage}
              </p>

              {isFlagged && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-blue-900 text-sm font-medium flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Your email requires verification by our team. This helps
                      us maintain a clean subscriber list.
                    </span>
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-[#D9231D] hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Red Call to Action Banner */}
      <div className="container mx-auto relative z-20 -mt-20">
        <a
          href="mailto:nirmitashah15@gmail.com"
          className="bg-[#D9231D] rounded-xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center text-white shadow-2xl overflow-hidden relative group block transition-transform hover:scale-[1.01]"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <div className="w-64 h-64 border-[40px] border-white rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-10 transform -translate-x-1/4 translate-y-1/4">
            <div className="w-48 h-48 border-[30px] border-white rounded-full"></div>
          </div>

          <h2 className="text-3xl font-bold mb-6 md:mb-0 relative z-10">
            Do you need free Consultation?
          </h2>

          <div className="flex items-center space-x-5 relative z-10">
            <div className="bg-white p-4 rounded-full text-[#D9231D] group-hover:bg-gray-100 transition-colors shadow-lg">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-sm opacity-90 font-medium uppercase tracking-wider">
                Send e-Mail
              </p>
              <p className="text-xl font-bold">nirmitashah15@gmail.com</p>
            </div>
          </div>
        </a>
      </div>

      {/* Main Footer (Blue Section) */}
      <div className="bg-[#3A6791] pt-32 pb-10 text-white -mt-12 relative z-0">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-20">
            {/* Column 1 - Brand & Socials */}
            <div className="md:col-span-2 space-y-8 border-r border-white/10 pr-12">
              <Link to="/" onClick={scrollToTop}>
                <img
                  src="https://finpenny.com/wp-content/uploads/2024/12/Copy-of-FOOD.png"
                  alt="Finpenny Logo"
                  className="h-34  w-auto object-contain"
                />
              </Link>
              <p className="text-[15px] text-gray-200 leading-relaxed max-w-sm">
                Helping you invest with clarity, discipline, and long-term
                financial vision.
              </p>
              <div className="flex space-x-4 text-xs font-bold uppercase tracking-widest">
                <a href="https://www.facebook.com/finpenny.official" className="hover:text-red-400 transition-colors">
                  FB.
                </a>
                <a href="https://www.instagram.com/finpenny_official" className="hover:text-red-400 transition-colors">
                  IG.
                </a>
                <a href="https://www.linkedin.com/company/finpenny" className="hover:text-red-400 transition-colors">
                  LN.
                </a>
              </div>
            </div>

            {/* Column 2 - Navigation */}
            <div className="pl-0 md:pl-4">
              <h3 className="text-2xl font-bold mb-8">Company</h3>
              <ul className="space-y-4 text-gray-300 text-[15px]">
                {[
                  "Home",
                  "About Us",
                  "Essentials",
                  "Latest Blog",
                  "Contact Us",
                ].map((link) => (
                  <li key={link} className="hover:text-white transition-all">
                    <Link
                      to={
                        link === "Home"
                          ? "/"
                          : `/${link.toLowerCase().replace(" ", "-")}`
                      }
                      onClick={scrollToTop}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Service Link</h3>
              <ul className="space-y-4 text-gray-300 text-[15px]">
                {[
                  "Mutual Fund Investments",
                  "SIP Planning",
                  "ELSS (Tax Saving)",
                  "Goal Based Investments",
                ].map((link) => (
                  <li key={link} className="hover:text-white transition-all">
                    <Link
                      to={`/${link.toLowerCase().replace(" ", "-")}`}
                      onClick={scrollToTop}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Newsletter Subscription */}
            <div>
              <h3 className="text-4xl font-bold text-white mb-6">Newsletter</h3>
              <p className="text-lg text-blue-100/70 mb-8">
                Don't miss the latest news
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="relative mb-10 group"
              >
                <div className="flex w-57 items-center bg-white rounded-l-none rounded-full p-1.5 shadow-lg border border-transparent focus-within:border-[#D9231D] transition-all">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-1 px-6 rounded-full text-gray-800 text-lg focus:outline-none placeholder:text-gray-500 bg-transparent"
                    disabled={loading}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-shrink-0 bg-[#D9231D] hover:bg-[#b01c17] text-white p-3 rounded-full transition-all duration-300 shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <Loader size={16} className="animate-spin" />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:rotate-12 transition-transform"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center space-x-4 text-[17px] text-blue-100/60">
                <div className="bg-white/10 p-3.5 rounded-full backdrop-blur-sm shadow-inner">
                  <Bell size={22} className="text-white/80" />
                </div>
                <span className="font-medium">
                  Please sign up for notify any updates
                </span>
              </div>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[14px] text-gray-300">
            <p>
              © 2026 Finpenny. All Rights Reserved. | Design & Developed by{" "}
              <a
                href="https://sattvion.com/ventures/sattvion-digi-solutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-red-500 transition-colors duration-300"
              >
                Sattvion Digi Solutions
              </a>
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/disclaimer"
                onClick={scrollToTop}
                className="hover:text-red-500 transition-colors duration-300"
              >
                Disclaimer
              </Link>
              <span className="opacity-30">|</span>
              <Link
                to="/privacy-policy"
                onClick={scrollToTop}
                className="hover:text-red-500 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span className="opacity-30">|</span>
              <a
                href="https://finpenny.com/wp-content/uploads/2026/04/codeOfConduct.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors duration-300"
              >
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- WHITE RISK SECTION --- */}
      <div className="bg-white py-12 relative border-t border-gray-100">
        <div className="container mx-auto relative">
          <div className="max-w-full">
            <p className="text-[14px] leading-[1.8] text-gray-800 mb-10 text-justify">
              <span className="font-bold">Risk Factors –</span> Investments in
              Mutual Funds are subject to Market Risks. Read all scheme related
              documents carefully before investing. Mutual Fund Schemes do not
              assure or guarantee any returns. Past performances of any Mutual
              Fund Scheme may or may not be sustained in future. There is no
              guarantee that the investment objective of any suggested scheme
              shall be achieved. All existing and prospective investors are
              advised to check and evaluate the Exit loads and other cost
              structure (TER) applicable at the time of making the investment
              before finalizing on any investment decision for Mutual Funds
              schemes. We deal in Regular Plans only for Mutual Fund Schemes and
              earn a Trailing Commission on client investments. Disclosure For
              Commission earnings is made to clients at the time of investments.
              Option of Direct Plan for every Mutual Fund Scheme is available to
              investors offering advantage of lower expense ratio. We are not
              entitled to earn any commission on Direct plans. Hence we do not
              deal in Direct Plans.
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 text-[14px] font-bold text-gray-700 border-t border-gray-100 pt-8">
              <a
                href="https://www.amfiindia.com/locate-your-nearest-mutual-fund-distributor-details"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors duration-300"
              >
                <span>AMFI Registered Mutual Fund Distributor</span>
              </a>
              <span className="hidden md:inline opacity-30">|</span>
              <span>ARN- 150869</span>
              <span className="hidden md:inline opacity-30">|</span>
              <span>Grievance Officer – Ms. Nirmita Shah</span>
              <span className="hidden md:inline opacity-30">|</span>
              <a
                href="tel:+919427049936"
                className="hover:text-red-500 transition-colors duration-300"
              >
                Mobile: +91 94270 49936
              </a>
              <span className="hidden md:inline opacity-30">|</span>
              <a
                href="mailto:nirmitashah15@gmail.com"
                className="text-gray-600 hover:text-red-500 transition-colors duration-300"
              >
                nirmitashah15@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
