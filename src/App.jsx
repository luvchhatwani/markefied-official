import { useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from './theme';
import useLenis from './hooks/useLenis';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollAnimation from './components/ScrollAnimation';

import SEO from './components/SEO';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHashElement = () => {
        const element = document.querySelector(hash);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -90, immediate: false });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          return true;
        }
        return false;
      };

      // Try immediately, or retry after DOM render tick
      if (!scrollToHashElement()) {
        const timeout = setTimeout(scrollToHashElement, 150);
        return () => clearTimeout(timeout);
      }
      return;
    }

    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const mode = 'dark';
  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  }, []);

  useLenis();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO />
      <ScrollToTopOnRoute />
      <ScrollAnimation />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
    </ThemeProvider>
  );
}
