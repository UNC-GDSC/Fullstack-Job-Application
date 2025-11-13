/**
 * Frontend Configuration
 * Uses environment variables with fallback to default values
 */
const config = {
  // API Configuration
  backendUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,

  // Company Branding
  companyName: process.env.REACT_APP_COMPANY_NAME || 'Your Company Name',
  companyLogoUrl:
    process.env.REACT_APP_COMPANY_LOGO_URL || 'https://example.com/logo.png',

  // Feature Flags
  enableAuth: process.env.REACT_APP_ENABLE_AUTH === 'true',
  enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',

  // Environment
  environment: process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Validate required configuration
if (!config.backendUrl) {
  console.error('Backend URL is not configured. Please set REACT_APP_API_URL.');
}

export default config;
