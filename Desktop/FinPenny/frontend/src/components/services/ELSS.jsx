import React from 'react';
import ServiceLayout from './ServiceLayout';

const ELSS = () => {
  const elssData = {
    title: "ELSS (Tax Saving)",
    // Hero background matching the tax/financial theme
    heroBgImage: "/images/6.png", 
    // Main image from the screenshot showing the calculator with 'TAXES'
    mainImage: "https://finpenny.com/wp-content/uploads/2025/05/4-1.png", 
    mainSubTitle: "Save Tax While Building Wealth",
    mainDescription: `Equity Linked Savings Scheme (ELSS) is a type of mutual fund that offers investors the opportunity to save tax while participating in long-term wealth creation. ELSS investments qualify for tax deductions under Section 80C of the Income Tax Act, making them a popular choice for salaried professionals and individuals looking for efficient tax planning.

    At Finpenny, we help investors choose suitable ELSS funds that align with their financial goals and risk profile. Our goal is to ensure that your tax-saving investments also contribute to long-term wealth creation.

    ELSS funds primarily invest in equities, which allows investors to benefit from the growth potential of the stock market while enjoying tax advantages.`,
    
    keyPoints: [
      "Tax Benefits Under Section 80C",
      "Shortest Lock-in Period",
      "Potential for Wealth Creation",
      "SIP-Based Tax Saving"
    ],

    faqTitle: "Frequently Asked Question",
    faqs: [
      {
        question: "What is ELSS?",
        answer: "Equity Linked Savings Scheme (ELSS) is a type of mutual fund that primarily invests in equities and offers tax benefits under Section 80C of the Income Tax Act."
      },
      {
        question: "What is the lock-in period for ELSS?",
        answer: "ELSS has a mandatory lock-in period of 3 years, which is the shortest among all tax-saving options under Section 80C."
      },
      {
        question: "How much can I invest in ELSS for tax benefits?",
        answer: "You can invest any amount in ELSS, but tax deductions under Section 80C are capped at ₹1.5 lakh per financial year."
      },
      {
        question: "Can I invest in ELSS through SIP?",
        answer: "Yes, you can invest in ELSS through a Systematic Investment Plan (SIP), which helps in averaging the cost of investment over time."
      }
    ]
  };

  return (
  <ServiceLayout 
    {...elssData} 
    prevService={{ name: "SIP Planning", path: "/sip-planning" }} 
    nextService={{ name: "Mutual Funds", path: "/mutual-funds" }} 
  />
);
};

export default ELSS;