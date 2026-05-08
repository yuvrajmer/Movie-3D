import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactDetails from '../components/contact/ContactDetails';
import ContactMap from '../components/contact/ContactMap';

const Contact = () => {
  return (
    <main className="bg-white">
      {/* First Section: Hero with Black Overlay */}
      <ContactHero />
      
      <ContactDetails />

      <ContactMap />
    </main>
  );
};

export default Contact;