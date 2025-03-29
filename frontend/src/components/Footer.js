import React from 'react';

const Footer = ({ companyName }) => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
