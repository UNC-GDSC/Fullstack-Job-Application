import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Header = ({ companyName, logoUrl }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {logoUrl && (
          <Box component="img" src={logoUrl} alt={`${companyName} logo`} sx={{ height: 50, mr: 2 }} />
        )}
        <Typography variant="h6" component="div">
          {companyName} Job Application Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
