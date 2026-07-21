import { Box, Container, Typography, Grid, Chip, Button, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Divider, Stack } from '@mui/material';
import { ExpandMore, Check, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Share2, Search, Target, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const ALL_SERVICES = [
  { id: 'smm', icon: Share2, title: 'Social Media Marketing', text: 'Grow your audience and build a strong brand presence across Instagram, Facebook, LinkedIn, and other platforms.' },
  { id: 'google', icon: Search, title: 'Google Ads', text: 'Generate high-quality leads and maximize ROI with data-driven Google advertising campaigns.' },
  { id: 'meta', icon: Target, title: 'Meta Ads', text: 'Reach the right audience using Facebook and Instagram ads designed for conversions and sales.' },
];

const FEATURES = [
  { icon: Zap, title: 'Performance Driven', text: 'We focus entirely on metrics that matter — leads, conversions, and customer acquisition cost.' },
  { icon: ShieldCheck, title: 'Expert Advertisers', text: 'No junior accounts managers. Your campaigns are run by certified advertising specialists.' },
  { icon: Check, title: 'Transparent ROI Dashboards', text: 'Live custom marketing reports so you always know exactly where your spend goes.' },
  { icon: BarChart3, title: 'Data-Driven Strategy', text: 'Every campaign is backed by audience insights, market research, and real-time analytics to maximize growth and long-term success.' },
];

const PLANS = [
  {
    name: 'Starter Marketing',
    price: '$3.5k',
    period: '/ month',
    description: 'Perfect for startups and local businesses looking to establish their online presence.',
    features: ['Social Media Management', 'Basic Google & Meta Ads', 'Monthly Performance Reports', 'Email Support'],
    highlighted: false,
  },
  {
    name: 'Growth Engine',
    price: '$7.5k',
    period: '/ month',
    description: 'Our most popular plan — scaling campaigns across search, social, and remarketing channels.',
    features: ['Omnichannel Ads Management', 'Weekly Campaign Optimizations', 'Custom Landing Page Designs', 'Dedicated Slack Channel', 'Bi-weekly Video Strategy Calls'],
    highlighted: true,
  },
  {
    name: 'Enterprise Scale',
    price: 'Custom',
    period: '',
    description: 'Full-scale marketing department partnership with custom strategies for large-scale brands.',
    features: ['Dedicated Account Team', 'Uncapped Ads Budget Management', 'Advanced Analytics & Attributions', 'Creative Ad Copy & Design Pod', '24/7 Priority SLA Support'],
    highlighted: false,
  },
];

const FAQS = [
  { q: 'What services do you offer?', a: 'We specialize in Social Media Marketing (SMM), Google Ads, and Meta Ads (Facebook & Instagram) to drive traffic, leads, and sales.' },
  { q: 'How long before I see results?', a: 'While Meta and Google Ads can generate immediate traffic and conversions within the first week, full campaign optimization and consistent scaling typically take 30 to 90 days.' },
  { q: 'Do you work with small businesses?', a: 'Yes, our Starter plan is designed specifically to help growing startups and local businesses build their digital foundation.' },
  { q: 'How much do your services cost?', a: 'Our monthly plans start at $3.5k/month for Starter and $7.5k/month for our full Growth Engine. Custom enterprise partnerships are scaled based on scope.' },
];

export default function ServicesPage() {
  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 } }}>
      {/* Hero */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
        <Chip label="Services" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 3, fontFamily: 'Fraunces, serif' }}>
            Paid Acquisition & Social Growth That Scales
          </Typography>
        </motion.div>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mx: 'auto', fontSize: '1.1rem' }}>
          We focus on what matters: driving leads, revenue, and compounding ROI for your business through optimized Google Ads, Meta Ads, and organic social strategy.
        </Typography>
      </Container>

      {/* All services */}
      <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 10 } }}>
        <Grid container spacing={3} justifyContent="center">
          {ALL_SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={s.title} id={s.id}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card variant="outlined" sx={{ p: 3, height: '100%', borderRadius: '20px', display: 'flex', gap: 2.5, alignItems: 'flex-start', bgcolor: 'background.paper', borderColor: 'rgba(255,255,255,0.06)' }}>
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
            Why brands partner with Markefied
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={4}>
                {FEATURES.slice(0, 2).map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: 1, border: '1px solid rgba(255,255,255,0.06)' }}>
                          <Icon size={24} color="#5084C4" />
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>{f.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{f.text}</Typography>
                      </Box>
                    </motion.div>
                  );
                })}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={4}>
                {FEATURES.slice(2, 4).map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i + 2) * 0.1 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: 1, border: '1px solid rgba(255,255,255,0.06)' }}>
                          <Icon size={24} color="#5084C4" />
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>{f.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{f.text}</Typography>
                      </Box>
                    </motion.div>
                  );
                })}
              </Stack>
            </Grid>
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transform: plan.highlighted ? { md: 'scale(1.04)' } : 'none',
                    bgcolor: 'background.paper',
                  }}
                >
                  {plan.highlighted && (
                    <Chip label="Most Popular" color="primary" size="small" sx={{ position: 'absolute', top: 20, right: 20, fontWeight: 600 }} />
                  )}
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>{plan.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                        {plan.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 3 }}>
                        <Typography variant="h3" sx={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}>{plan.price}</Typography>
                        <Typography variant="body2" color="text.secondary">{plan.period}</Typography>
                      </Box>
                      <Stack spacing={1.2} sx={{ mb: 4 }}>
                        {plan.features.map((f) => (
                          <Stack direction="row" spacing={1} alignItems="center" key={f}>
                            <Check sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Typography variant="body2">{f}</Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
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
          <Accordion key={faq.q} disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px !important', mb: 1.5, '&:before': { display: 'none' }, bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}>
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
          <Typography variant="h4" sx={{ mb: 2 }}>Ready to scale your digital presence?</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Tell us about your growth goals — we'll reply with a customized marketing audit within one business day.
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => window.location.href = '/contact'} endIcon={<ArrowForward />} sx={{ px: 4 }}>
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
