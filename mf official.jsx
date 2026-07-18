import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from './theme';
import useLenis from './hooks/useLenis';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import Blog from './pages/Blog';

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [mode, setMode] = useState(() => {
    const stored = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return stored ? 'dark' : 'light';
  });

  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  useLenis();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTopOnRoute />
      <Header mode={mode} onToggleMode={toggleMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<Blog />} />
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