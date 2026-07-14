import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  Fab,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { FiTwitter, FiInstagram, FiLinkedin, FiDribbble, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
];

const SERVICE_LINKS = [
  { label: 'Product Design', to: '/services#design' },
  { label: 'Engineering', to: '/services#engineering' },
  { label: 'Brand Systems', to: '/services#brand' },
  { label: 'Growth & Strategy', to: '/services#growth' },
];

const SOCIALS = [
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: FiDribbble, label: 'Dribbble', href: 'https://dribbble.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setToastOpen(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'secondary.main', color: '#fff', pt: { xs: 8, md: 10 }, position: 'relative' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #5084C4 0%, #7FA5D6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: 16 }}>N</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontFamily: 'Fraunces, serif' }}>
                Nexora
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 300, mb: 3 }}>
              A design & engineering studio crafting interfaces that feel genuinely alive.
            </Typography>
            <Stack direction="row" spacing={1}>
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{
                    color: '#fff',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    '&:hover': { bgcolor: 'primary.main' },
                  }}
                >
                  <Icon size={16} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>
              QUICK LINKS
            </Typography>
            <Stack spacing={1.2}>
              {QUICK_LINKS.map((l) => (
                <Typography
                  key={l.label}
                  component={NavLink}
                  to={l.to}
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', '&:hover': { color: '#5084C4' } }}
                >
                  {l.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>
              SERVICES
            </Typography>
            <Stack spacing={1.2}>
              {SERVICE_LINKS.map((l) => (
                <Typography
                  key={l.label}
                  component={NavLink}
                  to={l.to}
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', '&:hover': { color: '#5084C4' } }}
                >
                  {l.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>
              STAY IN THE LOOP
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <TextField
                size="small"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.06)',
                    borderRadius: 2,
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                  },
                }}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" sx={{ px: 3, whiteSpace: 'nowrap' }}>
                Subscribe
              </Button>
            </Box>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <FiMail size={15} color="rgba(255,255,255,0.6)" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  hello@nexora.studio
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FiPhone size={15} color="rgba(255,255,255,0.6)" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  +1 (415) 555-0176
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <FiMapPin size={15} color="rgba(255,255,255,0.6)" />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  San Francisco, CA
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 5 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            pb: 4,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} Nexora Studio. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Privacy Policy
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Terms of Service
            </Typography>
          </Stack>
        </Box>
      </Container>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ position: 'absolute', right: 24, top: -24 }}
      >
        <Fab
          size="medium"
          color="primary"
          onClick={scrollToTop}
          aria-label="Back to top"
          sx={{ boxShadow: '0 12px 28px rgba(80,132,196,0.4)' }}
        >
          <KeyboardArrowUp />
        </Fab>
      </motion.div>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setToastOpen(false)}>
          You're subscribed — welcome to the studio newsletter.
        </Alert>
      </Snackbar>
    </Box>
  );
}
