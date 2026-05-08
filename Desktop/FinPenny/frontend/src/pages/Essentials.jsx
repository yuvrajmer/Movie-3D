import React from 'react';
import EssentialHero from '../components/essentials/EssentialHero';
import AmfiSection from '../components/essentials/AmfiSection';
import CalculatorCTA from '../components/essentials/CalculatorCTA';


const Essentials = () => {
  return (
    <main className="bg-white">
      <EssentialHero />

      <AmfiSection/>

      <CalculatorCTA />
    </main>
  );
};

export default Essentials;