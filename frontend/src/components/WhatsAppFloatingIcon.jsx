import React from 'react';
import './WhatsAppFloatingIcon.css'; // We'll add styles here

const WhatsAppFloatingIcon = () => {
  return (
    <a
      href="https://wa.me/918766435787"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/whatsapp-icon.png" alt="WhatsApp" />
    </a>
  );
};

export default WhatsAppFloatingIcon;