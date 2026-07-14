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

const TIMELINE = [
  { year: '2019', title: 'Studio founded', text: 'Two designers and a laptop, working out of a co-working space in SF.' },
  { year: '2021', title: 'First 50 clients', text: 'Grew the team to 8 and shipped products across fintech, health, and climate.' },
  { year: '2023', title: 'Awwwards recognition', text: 'Won our first Site of the Day award, then five more over the following year.' },
  { year: '2026', title: 'Where we are now', text: 'A 24-person studio partnering with teams who care as much about craft as we do.' },
];

const TEAM = [
  { name: 'Sofia Marchetti', role: 'Founder & Creative Director' },
  { name: 'Owen Bright', role: 'Head of Engineering' },
  { name: 'Ines Kader', role: 'Lead Product Designer' },
  { name: 'Marcus Feld', role: 'Motion & Interaction Lead' },
];

const STATS = [
  { label: 'Years in Business', value: 7 },
  { label: 'Countries Served', value: 19 },
  { label: 'Retention Rate', value: 94, suffix: '%' },
];

function AboutStat({ stat }) {
  const [ref, value] = useCountUp(stat.value, { duration: 1600 });
  return (
    <Grid item xs={4}>
      <Box ref={ref} sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontFamily: 'Fraunces, serif', color: 'primary.main' }}>
          {value}
          {stat.suffix || ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {stat.label}
        </Typography>
      </Box>
    </Grid>
  );
}

export default function About() {
  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 } }}>
      {/* Intro */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
        <Chip label="Our Story" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 3 }}>
            We build software the way ateliers build furniture.
          </Typography>
        </motion.div>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
          Nexora is a design & engineering studio founded on one belief: the interfaces people use
          every day deserve the same care as anything crafted by hand. We're small on purpose —
          every project gets our full attention, from the first sketch to the last pixel.
        </Typography>
      </Container>

      {/* Mission / Vision */}
      <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 10 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'accent.main', height: '100%' }}>
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To help ambitious teams turn complex ideas into interfaces that feel simple,
                  fast, and inevitable — without cutting corners on craft.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'secondary.main', color: '#fff', height: '100%' }}>
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                  A world where good design isn't a luxury reserved for a handful of flagship
                  apps — where every product a person touches feels considered.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Stats */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            {STATS.map((stat) => (
              <AboutStat key={stat.label} stat={stat} />
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', mb: 5 }}>
          How we got here
        </Typography>
        <Timeline position="alternate">
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.year}>
              <TimelineOppositeContent color="text.secondary" sx={{ fontWeight: 600 }}>
                {item.year}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={i % 2 === 0 ? 'primary' : 'grey'} />
                {i < TIMELINE.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>

      {/* Team */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', mb: 5 }}>
          The people behind Nexora
        </Typography>
        <Grid container spacing={3}>
          {TEAM.map((member, i) => (
            <Grid item xs={6} md={3} key={member.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ width: 88, height: 88, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: 26 }}>
                    {member.name[0]}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxWidth="md" sx={{ pb: { xs: 10, md: 14 }, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Want to work with us?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We take on a small number of new engagements each quarter.
        </Typography>
        <Button variant="contained" color="primary" size="large" endIcon={<ArrowForward />} sx={{ px: 4 }}>
          Get in Touch
        </Button>
      </Container>
    </Box>
  );
}
