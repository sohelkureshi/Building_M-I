// frontend/src/components/Common/Footer.js
import React from 'react';
import '../../styles/Footer.css';


const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Building Maintenance & Inspection</p>
    </footer>
  );
};

export default Footer;
