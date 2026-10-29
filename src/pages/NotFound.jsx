import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, MiscellaneousServices, Mail } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: 16, md: 20 },
        pb: { xs: 12, md: 16 },
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Fraunces, serif',
              fontSize: { xs: '5rem', md: '7.5rem' },
              fontWeight: 700,
              color: 'primary.main',
              lineHeight: 1,
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, fontFamily: 'Fraunces, serif' }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track to scaling your digital marketing.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={NavLink}
              to="/"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<HomeIcon />}
              sx={{ px: 3.5, py: 1.4 }}
            >
              Return Home
            </Button>
            <Button
              component={NavLink}
              to="/services"
              variant="outlined"
              size="large"
              startIcon={<MiscellaneousServices />}
              sx={{ px: 3.5, py: 1.4, borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              View Services
            </Button>
            <Button
              component={NavLink}
              to="/contact"
              variant="text"
              size="large"
              startIcon={<Mail />}
              sx={{ px: 3, py: 1.4, color: 'primary.light' }}
            >
              Contact Us
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
