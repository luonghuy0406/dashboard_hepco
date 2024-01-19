import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './ckeditor.css';
import './App.css';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import EditorComponent from './sections/@dashboard/blog/EditorComponent';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <EditorComponent/>
    // <HelmetProvider>
    //   <BrowserRouter>
    //     <ThemeProvider>
    //       <ScrollToTop />
    //       <StyledChart />
    //       <Router/>
    //     </ThemeProvider>
    //   </BrowserRouter>
    // </HelmetProvider>
  );
}