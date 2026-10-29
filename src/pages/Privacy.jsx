import { Box, Container, Typography, Stack, Chip, Divider, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip label="Legal & Trust" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2, fontFamily: 'Fraunces, serif', fontWeight: 500 }}>
              Privacy Policy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: October 2026 · Markefied Official
            </Typography>
          </Box>

          <Box
            sx={{
              p: { xs: 3.5, md: 6 },
              borderRadius: '24px',
              bgcolor: 'background.paper',
              border: '1px solid rgba(255,255,255,0.06)',
              lineHeight: 1.8,
            }}
          >
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  1. Overview
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Markefied ("we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website (markefied.com) or interact with our digital marketing services.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  2. Information We Collect
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                  We collect information that you voluntarily provide to us when you:
                </Typography>
                <Typography component="ul" color="text.secondary" sx={{ pl: 3, m: 0 }}>
                  <li>Request a free marketing consultation or audit through our contact forms.</li>
                  <li>Subscribe to our growth newsletter or email updates.</li>
                  <li>Communicate with our team via email, telephone, or WhatsApp.</li>
                  <li>Engage our agency for Social Media Marketing, Google Ads, or Meta Ads management.</li>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>
                  This information typically includes your name, business email address, phone number, company name, website URL, and campaign goals.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  3. How We Use Your Information
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                  We use the information we collect solely for legitimate business purposes, including:
                </Typography>
                <Typography component="ul" color="text.secondary" sx={{ pl: 3, m: 0 }}>
                  <li>Delivering tailored marketing audits, campaign forecasts, and service proposals.</li>
                  <li>Executing and optimizing agreed-upon advertising campaigns and deliverables.</li>
                  <li>Sending analytical performance reports and invoice updates.</li>
                  <li>Improving our website performance, user experience, and service offerings.</li>
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  4. Data Security & Protection
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We implement robust industry-standard technical and organizational security measures to protect your personal and business data. We never sell, rent, or lease your personal information to third parties. Access to client ad accounts and analytics data is strictly restricted to authorized agency team members.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  5. Contact Us Regarding Privacy
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  If you have questions, feedback, or requests regarding this Privacy Policy or your data, please reach out to our privacy officer:
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.light', fontWeight: 600 }}>
                  Email: markefied.official21@gmail.com
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  Address: 9-A, Jawahar Nagar, Udaipur, Rajasthan, India – 313001
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Button
              component={NavLink}
              to="/"
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{ borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              Back to Home
            </Button>
            <Button
              component={NavLink}
              to="/terms"
              variant="text"
              endIcon={<ArrowForward />}
              sx={{ color: 'primary.main' }}
            >
              Terms of Service
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

