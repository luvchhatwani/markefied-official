import { Box, Container, Typography, Grid, Chip, Avatar, Button } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';
import aboutImage from '../assets/pexels-mikael-blomkvist-6476785.jpg';

const TIMELINE = [
  { year: '2019', title: 'Markefied Founded', text: 'Started as a small local SEO and digital consulting consultancy.' },
  { year: '2021', title: 'First 100 Campaigns', text: 'Expanded services to include dedicated Google Ads & Meta PPC management.' },
  { year: '2023', title: 'Performance Scale', text: 'Recognized as an emerging top ROI digital marketing agency for e-commerce and B2B brands.' },
  { year: '2026', title: 'Where We Are Now', text: 'A team of professional media buyers and copywriters driving growth worldwide.' },
];

const TEAM = [
  { name: 'Sofia Marchetti', role: 'Founder & Managing Director', initial: 'S', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&fit=crop&q=80' },
  { name: 'Owen Bright', role: 'Head of Paid Acquisition (PPC)', initial: 'O', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&fit=crop&q=80' },
  { name: 'Ines Kader', role: 'Lead Creative Strategist', initial: 'I', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&fit=crop&q=80' },
  { name: 'Marcus Feld', role: 'Director of Social Media Strategy', initial: 'M', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&fit=crop&q=80' },
];

const STATS = [
  { label: 'Years of Experience', value: 7 },
  { label: 'Campaigns Launched', value: 500, suffix: '+' },
  { label: 'Happy Clients', value: 150, suffix: '+' },
  { label: 'Average ROI Increase', value: 95, suffix: '%' },
];

function AboutStat({ stat }) {
  const [ref, value] = useCountUp(stat.value, { duration: 1600 });
  return (
    <Grid item xs={6} md={3}>
      <Box ref={ref} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontFamily: 'Fraunces, serif', color: 'primary.main', fontWeight: 600 }}>
          {value}
          {stat.suffix || ''}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {stat.label}
        </Typography>
      </Box>
    </Grid>
  );
}

export default function About() {
  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 }, bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Intro Grid */}
      <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'left' }}>
              <Chip label="About Markefied" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, mb: 3, fontFamily: 'Fraunces, serif', lineHeight: 1.15, fontWeight: 500 }}>
                  A Team Dedicated to Your Revenue Growth.
                </Typography>
              </motion.div>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.7, mb: 3 }}>
                At Markefied, we believe digital marketing shouldn't be a mystery. We are a specialized team of advertising buyers, copywriters, and marketing strategists who partner with growing brands to build predictable lead and sales pipelines.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                We don't focus on fluff or vanity metrics. Instead, we direct our attention to the metrics that compound your bottom line — optimizing paid ad campaigns, decreasing customer acquisition costs, and maximizing ROAS.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  height: { xs: 280, md: 420 },
                  boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Box
                  component="img"
                  src={aboutImage}
                  alt="Markefied Strategy Session"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Mission / Vision */}
      <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ height: '100%' }}>
              <Box sx={{ p: { xs: 4, md: 5 }, borderRadius: '24px', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)', height: '100%' }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'primary.main', fontFamily: 'Fraunces, serif' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  To demystify digital advertising and deliver clear, performance-driven campaigns that help business owners scale revenue and capture market share with absolute confidence.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ height: '100%' }}>
              <Box sx={{ p: { xs: 4, md: 5 }, borderRadius: '24px', bgcolor: 'secondary.main', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', height: '100%' }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'primary.light', fontFamily: 'Fraunces, serif' }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                  To build a transparent, results-first marketing agency where every advertising dollar spent is fully attributed, optimized, and aligned directly with real business ROI.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Stats */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {STATS.map((stat) => (
              <AboutStat key={stat.label} stat={stat} />
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline */}
      <Container maxWidth="md" sx={{ py: { xs: 10, md: 14 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', mb: 6, fontFamily: 'Fraunces, serif' }}>
          How we got here
        </Typography>
        <Timeline position="alternate">
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.year}>
              <TimelineOppositeContent color="text.secondary" sx={{ fontWeight: 600, py: 2 }}>
                {item.year}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={i % 2 === 0 ? 'primary' : 'grey'} />
                {i < TIMELINE.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: 2 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.text}
                  </Typography>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>

      {/* Team */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', mb: 6, fontFamily: 'Fraunces, serif' }}>
          The people behind Markefied
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {TEAM.map((member, i) => (
            <Grid item xs={6} md={3} key={member.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={member.photo}
                    sx={{
                      width: 96,
                      height: 96,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: 26,
                      fontWeight: 700,
                      boxShadow: '0 8px 24px rgba(80,132,196,0.15)',
                      border: '2px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    {member.initial}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {member.role}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxWidth="md" sx={{ pb: { xs: 10, md: 14 }, pt: 6, textAlign: 'center' }}>
        <Box sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '28px', p: { xs: 5, md: 7 } }}>
          <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Fraunces, serif' }}>
            Want to scale your business ROI?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 440, mx: 'auto' }}>
            We work with a select number of brands each month to guarantee focused creative resources and media buying depth.
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => window.location.href = '/contact'} endIcon={<ArrowForward />} sx={{ px: 4, py: 1.6 }}>
            Get in Touch
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
