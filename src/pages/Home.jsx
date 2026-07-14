import Banner from '../components/Banner';
import Services from '../components/Services';
import { Box, Container, Typography, Grid, Avatar, Rating, Chip, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';

const STATS = [
  { label: 'Products Shipped', value: 128, suffix: '+' },
  { label: 'Happy Clients', value: 64, suffix: '+' },
  { label: 'Awwwards Won', value: 12, suffix: '' },
  { label: 'Team Members', value: 24, suffix: '' },
];

const TESTIMONIALS = [
  {
    name: 'Elena Marsh',
    role: 'VP Product, Fintra',
    quote:
      'Nexora rebuilt our entire onboarding flow in six weeks — conversion is up 38% and the team still talks about the handoff docs.',
  },
  {
    name: 'Daniel Cho',
    role: 'Founder, Lumen Health',
    quote:
      'Every animation feels intentional. Nothing about this team reads as a template — it reads as a point of view.',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Design, Vantage',
    quote:
      'We brought Nexora in for one sprint and kept them for a year. That says everything about the quality of collaboration.',
  },
];

function StatBlock({ stat }) {
  const [ref, value] = useCountUp(stat.value, { duration: 1800 });
  return (
    <Grid item xs={6} md={3}>
      <Box ref={ref} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontFamily: 'Fraunces, serif', color: 'primary.main' }}>
          {value}
          {stat.suffix}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {stat.label}
        </Typography>
      </Box>
    </Grid>
  );
}

export default function Home() {
  return (
    <Box component="main">
      <Banner />
      <Services />

      {/* Stats strip */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'accent.main' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {STATS.map((stat) => (
              <StatBlock key={stat.label} stat={stat} />
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 560, mx: 'auto', mb: 7 }}>
            <Chip label="Client Voices" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Trusted by teams who care about craft.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {TESTIMONIALS.map((t, i) => (
              <Grid item xs={12} md={4} key={t.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      p: 3.5,
                      borderRadius: '20px',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <Rating value={5} readOnly size="small" />
                    <Typography variant="body1" sx={{ flexGrow: 1, fontStyle: 'italic' }}>
                      “{t.quote}”
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{t.name[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 10, md: 12 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #111111 0%, #2B3E56 100%)',
              color: '#fff',
              p: { xs: 5, md: 8 },
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -80,
                left: -80,
                width: 260,
                height: 260,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(80,132,196,0.5), transparent 70%)',
              }}
            />
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, mb: 2, position: 'relative' }}>
              Have a product that deserves this kind of craft?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, mx: 'auto', mb: 4, position: 'relative' }}>
              Tell us about your project — we reply within one business day, always with a human.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ px: 4, py: 1.6, position: 'relative' }}
            >
              Start a Conversation
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
