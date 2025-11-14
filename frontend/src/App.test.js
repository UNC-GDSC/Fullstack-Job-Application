import { render, screen } from '@testing-library/react';
import App from './App';

// Mock axios to prevent actual API calls during tests
jest.mock('axios');

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // The app should render successfully
    expect(document.querySelector('.MuiContainer-root')).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(<App />);
    // Header should be present
    const headerElement = screen.getByRole('banner', { hidden: true });
    expect(headerElement).toBeInTheDocument();
  });
});
