import React from 'react';
import ServiceLayout from './ServiceLayout';

const GoalBasedInvestments = () => {
  const goalData = {
    title: "Goal Based Investments",
    // Hero background with professional financial/planning theme
    heroBgImage: "/images/7.png", 
    // Main image from the screenshot showing wooden blocks leading to a target
    mainImage: "	https://finpenny.com/wp-content/uploads/2025/05/1-1.png", 
    mainSubTitle: "Invest with Purpose, Not Just Products",
    mainDescription: `Goal-based investing focuses on aligning your investments with specific life goals instead of investing without a clear plan. Whether it's buying a house, funding your child's education, planning a dream vacation, or building a comfortable retirement, a goal-oriented strategy helps you invest with clarity and discipline.

    At Finpenny, we help investors define their financial goals and create investment strategies designed to achieve them. By connecting your investments to your life goals, we ensure your financial decisions are structured, measurable, and aligned with your long-term aspirations.

    Our approach focuses on creating personalized investment plans that match your timeline, risk tolerance, and financial priorities.`,
    
    keyPoints: [
      "Personalized Goal Planning",
      "Goal-Oriented Investment Strategy",
      "Disciplined SIP Investments",
      "Continuous Monitoring & Portfolio Review"
    ],

    faqTitle: "Frequently Asked Question",
    faqs: [
      {
        question: "What is goal-based investing?",
        answer: "Goal-based investing is an investment strategy where financial investments are aligned with specific life goals such as education, retirement, or purchasing a home."
      },
      {
        question: "Why is goal-based investing important?",
        answer: "It provides a clear roadmap for your financial journey, ensuring you stay disciplined and focused on what truly matters to you rather than chasing market trends."
      },
      {
        question: "How do I start goal-based investing?",
        answer: "You start by identifying your specific goals, determining the time frame for each, and assessing the amount required to achieve them in the future."
      },
      {
        question: "Can SIP be used for goal-based investing?",
        answer: "Yes, SIP is one of the best tools for goal-based investing as it allows you to contribute small amounts regularly towards specific long-term targets."
      },
      {
        question: "Can my investment plan change over time?",
        answer: "Absolutely. As your life circumstances or goals change, your investment plan can and should be reviewed and adjusted accordingly."
      }
    ]
  };

  return (
    <ServiceLayout 
      {...goalData} 
      // Prev: ELSS | Next: Mutual Funds
      prevService={{ name: "ELSS (Tax)", path: "/elss-tax-saving" }} 
      nextService={{ name: "Mutual Funds", path: "/mutual-funds" }} 
    />
  );
};

export default GoalBasedInvestments;