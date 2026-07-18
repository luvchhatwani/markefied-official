import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Services from '../components/Services';
import { Box, Container, Typography, Grid, Avatar, Rating, Chip, Button, Card, Accordion, AccordionSummary, AccordionDetails, TextField, Stack, Snackbar, Alert } from '@mui/material';
import { ArrowForward, ExpandMore } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';
import { Users, BarChart3, Target, LifeBuoy, Phone, Mail, MapPin } from 'lucide-react';

const WHY_PARTNER_CARDS = [
  {
    icon: Users,
    title: 'Experienced Team',
    desc: 'Certified marketing professionals and senior media buyers managing your campaigns directly.'
  },
  {
    icon: BarChart3,
    title: 'Proven Results',
    desc: 'Focused entirely on metrics that compound your bottom line — scaling qualified leads and sales.'
  },
  {
    icon: Target,
    title: 'Data-Driven Strategy',
    desc: 'Continuous keyword research, creative A/B testing, and direct conversion attribution tracking.'
  },
  {
    icon: LifeBuoy,
    title: 'Dedicated Support',
    desc: 'Direct Slack communication channel with your team and real-time custom performance dashboards.'
  }
];

const STATS = [
  { label: 'Clients Served', value: 150, suffix: '+' },
  { label: 'Campaigns Launched', value: 500, suffix: '+' },
  { label: 'Client Satisfaction', value: 95, suffix: '%' },
  { label: 'Impressions Generated', value: 25, suffix: 'M+' },
];

const PROCESS = [
  { step: '01', title: 'Discover', desc: 'We audit your current acquisition channels, analyze competitor spends, and find high-yield traffic opportunities.' },
  { step: '02', title: 'Strategy', desc: 'We design a custom ad allocation model and copy guidelines built specifically around your cost-per-lead (CPL) goals.' },
  { step: '03', title: 'Execution', desc: 'We launch optimized campaigns across Google Search and Meta Social, backed by live conversion-tracking funnels.' },
  { step: '04', title: 'Growth', desc: 'We scale high-performance ad sets, perform A/B split creative tests, and multiply your monthly conversion ROI.' }
];

const TESTIMONIALS = [
  { 
    name: 'Elena Marsh', 
    role: 'Founder, Fintra', 
    rating: 5, 
    quote: 'Markefied scaled our Meta campaigns from $5k/mo to $50k/mo while maintaining our target lead cost. Incredible partnership.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80'
  },
  { 
    name: 'Daniel Cho', 
    role: 'VP Growth, Lumen Health', 
    rating: 5, 
    quote: 'Their Google Ads strategies are second to none. We saw a 38% increase in demo sign-ups in just the first 30 days.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80'
  },
  { 
    name: 'Priya Nair', 
    role: 'Head of Marketing, Vantage', 
    rating: 5, 
    quote: 'The Slack communication and weekly campaign updates are awesome. They feel like an embedded extension of our team.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80'
  },
];

const FAQS = [
  { q: 'What services do you offer?', a: 'We specialize in Social Media Marketing (SMM), Google Ads, and Meta Ads (Facebook & Instagram) to drive traffic, leads, and sales.' },
  { q: 'How long before I see results?', a: 'While Meta and Google Ads can generate immediate traffic and conversions within the first week, full campaign optimization and consistent scaling typically take 30 to 90 days.' },
  { q: 'Do you work with small businesses?', a: 'Yes, our Starter plan is designed specifically to help growing startups and local businesses build their digital foundation.' },
  { q: 'How much do your services cost?', a: 'Our monthly plans start at $3.5k/month for Starter and $7.5k/month for our full Growth Engine. Custom enterprise partnerships are scaled based on scope.' },
];

