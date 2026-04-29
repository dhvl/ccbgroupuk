"use client";

import { useState, useEffect } from 'react';

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <a 
        href="https://wa.me/447956552477" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
      
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="back-to-top"
          title="Back to Top"
          style={{ display: 'flex' }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default FloatingActions;
