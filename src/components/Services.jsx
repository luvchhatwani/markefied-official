import { useRef } from 'react';
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material';
import { ArrowOutward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Share2, Search, Target } from 'lucide-react';

const SERVICES = [
  {
    id: 'smm',
    icon: Share2,
    title: 'Social Media Marketing',
    description:
      'Grow your audience and build a strong brand presence across Instagram, Facebook, LinkedIn, and other platforms.',
  },
  {
    id: 'google',
    icon: Search,
    title: 'Google Ads',
    description:
      'Generate high-quality leads and maximize ROI with data-driven Google advertising campaigns.',
  },
  {
    id: 'meta',
    icon: Target,
    title: 'Meta Ads',
    description:
      'Reach the right audience using Facebook and Instagram ads designed for conversions and sales.',
  },
];

function TiltCard({ service, index }) {
  const ref = useRef(null);
  const Icon = service.icon;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-6px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)';
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: '100%' }}
      >
        <Box
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          sx={{
            position: 'relative',
            height: '100%',
            p: '1.5px',
            borderRadius: '24px',
            background: 'linear-gradient(160deg, rgba(80,132,196,0.15), rgba(255, 255, 255, 0.03))',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
            '&:hover': {
              background: 'linear-gradient(160deg, #5084C4, rgba(80,132,196,0.1))',
              boxShadow: '0 20px 48px rgba(80,132,196,0.12)',
            }
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRadius: '23px',
              bgcolor: 'background.paper',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              p: 3.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '16px',
                bgcolor: 'accent.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={24} color="#5084C4" strokeWidth={1.75} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{service.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, lineHeight: 1.6 }}>
              {service.description}
            </Typography>
            <Button
              endIcon={<ArrowOutward sx={{ fontSize: 16 }} />}
              onClick={() => window.location.href = `/services#${service.id}`}
              sx={{
                alignSelf: 'flex-start',
                px: 0,
                fontWeight: 600,
                color: 'primary.main',
                '&:hover': { bgcolor: 'transparent', color: 'primary.light' },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Grid>
  );
}

export default function Services() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 620, mb: 7 }}>
          <Chip label="What We Do" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2, fontFamily: 'Fraunces, serif', fontWeight: 500 }}>
            Three Core Disciplines. One Growth Engine.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
            We focus entirely on performance marketing and creative strategy — scaling your campaigns across search, social, and remarketing for maximum customer acquisition.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SERVICES.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
