import React from 'react';
import ServiceLayout from './ServiceLayout';

const MutualFunds = () => {
  // Exact data from the image provided
  const mutualFundData = {
    title: "Mutual Fund Investments",
    heroBgImage: "/images/5-1.png", // Leaf/Nature background
    mainImage: "https://finpenny.com/wp-content/uploads/2025/05/2-1.png", // Hand holding plant with coins
    mainSubTitle: "Smart Investing for Long-Term Wealth",
    mainDescription: `Mutual funds provide an effective way for individuals to invest in financial markets while benefiting from professional management and diversification. By pooling money from multiple investors, mutual funds invest across various securities such as equities, debt instruments, or a combination of both. 

    At Finpenny, we help investors select mutual funds that align with their financial goals, time horizon, and risk profile. Our approach focuses on disciplined investing and long-term wealth creation.
    
    Whether you are starting your first investment or planning your financial future, we guide you through the entire process so you can invest with clarity and confidence.`,
    
    keyPoints: [
      "Personalized Mutual Fund Selection",
      "Goal-Based Investment Planning",
      "Diversified Investment Strategy",
      "Portfolio Review & Ongoing Guidance"
    ],

    faqTitle: "Frequently Asked Question",
    faqs: [
      {
        question: "What is a Mutual Fund?",
        answer: "A mutual fund is an investment vehicle that pools money from multiple investors and invests it in a diversified portfolio of securities such as stocks, bonds, or other financial instruments. The fund is managed by professional fund managers."
      },
      {
        question: "How can I start investing in Mutual Funds?",
        answer: "You can start by completing your KYC (Know Your Customer) process and then choosing between a Systematic Investment Plan (SIP) or a Lump Sum investment based on your financial capacity."
      },
      {
        question: "What is SIP?",
        answer: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (monthly/quarterly) in a mutual fund scheme, helping you build wealth through the power of compounding."
      },
      {
        question: "Are Mutual Funds safe?",
        answer: "Mutual funds are subject to market risks, but they are regulated by SEBI. Diversification across different stocks and professional management helps mitigate risks over the long term."
      },
      {
        question: "How much should I invest in Mutual Funds?",
        answer: "The amount depends on your financial goals, income, and risk appetite. It is best to consult with a financial advisor to determine the right allocation for you."
      },
      {
        question: "Can Mutual Funds help with tax saving?",
        answer: "Yes, Equity Linked Savings Schemes (ELSS) are a type of mutual fund that offer tax benefits under Section 80C of the Income Tax Act."
      }
    ]
  };

  return (
    <ServiceLayout 
      {...mutualFundData} 
      // Prev: Goal Based | Next: SIP Planning
      prevService={{ name: "Goal Based", path: "/goal-based-investments" }} 
      nextService={{ name: "SIP Planning", path: "/sip-planning" }} 
    />
  );
};

export default MutualFunds;