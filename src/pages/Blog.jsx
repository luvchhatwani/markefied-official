import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Card,
  CardContent,
  CardMedia,
  InputBase,
  IconButton,
  Avatar,
  Pagination,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { Search, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Design', 'Engineering', 'Culture', 'Case Studies'];

const POSTS = [
  { id: 1, title: 'What "Apple-style" motion actually means', category: 'Design', author: 'Marcus Feld', date: 'Jun 2, 2026', read: '6 min', gradient: 'linear-gradient(135deg,#5084C4,#2B3E56)' },
  { id: 2, title: 'Building a scroll-driven hero with GSAP + Lenis', category: 'Engineering', author: 'Owen Bright', date: 'May 24, 2026', read: '9 min', gradient: 'linear-gradient(135deg,#111111,#3A3A3A)' },
  { id: 3, title: 'Inside our 6-week fintech redesign', category: 'Case Studies', author: 'Ines Kader', date: 'May 12, 2026', read: '7 min', gradient: 'linear-gradient(135deg,#7FA5D6,#5084C4)' },
  { id: 4, title: 'Why we keep the studio at 24 people', category: 'Culture', author: 'Sofia Marchetti', date: 'Apr 30, 2026', read: '4 min', gradient: 'linear-gradient(135deg,#2B3E56,#111111)' },
  { id: 5, title: 'A practical guide to glassmorphism in 2026', category: 'Design', author: 'Marcus Feld', date: 'Apr 18, 2026', read: '5 min', gradient: 'linear-gradient(135deg,#5084C4,#7FA5D6)' },
  { id: 6, title: 'React performance patterns we actually use', category: 'Engineering', author: 'Owen Bright', date: 'Apr 6, 2026', read: '8 min', gradient: 'linear-gradient(135deg,#111111,#5084C4)' },
];

const FEATURED = {
  title: 'The anatomy of a scene-changing hero section',
  excerpt:
    'We break down how we build hero sections that transform as you scroll — the ScrollTrigger timeline, the layered parallax, and the small details that make it feel expensive.',
  author: 'Marcus Feld',
  role: 'Motion & Interaction Lead',
  date: 'Jun 10, 2026',
  read: '11 min read',
};

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;

  const filtered = useMemo(() => {
    return POSTS.filter((p) => {
      const matchCategory = category === 'All' || p.category === category;
      const matchQuery = p.title.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));

  return (
    <Box component="main" sx={{ pt: { xs: 14, md: 18 } }}>
      {/* Header */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Chip label="Journal" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
        <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2 }}>
          Notes on design, code, and craft.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Field notes from the studio — how we design, build, and think about products.
        </Typography>
      </Container>

      {/* Featured post */}
      <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 10 } }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card sx={{ borderRadius: '28px', overflow: 'hidden', display: { xs: 'block', md: 'flex' } }} elevation={2}>
            <Box sx={{ flex: 1, minHeight: 280, background: 'linear-gradient(135deg,#111111,#2B3E56,#5084C4)' }} />
            <CardContent sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
              <Chip label="Featured" size="small" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
              <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                {FEATURED.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {FEATURED.excerpt}
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>{FEATURED.author[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle2">{FEATURED.author}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {FEATURED.role} · {FEATURED.date} · {FEATURED.read}
                  </Typography>
                </Box>
              </Stack>
              <Button variant="contained" color="primary" endIcon={<ArrowForward />}>
                Read Article
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Filters */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 2, alignItems: { sm: 'center' } }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                color={category === cat ? 'primary' : 'default'}
                variant={category === cat ? 'filled' : 'outlined'}
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Stack>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'accent.main',
              borderRadius: 3,
              px: 2,
              py: 0.5,
              minWidth: { sm: 260 },
            }}
          >
            <Search fontSize="small" color="action" />
            <InputBase
              placeholder="Search articles…"
              fullWidth
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Articles grid */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          {paginated.map((post, i) => (
            <Grid item xs={12} sm={6} key={post.id}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card sx={{ borderRadius: '20px', height: '100%' }} variant="outlined">
                  <CardMedia sx={{ height: 160, background: post.gradient }} />
                  <CardContent>
                    <Chip label={post.category} size="small" sx={{ mb: 1.5, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
                    <Typography variant="h6" sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                      {post.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 26, height: 26, fontSize: 12, bgcolor: 'primary.main' }}>{post.author[0]}</Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {post.author} · {post.date} · {post.read}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
          {paginated.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 6 }}>
                No articles match your search.
              </Typography>
            </Grid>
          )}
        </Grid>

        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
          </Box>
        )}
      </Container>

      {/* Newsletter */}
      <Container maxWidth="md" sx={{ pb: { xs: 10, md: 14 } }}>
        <Box sx={{ borderRadius: '28px', bgcolor: 'secondary.main', color: '#fff', p: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Get one good idea a week
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
            Short, useful notes on design and engineering. No spam, unsubscribe anytime.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, maxWidth: 420, mx: 'auto' }}>
            <TextField
              placeholder="you@company.com"
              fullWidth
              size="small"
              sx={{
                input: { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                },
              }}
            />
            <Button variant="contained" color="primary" sx={{ px: 3, whiteSpace: 'nowrap' }}>
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
