import React from 'react';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyFinpenny from '../components/home/WhyFinpenny';
import ProcessSection from '../components/home/ProcessSection';
import RecentArticles from '../components/home/RecentArticles';

const Home = () => {
  return (
    <>
      {/* Hero section from your original main page */}
      <Hero />
      
      {/* Adding the other sections back so your Home page is complete */}
      <AboutSection />
      
      <ServicesSection />

      <WhyFinpenny />

      <ProcessSection />

      {/* New Recent Articles Section */}
      <RecentArticles />
    </>
  );
};

export default Home;