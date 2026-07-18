import { useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from './theme';
import useLenis from './hooks/useLenis';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const scrollTarget = hash;
      const element = document.querySelector(scrollTarget);
      if (element) {
        if (window.lenis) {
          window.lenis.scrollTo(scrollTarget, { immediate: false });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
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
      <ScrollToTopOnRoute />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <div style={{ padding: '160px 24px 120px', textAlign: 'center' }}>
              <h1>404 — Page not found</h1>
            </div>
          }
        />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}