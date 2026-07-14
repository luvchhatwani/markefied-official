import { useRef } from 'react';
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material';
import { ArrowOutward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Palette, Code2, Boxes, LineChart } from 'lucide-react';

const SERVICES = [
  {
    icon: Palette,
    title: 'Product Design',
    description:
      'Interfaces engineered for clarity — wireframe to pixel-perfect design system, built for how people actually use software.',
  },
  {
    icon: Code2,
    title: 'Engineering',
    description:
      'Production-grade React, motion, and infrastructure. We ship code the same way we design: precise, tested, and fast.',
  },
  {
    icon: Boxes,
    title: 'Brand Systems',
    description:
      'Identity, tone, and visual language that scale across every surface — from a landing page to a full product suite.',
  },
  {
    icon: LineChart,
    title: 'Growth & Strategy',
    description:
      'Data-informed decisions on positioning, funnels, and experimentation so design work compounds into real outcomes.',
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
    <Grid item xs={12} sm={6} md={3}>
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
            p: '1px',
            borderRadius: '24px',
            background: 'linear-gradient(160deg, rgba(80,132,196,0.5), rgba(17,17,17,0.08))',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform',
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRadius: '23px',
              bgcolor: 'rgba(255,255,255,0.75)',
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
            <Typography variant="h6">{service.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
              {service.description}
            </Typography>
            <Button
              endIcon={<ArrowOutward sx={{ fontSize: 16 }} />}
              sx={{
                alignSelf: 'flex-start',
                px: 0,
                fontWeight: 600,
                color: 'secondary.main',
                '&:hover': { bgcolor: 'transparent', color: 'primary.main' },
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
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2 }}>
            Four disciplines, one studio.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We keep the team small and the craft high — every engagement moves through the
            same disciplined process, from first sketch to shipped product.
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
