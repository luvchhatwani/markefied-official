import { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Chip, Card, Stack, IconButton, Snackbar, Alert } from '@mui/material';
import { ArrowForward, Mail, Phone, Place } from '@mui/icons-material';
import { FiTwitter, FiInstagram, FiLinkedin, FiFacebook } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Details */}
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Chip label="Get in Touch" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
              <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 3, lineHeight: 1.1 }}>
                Let's scale your business together.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
                Ready to dominate your market? Fill out the form or reach out directly to schedule a free consultation with our digital marketing specialists.
              </Typography>

              <Stack spacing={3} sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s', '&:hover': { transform: 'translateX(6px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' } }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <Mail />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Email Us</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>hello@markefied.com</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s', '&:hover': { transform: 'translateX(6px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' } }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <Phone />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Call Us</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>+91 94140 12345</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s', '&:hover': { transform: 'translateX(6px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' } }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                    <Place />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Our Office</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Udaipur, Rajasthan, India – 313001</Typography>
                  </Box>
                </Box>
              </Stack>

              <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', letterSpacing: 1 }}>FOLLOW US</Typography>
              <Stack direction="row" spacing={1}>
                {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map((platform, idx) => {
                  const icons = [FiTwitter, FiInstagram, FiLinkedin, FiFacebook];
                  const Icon = icons[idx];
                  return (
                    <IconButton
                      key={platform}
                      sx={{
                        color: '#fff',
                        bgcolor: 'rgba(255,255,255,0.06)',
                        '&:hover': { bgcolor: 'primary.main' }
                      }}
                    >
                      <Icon size={16} />
                    </IconButton>
                  );
                })}
              </Stack>
            </motion.div>
          </Grid>

          {/* Form and Map */}
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: '28px', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Fraunces, serif' }}>
                  Request a Free Consultation
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
                  <Button type="submit" variant="contained" color="primary" size="large" endIcon={<ArrowForward />} sx={{ py: 1.6, mt: 1 }}>
                    Send Message
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Google Maps Placeholder */}
        <Box sx={{ mt: 8, height: 350, width: '100%', borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', bgcolor: '#121319' }}>
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', placeContent: 'center', gap: 1, zIndex: 1 }}>
            <Place sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>Markefied HQ</Typography>
            <Typography variant="body2" color="text.secondary">Udaipur, Rajasthan, India – 313001</Typography>
          </Box>
          {/* Stylized background to resemble dark google map */}
          <Box sx={{ width: '100%', height: '100%', opacity: 0.2, background: 'radial-gradient(circle, rgba(80,132,196,0.3) 0%, transparent 80%), repeating-linear-gradient(0deg, #111 0px, #111 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #111 0px, #111 1px, transparent 1px, transparent 40px)' }} />
        </Box>
      </Container>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Thank you! Your request has been sent. We'll get back to you shortly.
        </Alert>
      </Snackbar>
    </Box>
  );
}
