import React from "react";

const Disclaimer = () => {
  return (
    <div className="bg-white min-h-screen py-15 font-sans">
      <div className="w-full px-[75px] text-gray-700 leading-[1.8] text-justify">
        <h2 className="text-black font-bold mb-6">Last Updated: 01.04.2026</h2>

        <p className="mb-6">
          Welcome to{" "}
          <a href="https://www.finpenny.com" className="text-red-600 underline">
            www.finpenny.com
          </a>
          , operated by <span className="font-bold text-black">FinPenny</span>.
          By accessing this website or using any of our services, you agree to
          the terms outlined below.
        </p>

        <p className="mb-6">
          All information shared on this website or through our communication
          channels—including emails, calls, messages, or any digital medium—is
          intended for general awareness and informational purposes only. It
          should not be treated as professional, legal, financial, or investment
          advice.
        </p>

        <p className="mb-6">
          While we aim to provide accurate and up-to-date information, FinPenny
          does not make any guarantees regarding the reliability, completeness,
          or accuracy of the content. Any action you take based on the
          information available on this website is strictly at your own risk.
        </p>

        <p className="mb-6">
          Our services and suggestions may not be suitable for every individual
          or business. You are encouraged to evaluate your own needs and, where
          necessary, consult with a qualified professional before making any
          decisions.
        </p>

        <p className="mb-6">
          FinPenny will not be responsible for any direct or indirect loss,
          damage, or consequences that may arise from the use of our website,
          reliance on its content, or use of our services.
        </p>

        <p className="mb-6">
          All materials on this website, including text, design elements, and
          branding, are owned by FinPenny. You may not copy, reuse, or
          distribute any content without prior written permission.
        </p>

        <p className="mb-6">
          This website may include links to third-party platforms or websites.
          These links are provided for convenience only, and FinPenny does not
          control or take responsibility for their content or practices.
        </p>

        <p className="mb-6">
          We reserve the right to update or change these terms at any time
          without prior notice. Continued use of the website after changes are
          made will be considered as acceptance of the revised terms.
        </p>

        <p className="mb-30">
          If you do not agree with any part of these terms, please discontinue
          using the website and services.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
