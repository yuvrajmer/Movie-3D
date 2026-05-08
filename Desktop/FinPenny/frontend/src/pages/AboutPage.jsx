import React from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutFinpenny from '../components/about/AboutFinpenny';
import ScrollingTicker from '../components/about/ScrollingTicker';
import WhyChooseUs from '../components/about/WhyChooseUs';
import TestimonialSlider from '../components/about/TestimonialSlider';

const AboutPage = () => {
  return (
    <>
      <main>
        <AboutHero />
        {/* We will add more sections here next */}

        <AboutFinpenny />

        <ScrollingTicker />

        <WhyChooseUs />

        <TestimonialSlider />
      </main>
    </>
  );
};

export default AboutPage;