function StatBlock({ stat }) {
  const [ref, value] = useCountUp(stat.value, { duration: 1800 });
  return (
    <Grid item xs={6} md={3}>
      <Box ref={ref} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontFamily: 'Fraunces, serif', color: 'primary.main', fontWeight: 600 }}>
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', businessName: '', message: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setFormData({ name: '', email: '', phone: '', businessName: '', message: '' });
  };

  return (
    <Box component="main">
      <Banner />
      <Services />

      {/* Stats strip */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {STATS.map((stat) => (
              <StatBlock key={stat.label} stat={stat} />
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 580, mx: 'auto', mb: 8 }}>
            <Chip label="Why Partner With Us" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 2, fontFamily: 'Fraunces, serif', fontWeight: 500 }}>
              Why Brands Partner with Markefied
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem' }}>
              We align our strategies directly with your revenue metrics, delivering senior-level expertise, transparent data, and rapid growth.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {WHY_PARTNER_CARDS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Grid item xs={12} sm={6} key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ height: '100%' }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        height: '100%',
                        p: 4.5,
                        borderRadius: '24px',
                        bgcolor: 'rgba(18, 19, 25, 0.4)',
                        backdropFilter: 'blur(16px)',
                        borderColor: 'rgba(255,255,255,0.06)',
                        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          borderColor: 'primary.main',
                          bgcolor: 'rgba(80, 132, 196, 0.04)',
                          boxShadow: '0 20px 48px rgba(80,132,196,0.12)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                        <Box sx={{
                          width: 52,
                          height: 52,
                          borderRadius: '16px',
                          bgcolor: 'accent.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={24} color="#5084C4" />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: '1.2rem' }}>{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{item.desc}</Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Our Process Timeline */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 560, mx: 'auto', mb: 8 }}>
            <Chip label="Workflow" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2, fontFamily: 'Fraunces, serif' }}>
              Our Process
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Four simple steps that take your marketing campaigns from audit board to compounding ROI.
            </Typography>
          </Box>

          <Grid container spacing={4} alignItems="stretch">
            {PROCESS.map((step, i) => (
              <Grid item xs={12} sm={6} md={3} key={step.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ height: '100%' }}
                >
                  <Box sx={{ position: 'relative', p: 4, borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.default', height: '100%', transition: 'all 0.3s ease', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' } }}>
                    {i < 3 && (
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'block' },
                          position: 'absolute',
                          top: '50%',
                          right: '-24px',
                          transform: 'translateY(-50%)',
                          zIndex: 2,
                          color: 'primary.main',
                          fontSize: 24,
                          fontWeight: 800,
                        }}
                      >
                        →
                      </Box>
                    )}
                    {i < 3 && (
                      <Box
                        sx={{
                          display: { xs: 'block', md: 'none' },
                          textAlign: 'center',
                          my: 2,
                          color: 'primary.main',
                          fontSize: 20,
                          fontWeight: 800,
                          position: 'absolute',
                          bottom: '-32px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 2
                        }}
                      >
                        ↓
                      </Box>
                    )}
                    <Typography variant="h2" sx={{ position: 'absolute', top: 16, right: 24, opacity: 0.05, fontWeight: 900, fontFamily: 'Fraunces, serif', fontSize: '2.5rem', color: 'primary.main' }}>
                      {step.step}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600, color: 'primary.main', fontFamily: 'Fraunces, serif' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{step.desc}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Chip label="Client Voices" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontFamily: 'Fraunces, serif' }}>
              Trusted by teams who care about ROI.
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              {TESTIMONIALS.map((t, idx) => {
                if (idx !== activeIdx) return null;
                return (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%' }}
                  >
                    <Box
                      sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: '28px',
                        bgcolor: 'background.paper',
                        border: '1px solid rgba(255,255,255,0.06)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2.5,
                      }}
                    >
                      <Rating value={t.rating} readOnly size="small" />
                      <Typography variant="h5" sx={{ fontStyle: 'italic', fontWeight: 400, px: { md: 4 }, fontFamily: 'Fraunces, serif' }}>
                        “{t.quote}”
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                        <Avatar src={t.avatar} sx={{ width: 44, height: 44, border: '2px solid #5084C4' }}>{t.name[0]}</Avatar>
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{t.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Box>

          {/* Dots Indicator */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
            {TESTIMONIALS.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setActiveIdx(idx)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: idx === activeIdx ? 'primary.main' : 'rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQ accordion */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
              Frequently Asked Questions
            </Typography>
          </Box>
          {FAQS.map((faq) => (
            <Accordion key={faq.q} disableGutters elevation={0} sx={{ bgcolor: 'background.default', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px !important', mb: 1.5, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}>
                <Typography sx={{ fontWeight: 600 }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Contact Section Form */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Chip label="Contact Us" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, mb: 2 }}>
                Let's scale your digital footprint.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Schedule a strategy session with Markefied today. Tell us about your goals and we'll reply within one business day with a customized marketing audit.
              </Typography>
              <Stack spacing={2.5} sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s', '&:hover': { transform: 'translateX(6px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                    <Mail size={20} color="#5084C4" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">EMAIL US</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>hello@markefied.com</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s', '&:hover': { transform: 'translateX(6px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                    <Phone size={20} color="#5084C4" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">CALL US</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>+91 94140 12345</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', transition: 'all 0.3s', '&:hover': { transform: 'translateX(6px)', borderColor: 'primary.main', bgcolor: 'rgba(80,132,196,0.04)' } }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={20} color="#5084C4" />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">LOCATION</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Udaipur, Rajasthan, India – 313001</Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Box component="form" onSubmit={handleContactSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth label="Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField required fullWidth label="Email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Business Name" name="businessName" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} variant="outlined" />
                    </Grid>
                  </Grid>
                  <TextField required fullWidth multiline rows={4} label="Message" name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} variant="outlined" />
                  <Button type="submit" variant="contained" color="primary" size="large" endIcon={<ArrowForward />} sx={{ py: 1.6 }}>
                    Get Free Consultation
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Thank you! We have received your consultation request.
        </Alert>
      </Snackbar>
    </Box>
  );
}
