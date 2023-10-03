import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { useEffect, useState } from 'react';
import setAuthToken from './setAuthToken';

// ----------------------------------------------------------------------

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router isAuthenticated={isAuthenticated}/>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}