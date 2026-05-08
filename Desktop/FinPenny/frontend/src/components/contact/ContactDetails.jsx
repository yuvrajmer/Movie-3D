import React, { useState, useCallback, useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Send, Loader2, AlertCircle, CheckCircle, Check, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
// 1. Import ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

// ══════════════════════════════════════════════════════════════
//  SECURITY & VALIDATION HELPERS
// ══════════════════════════════════════════════════════════════
const SQL_PATTERNS = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|FROM|WHERE|TABLE|DATABASE|SCRIPT)\b|--|;|\/\*|\*\/|xp_|0x[0-9a-f]+)/gi;
const XSS_PATTERNS = /<[^>]*>|javascript:|on\w+\s*=|eval\s*\(|document\.|window\.|alert\s*\(|confirm\s*\(|prompt\s*\(|fetch\s*\(|XMLHttpRequest/gi;

function sanitize(value) {
  return String(value).replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();
}
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}
function isValidPhone(phone) {
  const digits = phone.replace(/[\s\-\(\)+]/g, "");
  return /^[6-9]\d{9}$/.test(digits);
}

// ══════════════════════════════════════════════════════════════
//  SUCCESS POPUP COMPONENT
// ══════════════════════════════════════════════════════════════
const SuccessPopup = ({ show, onClose, name }) => {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 5000);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9998]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-[420px]">
        <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl">
          <div className="h-1.5 bg-[#2B5A84]" />
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Message Sent! 🎉</h3>
            <p className="text-sm text-slate-500 mt-2">Thank you, {name}! We'll get back to you soon.</p>
            <button onClick={onClose} className="mt-8 w-full py-4 bg-[#2B5A84] text-white rounded-xl font-bold">Done</button>
          </div>
        </div>
      </div>
    </>
  );
};

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
const ContactDetails = () => {
  const recaptchaRef = useRef();
  
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", message: "", agreeToPolicy: false
  });
  const [honeypot, setHoneypot] = useState("");
  // 2. State for Google Token
  const [captchaToken, setCaptchaToken] = useState(null);
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newVal }));
    if (name === "message") setCharCount(value.length);
  };

  // 3. Handle Recaptcha Callback
  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
    if(token) setErrors(prev => ({...prev, captcha: null}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; 

    let errs = {};
    if (!formData.firstName) errs.firstName = "Required";
    if (!isValidEmail(formData.email)) errs.email = "Invalid email";
    if (!isValidPhone(formData.phone)) errs.phone = "Invalid phone";
    if (formData.message.length < 10) errs.message = "Message too short";
    if (!formData.agreeToPolicy) errs.policy = "Please consent";
    
    // 4. Validate Captcha state
    if (!captchaToken) errs.captcha = "Please verify you are human";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ firstName: true, email: true, phone: true, message: true, policy: true, captcha: true });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        firstName: sanitize(formData.firstName),
        lastName: sanitize(formData.lastName),
        email: formData.email.toLowerCase(),
        phone: formData.phone.replace(/\D/g, ""),
        message: sanitize(formData.message),
        captchaToken: captchaToken // 5. Send token to server
      };

      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setShowPopup(true);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "", agreeToPolicy: false });
        setErrors({});
        setTouched({});
        setCharCount(0);
        setCaptchaToken(null);
        recaptchaRef.current.reset(); // 6. Reset UI widget
      }
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FieldError = ({ name }) =>
    (touched[name] && errors[name]) ? (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle size={10} className="text-red-500" />
        <span className="text-red-500 text-[10px]">{errors[name]}</span>
      </div>
    ) : null;

  return (
    <>
      <SuccessPopup show={showPopup} onClose={() => setShowPopup(false)} name={formData.firstName} />

      <style>{`
        @keyframes jump-vibrate {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-5px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-3px); }
        }
        .icon-hover-container:hover .icon-box {
          background-color: #D9231D !important;
          animation: jump-vibrate 0.4s ease-in-out 2;
        }
        .page-slide {
          position: relative; display: inline-block; overflow: hidden; height: 20px; line-height: 20px;
        }
        .page-slide span { display: inline-block; transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1); }
        .page-slide::after {
          content: attr(data-text); position: absolute; left: 0; top: 100%; display: inline-block;
          color: #D9231D; transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
        }
        .page-slide:hover span { transform: translateY(-100%); }
        .page-slide:hover::after { transform: translateY(-100%); }
      `}</style>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-1">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="lg:w-1/3 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-[#D9231D] rounded-full p-1"><Check size={16} className="text-white stroke-[4px]" /></div>
                  <span className="text-[#D9231D] font-bold text-m uppercase tracking-widest">Contact Us</span>
                </div>
                <h2 className="text-[28px] text-[#2B5A84] leading-tight">Get in touch with <span className="font-bold text-[#2B5A84]">Finpenny</span></h2>
                <span className="text-slate-500 block">Let’s discuss your financial goals and build a smarter investment plan together.</span>
              </div>

              <div className="space-y-10 border-t border-slate-100 pt-10">
                <div className="flex items-start gap-6 icon-hover-container group">
                  <div className="icon-box bg-[#2B5A84] p-4 rounded-full text-white transition-all"><MapPin size={24} /></div>
                  <div>
                    <h3 className="font-bold text-[#2B5A84] text-lg">Our Address</h3>
                    <p className="text-slate-500 text-sm mt-1">F-708, Titanium City Center, Ahmedabad</p>
                  </div>
                </div>
                <a href="tel:+919427049936" className="flex items-start gap-6 icon-hover-container group">
                  <div className="icon-box bg-[#2B5A84] p-4 rounded-full text-white transition-all"><Phone size={24} /></div>
                  <div>
                    <h3 className="font-bold text-[#2B5A84] text-lg">Call Us</h3>
                    <p className="text-slate-500 text-sm mt-1 hover:text-red-600 transition-colors">+91 94270 49936</p>
                  </div>
                </a>
                <a href="mailto:nirmitashah15@gmail.com" className="flex items-start gap-6 icon-hover-container group">
                  <div className="icon-box bg-[#2B5A84] p-4 rounded-full text-white transition-all"><Mail size={24} /></div>
                  <div>
                    <h3 className="font-bold text-[#2B5A84] text-lg">Send Email</h3>
                    <p className="text-slate-500 text-sm mt-1 hover:text-red-600 transition-colors">nirmitashah15@gmail.com</p>
                  </div>
                </a>
              </div>

              <div className="flex gap-8 pt-6 border-t border-slate-100 text-[#2B5A84] font-bold text-sm uppercase">
                <a href="https://www.facebook.com/finpenny.official" target="_blank" className="page-slide" data-text="Facebook"><span>Facebook</span></a>
                <a href="https://www.instagram.com/finpenny_official" target="_blank" className="page-slide" data-text="Instagram"><span>Instagram</span></a>
                <a href="https://www.linkedin.com/company/finpenny" target="_blank" className="page-slide" data-text="LinkedIn"><span>LinkedIn</span></a>
              </div>
            </div>

            <div className="lg:w-2/3 mt-15">
              <h3 className="text-3xl font-bold text-[#2B5A84] mb-12">Let's Contact with us</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative border-b border-slate-200">
                    {formData.firstName === "" && (
                      <div className="absolute left-0 top-3 pointer-events-none text-slate-400 text-sm">
                        First Name <span className="text-red-500 font-bold">*</span>
                      </div>
                    )}
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full py-3 outline-none bg-transparent text-sm" />
                    <FieldError name="firstName" />
                  </div>
                  <div className="relative border-b border-slate-200">
                    {formData.lastName === "" && <div className="absolute left-0 top-3 pointer-events-none text-slate-400 text-sm">Last Name</div>}
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full py-3 outline-none bg-transparent text-sm" />
                  </div>
                </div>

                <div className="relative border-b border-slate-200">
                  {formData.email === "" && (
                    <div className="absolute left-0 top-3 pointer-events-none text-slate-400 text-sm">
                      Email Address <span className="text-red-500 font-bold">*</span>
                    </div>
                  )}
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full py-3 outline-none bg-transparent text-sm" />
                  <FieldError name="email" />
                </div>

                <div className="relative border-b border-slate-200 flex items-center gap-3">
                  <span className="text-xl">🇮🇳</span>
                  <div className="relative flex-1">
                    {formData.phone === "" && (
                      <div className="absolute left-0 pointer-events-none text-slate-400 text-sm">
                        Phone Number <span className="text-red-500 font-bold">*</span>
                      </div>
                    )}
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full py-3 outline-none bg-transparent text-sm" />
                  </div>
                  <FieldError name="phone" />
                </div>

                <div className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Message <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-slate-400">{charCount} / 2000</span>
                  </div>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full border border-slate-200 rounded-sm p-4 outline-none text-sm text-slate-600 focus:border-[#2B5A84] transition-all" />
                  <FieldError name="message" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700">Consent <span className="text-red-500">*</span></p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="agreeToPolicy" checked={formData.agreeToPolicy} onChange={handleChange} className="mt-1 w-4 h-4 accent-[#2B5A84]" />
                    <span className="text-xs text-slate-500">
                      Yes, I agree with the <Link to="/privacy-policy" className="text-[#2B5A84] font-bold underline hover:text-red-600">privacy policy</Link> and terms and conditions.
                    </span>
                  </label>
                  <FieldError name="policy" />
                </div>

                <div className="hidden" aria-hidden="true">
                  <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off" />
                </div>

                {/* 7. Google ReCAPTCHA Widget */}
                <div className="mt-8 py-2">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your real site key
                    onChange={onCaptchaChange}
                  />
                  <FieldError name="captcha" />
                </div>

                <button type="submit" disabled={isSubmitting} className="bg-[#2B5A84] text-white px-10 py-3.5 rounded-sm font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#1a3a5a] transition-all flex items-center justify-center gap-3 min-w-[180px] disabled:opacity-60">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {isSubmitting ? "Sending" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactDetails;