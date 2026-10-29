import { Box, Container, Typography, Stack, Chip, Divider, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip label="Legal & Trust" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2, fontFamily: 'Fraunces, serif', fontWeight: 500 }}>
              Terms of Service
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
                  1. Agreement to Terms
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  By accessing markefied.com or engaging Markefied for digital marketing, advertising consulting, or campaign management, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  2. Scope of Services
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Markefied provides digital advertising management, performance marketing strategy, creative consultation, and search & social media advertising campaigns (including Google Ads, Meta Ads, and Social Media Marketing). Specific deliverables, scope, timelines, and budgets are agreed upon in writing between Markefied and the client.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  3. Client Responsibilities
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                  To ensure optimal campaign performance, clients agree to:
                </Typography>
                <Typography component="ul" color="text.secondary" sx={{ pl: 3, m: 0 }}>
                  <li>Provide timely access to ad accounts, tracking tags, and necessary brand assets.</li>
                  <li>Maintain accurate advertising budgets directly with platforms (e.g. Google, Meta).</li>
                  <li>Provide feedback and sign-off on ad copy and creative directions within agreed timelines.</li>
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  4. Intellectual Property
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  All bespoke creative assets, ad creatives, and copywriting developed specifically for the client upon full payment become the property of the client. Markefied retains ownership of proprietary internal frameworks, analytical tools, and standardized media buying blueprints.
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              <Box>
                <Typography variant="h5" sx={{ mb: 1.5, color: 'primary.main', fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
                  5. Inquiries & Legal Notices
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  For any legal inquiries regarding these terms, please contact:
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.light', fontWeight: 600 }}>
                  Email: markefied.official21@gmail.com
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  Phone: +91 7850915986
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
              to="/privacy"
              variant="text"
              endIcon={<ArrowForward />}
              sx={{ color: 'primary.main' }}
            >
              Privacy Policy
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

