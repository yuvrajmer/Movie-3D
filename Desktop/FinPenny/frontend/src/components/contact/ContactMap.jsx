import React from 'react';

const ContactMap = () => {
  // Embed URL centered on Titanium City Center, Ahmedabad
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.916124578168!2d72.51268307587426!3d23.026815316167814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b3000000001%3A0x6b87661502446755!2sTitanium%20City%20Center!5e0!3m2!1sen!2sin!4v1714811000000!5m2!1sen!2sin";

  return (
    <section className="w-full h-[500px] bg-slate-100 overflow-hidden">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Finpenny Office Location"
        className="grayscale-[0.1] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
      ></iframe>
    </section>
  );
};

export default ContactMap;