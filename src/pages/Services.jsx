import { Box, Container, Typography, Grid, Chip, Button, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Divider, Stack } from '@mui/material';
import { ExpandMore, Check, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Palette, Code2, Boxes, LineChart, ShieldCheck, Zap } from 'lucide-react';

const ALL_SERVICES = [
  { icon: Palette, title: 'Product Design', text: 'UX research, wireframes, and pixel-perfect UI built on a durable design system.' },
  { icon: Code2, title: 'Engineering', text: 'React, motion, and infrastructure written to production standard from day one.' },
  { icon: Boxes, title: 'Brand Systems', text: 'Identity, voice, and visual language that hold up across every surface.' },
  { icon: LineChart, title: 'Growth & Strategy', text: 'Positioning, funnels, and experiments so the design work compounds.' },
];

const FEATURES = [
  { icon: Zap, title: 'Fast iteration', text: 'Weekly builds you can click through, not static decks.' },
  { icon: ShieldCheck, title: 'Senior-only team', text: 'No juniors learning on your budget — every hour is senior craft.' },
  { icon: Check, title: 'Fixed scope', text: 'Clear deliverables and timelines agreed before day one.' },
];

const PLANS = [
  {
    name: 'Sprint',
    price: '$12k',
    period: '/ 2 weeks',
    description: 'A focused design sprint for a single flow or feature.',
    features: ['1 senior designer', 'Up to 2 flows', 'Daily async updates', 'Figma handoff'],
    highlighted: false,
  },
  {
    name: 'Studio',
    price: '$28k',
    period: '/ month',
    description: 'Our most popular engagement — a dedicated pod for your product.',
    features: ['Design + engineering pod', 'Unlimited requests', 'Weekly working demos', 'Slack-based collaboration'],
    highlighted: true,
  },
  {
    name: 'Partner',
    price: 'Custom',
    period: '',
    description: 'Ongoing partnership for teams scaling design & engineering together.',
    features: ['Dedicated team of 4+', 'Quarterly roadmap planning', 'Priority response SLA', 'Embedded in your tools'],
    highlighted: false,
  },
];

const FAQS = [
  { q: 'How fast can we start?', a: 'Most engagements kick off within two weeks of signing, once we\'ve scoped the work together.' },
  { q: 'Do you work with early-stage startups?', a: 'Yes — the Sprint plan is designed for exactly that: a focused, fixed-scope engagement.' },
  { q: 'What tools do you use?', a: 'Figma for design, React/TypeScript for engineering, and Linear or your existing tracker for project management.' },
  { q: 'Can we hire you for ongoing work?', a: 'The Partner plan is built for that — a dedicated team embedded in your roadmap on a rolling basis.' },
];

export default function ServicesPage() {
  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 } }}>
      {/* Hero */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
        <Chip label="Services" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 3 }}>
            Everything a modern product team needs, under one roof.
          </Typography>
        </motion.div>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mx: 'auto' }}>
          From first sketch to shipped feature — we design, build, and iterate with you, not just for you.
        </Typography>
      </Container>

      {/* All services */}
      <Container maxWidth="lg" id="design" sx={{ mb: { xs: 8, md: 10 } }}>
        <Grid container spacing={3}>
          {ALL_SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Grid item xs={12} sm={6} key={s.title} id={s.title === 'Engineering' ? 'engineering' : s.title === 'Brand Systems' ? 'brand' : undefined}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card variant="outlined" sx={{ p: 3, height: '100%', borderRadius: '20px', display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'accent.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={22} color="#5084C4" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>{s.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{s.text}</Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Why choose us */}
      <Box id="growth" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'accent.main' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', mb: 5 }}>
            Why teams choose Nexora
          </Typography>
          <Grid container spacing={4}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Grid item xs={12} md={4} key={f.title}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: 1 }}>
                        <Icon size={24} color="#5084C4" />
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{f.text}</Typography>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Pricing */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', mb: 1 }}>
          Simple, transparent pricing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 5 }}>
          No hidden fees. Cancel or change scope anytime.
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {PLANS.map((plan, i) => (
            <Grid item xs={12} md={4} key={plan.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ height: '100%' }}
              >
                <Card
                  elevation={plan.highlighted ? 6 : 1}
                  sx={{
                    height: '100%',
                    borderRadius: '24px',
                    border: plan.highlighted ? '2px solid #5084C4' : '1px solid',
                    borderColor: plan.highlighted ? 'primary.main' : 'divider',
                    p: 1,
                    position: 'relative',
                    transform: plan.highlighted ? { md: 'scale(1.04)' } : 'none',
                  }}
                >
                  {plan.highlighted && (
                    <Chip label="Most Popular" color="primary" size="small" sx={{ position: 'absolute', top: 20, right: 20, fontWeight: 600 }} />
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>{plan.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                      {plan.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 3 }}>
                      <Typography variant="h3" sx={{ fontFamily: 'Fraunces, serif' }}>{plan.price}</Typography>
                      <Typography variant="body2" color="text.secondary">{plan.period}</Typography>
                    </Box>
                    <Stack spacing={1.2} sx={{ mb: 3 }}>
                      {plan.features.map((f) => (
                        <Stack direction="row" spacing={1} alignItems="center" key={f}>
                          <Check sx={{ fontSize: 18, color: 'primary.main' }} />
                          <Typography variant="body2">{f}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      variant={plan.highlighted ? 'contained' : 'outlined'}
                      color="primary"
                      size="large"
                    >
                      Choose {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', mb: 5 }}>
          Frequently asked questions
        </Typography>
        {FAQS.map((faq) => (
          <Accordion key={faq.q} disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px !important', mb: 1.5, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 600 }}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Contact CTA */}
      <Container maxWidth="md" sx={{ pb: { xs: 10, md: 14 } }}>
        <Divider sx={{ mb: 6 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Ready to start your project?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Tell us what you're building — we'll reply with next steps within one business day.
          </Typography>
          <Button variant="contained" color="primary" size="large" endIcon={<ArrowForward />} sx={{ px: 4 }}>
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
