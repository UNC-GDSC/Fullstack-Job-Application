import React from 'react';

const Header = ({ companyName, logoUrl }) => {
  return (
    <header className="header">
      {logoUrl && <img src={logoUrl} alt={`${companyName} logo`} className="logo" />}
      <h1>{companyName} Job Application Portal</h1>
    </header>
  );
};

export default Header;
