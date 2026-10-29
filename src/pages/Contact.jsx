import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Card,
  Stack,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { ArrowForward, Mail, Phone, Place } from '@mui/icons-material';
import { FiTwitter, FiInstagram, FiLinkedin, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  { icon: FiTwitter, label: 'Twitter (X)', href: 'https://twitter.com' },
  { icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com/markefiedofficial/' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/luv-chhatwani-561257427/' },
  { icon: FiFacebook, label: 'Facebook', href: 'https://facebook.com' },
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const plan = searchParams.get('plan');
    const type = searchParams.get('type');
    if (plan) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `Hi Markefied, I am interested in the ${plan} package. Please contact me for a free consultation.`,
      }));
    } else if (type === 'client-access') {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `Hi Markefied team, I am an existing client requesting access to my campaign dashboard.`,
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields (Name, Email, Message).',
        severity: 'error',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address.',
        severity: 'error',
      });
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('markefied_inquiries') || '[]');
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString(),
        source: 'Contact Page Form',
      });
      localStorage.setItem('markefied_inquiries', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    setSnackbar({
      open: true,
      message: `Thank you, ${name}! Your consultation request has been sent. We will get back to you within 24 hours.`,
      severity: 'success',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      message: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="md">
        <Grid container spacing={6} justifyContent="center">
          {/* Contact Details */}
          <Grid item xs={12}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Chip label="Get in Touch" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
              <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 3, lineHeight: 1.1 }}>
                Let's scale your business together.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 580 }}>
                Ready to dominate your market? Fill out the form or reach out directly to schedule a free consultation with our digital marketing specialists.
              </Typography>

              <Stack spacing={2.5} sx={{ mb: 5, width: '100%', maxWidth: 480, mx: 'auto' }}>
                {/* Email */}
                <Box
                  component="a"
                  href="mailto:markefied.official21@gmail.com"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    p: 2,
                    borderRadius: '16px',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' }
                  }}
                >
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <Mail />
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" color="text.secondary">Email Us</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>markefied.official21@gmail.com</Typography>
                  </Box>
                </Box>

                {/* Phone */}
                <Box
                  component="a"
                  href="tel:+917850915986"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    p: 2,
                    borderRadius: '16px',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' }
                  }}
                >
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <Phone />
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" color="text.secondary">Call Us</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>+91 7850915986</Typography>
                  </Box>
                </Box>

                {/* WhatsApp */}
                <Box
                  component="a"
                  href="https://wa.me/917850915986?text=Hello%20Markefied%20Team%2C%20I%20would%20like%20to%20schedule%20a%20free%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    p: 2,
                    borderRadius: '16px',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: '#25D366', bgcolor: 'rgba(37,211,102,0.04)' }
                  }}
                >
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'rgba(37,211,102,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', flexShrink: 0 }}>
                    <FaWhatsapp size={24} />
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" color="text.secondary">WhatsApp Us</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>+91 7850915986</Typography>
                  </Box>
                </Box>

                {/* Office */}
                <Box
                  component="a"
                  href="https://maps.google.com/?q=9-A,+Jawahar+Nagar,+Udaipur,+Rajasthan,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    p: 2,
                    borderRadius: '16px',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' }
                  }}
                >
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <Place />
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="caption" color="text.secondary">Our Office</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>9-A, Jawahar Nagar, Udaipur, Rajasthan, India</Typography>
                  </Box>
                </Box>
              </Stack>

              <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', letterSpacing: 1 }}>FOLLOW US</Typography>
              <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 4 }}>
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
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
                      transition: 'all 0.3s ease',
                      '&:hover': { bgcolor: 'primary.main', transform: 'translateY(-3px)' }
                    }}
                  >
                    <Icon size={18} />
                  </IconButton>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Form and Map */}
          <Grid item xs={12} id="contact-form">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: '28px', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1, fontFamily: 'Fraunces, serif' }}>
                  Request a Free Consultation
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Fill out the form below. We will review your website and reply within one business day with an actionable growth audit.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, alignItems: 'center' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} type="email" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} variant="outlined" />
                    </Grid>
                  </Grid>
                  <TextField required fullWidth multiline rows={4} label="Message" name="message" value={formData.message} onChange={handleChange} variant="outlined" />
                  <Button type="submit" variant="contained" color="primary" size="large" endIcon={<ArrowForward />} sx={{ py: 1.6, mt: 1, px: 6, fontWeight: 600 }}>
                    Send Message
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Google Maps Link */}
        <Box
          component="a"
          href="https://maps.google.com/?q=9-A,+Jawahar+Nagar,+Udaipur,+Rajasthan,+India"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: 8,
            height: 350,
            width: '100%',
            borderRadius: '28px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            bgcolor: '#121319',
            display: 'block',
            textDecoration: 'none',
            transition: 'border-color 0.3s, transform 0.3s',
            '&:hover': {
              borderColor: 'primary.main',
              transform: 'scale(1.005)',
            }
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', placeContent: 'center', gap: 1, zIndex: 1, px: 2, textAlign: 'center' }}>
            <Place sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>Markefied HQ</Typography>
            <Typography variant="body2" color="text.secondary">9-A, Jawahar Nagar, Udaipur, Rajasthan, India</Typography>
            <Chip label="Open in Google Maps ↗" size="small" sx={{ mt: 1, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
          </Box>
          <Box sx={{ width: '100%', height: '100%', opacity: 0.2, background: 'radial-gradient(circle, rgba(80,132,196,0.3) 0%, transparent 80%), repeating-linear-gradient(0deg, #111 0px, #111 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #111 0px, #111 1px, transparent 1px, transparent 40px)' }} />
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
