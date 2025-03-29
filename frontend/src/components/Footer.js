import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = ({ companyName }) => {
  return (
    <Box component="footer" sx={{ p: 2, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
