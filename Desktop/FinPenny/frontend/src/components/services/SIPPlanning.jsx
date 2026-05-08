import React from 'react';
import ServiceLayout from './ServiceLayout';

const SIPPlanning = () => {
  const sipData = {
    title: "SIP Planning",
    // Hero background matching the greenery/financial aesthetic in your image
    heroBgImage: "/images/8.png", 
    // Main image from the screenshot showing the 3D graph and buildings
    mainImage: "https://finpenny.com/wp-content/uploads/2025/05/3-1.png", 
    mainSubTitle: "Build Wealth Through Disciplined Investing",
    mainDescription: `A Systematic Investment Plan (SIP) is one of the simplest and most effective ways to build long-term wealth through mutual funds. Instead of investing a large amount at once, SIP allows you to invest a fixed amount regularly—usually monthly—making investing more manageable and disciplined.

    At Finpenny, we help investors design structured SIP plans aligned with their income, financial goals, and risk tolerance. Our focus is to help you build consistent investing habits so that small monthly investments can grow into significant wealth over time.

    Whether you are starting your first investment or planning for future financial goals, SIP planning helps you stay consistent and benefit from the power of compounding.`,
    
    keyPoints: [
      "Goal-Based SIP Planning",
      "Affordable & Disciplined Investing",
      "Power of Compounding",
      "Portfolio Monitoring & Support"
    ],

    faqTitle: "Frequently Asked Question",
    faqs: [
      {
        question: "What is a SIP?",
        answer: "A Systematic Investment Plan (SIP) is a method of investing in mutual funds where a fixed amount is invested regularly, usually every month. This allows investors to build wealth gradually through disciplined investing."
      },
      {
        question: "What are the benefits of SIP?",
        answer: "SIPs offer several benefits including rupee cost averaging, the power of compounding, and the convenience of investing small amounts regularly without timing the market."
      },
      {
        question: "How much should I start investing in SIP?",
        answer: "You can start a SIP with an amount as low as ₹500 per month. The ideal amount depends on your specific financial goals and monthly savings capacity."
      },
      {
        question: "Can I increase or stop my SIP later?",
        answer: "Yes, SIPs are highly flexible. You can increase the amount through a 'Top-up SIP' or stop/pause your investments at any time without any major penalties."
      },
      {
        question: "Is SIP suitable for beginners?",
        answer: "Absolutely. SIP is considered the best entry point for beginners because it reduces market risk and helps build a habit of regular saving and investing."
      }
    ]
  };

  return (
  <ServiceLayout 
    {...sipData} 
    prevService={{ name: "Mutual Funds", path: "/mutual-funds" }} 
    nextService={{ name: "ELSS (Tax)", path: "/elss-tax-saving" }} 
  />
);
};

export default SIPPlanning;