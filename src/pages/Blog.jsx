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
  Avatar,
  Pagination,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { Search, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Social Media', 'PPC', 'SEO', 'ROI & Strategy'];

const POSTS = [
  {
    id: 1,
    title: 'Why Every Local Business Needs Digital Marketing',
    category: 'SEO',
    author: 'Ines Kader',
    date: 'Jun 2, 2026',
    read: '6 min',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    desc: 'Local storefronts are missing out on massive sales. Learn how simple changes in localized Search Engine Optimization and targeted map ads drive foot traffic.'
  },
  {
    id: 2,
    title: 'Google Ads Mistakes That Waste Your Budget',
    category: 'PPC',
    author: 'Owen Bright',
    date: 'May 24, 2026',
    read: '9 min',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    desc: 'Many business owners burn thousands on Google Ads by using loose match keywords and missing negative search tags. Discover how to audit and prune your keyword targets.'
  },
  {
    id: 3,
    title: 'Social Media Tips That Increase Sales',
    category: 'Social Media',
    author: 'Ines Kader',
    date: 'May 12, 2026',
    read: '7 min',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
    desc: 'Having thousands of followers means nothing if they do not convert. Here are three simple copy and content templates that turn casual social scrolling into revenue.'
  },
  {
    id: 4,
    title: 'Meta Ads vs Google Ads: Where Should You Spend?',
    category: 'PPC',
    author: 'Owen Bright',
    date: 'Apr 30, 2026',
    read: '8 min',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80',
    desc: 'Should you invest in Google Search intent or Meta social disruption? We break down which advertising platform fits your business model and target demographics.'
  },
  {
    id: 5,
    title: 'Marketing Strategies That Actually Work',
    category: 'ROI & Strategy',
    author: 'Sofia Marchetti',
    date: 'Apr 18, 2026',
    read: '5 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    desc: 'Forget the fads. Let us examine the three core principles of customer attribution, visual storytelling, and retargeting segments that yield compounded revenue.'
  },
  {
    id: 6,
    title: 'Website Mistakes That Reduce Conversions',
    category: 'ROI & Strategy',
    author: 'Marcus Feld',
    date: 'Apr 6, 2026',
    read: '8 min',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    desc: 'Is your marketing driving traffic to a leaky bucket? Slow page speeds, weak calls-to-action, and confusing navigation are destroying your conversions. Here is how to fix it.'
  },
];

const FEATURED = {
  title: 'The Ultimate Guide to Scaling Digital Marketing Budgets',
  excerpt:
    'How we help fast-growing startups allocate ad spend across Google Search, Meta Social, and SEO funnels to maintain a low customer acquisition cost (CAC) while scaling campaign volume.',
  author: 'Marcus Feld',
  role: 'Growth Strategist',
  date: 'Jun 10, 2026',
  read: '11 min read',
  image: 'https://images.unsplash.com/photo-1551836022-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
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
    <Box component="main" sx={{ pt: { xs: 14, md: 18 }, bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Header */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Chip label="Growth Journal" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
        <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2, fontFamily: 'Fraunces, serif', fontWeight: 500 }}>
          Growth insights for modern businesses.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem' }}>
          Insights and marketing strategies from Markefied — how to scale your brand and get more customers online.
        </Typography>
      </Container>

      {/* Featured post */}
      <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 10 } }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card sx={{ borderRadius: '28px', overflow: 'hidden', display: { xs: 'block', md: 'flex' }, bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)' }} elevation={2}>
            <CardMedia sx={{ flex: 1.2, minHeight: { xs: 240, md: 380 }, backgroundImage: `url(${FEATURED.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <CardContent sx={{ flex: 1, p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Chip label="Featured Article" size="small" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600, alignSelf: 'flex-start' }} />
              <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '1.9rem' }, fontFamily: 'Fraunces, serif', fontWeight: 600 }}>
                {FEATURED.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                {FEATURED.excerpt}
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 600 }}>{FEATURED.author[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{FEATURED.author}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {FEATURED.role} · {FEATURED.date} · {FEATURED.read}
                  </Typography>
                </Box>
              </Stack>
              <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-start', px: 4 }} endIcon={<ArrowForward />}>
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
                sx={{
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderColor: category === cat ? 'primary.main' : 'rgba(255,255,255,0.08)',
                  px: 1,
                }}
              />
            ))}
          </Stack>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'background.paper',
              border: '1px solid rgba(255,255,255,0.06)',
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
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {paginated.map((post, i) => (
            <Grid item xs={12} sm={6} key={post.id}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ height: '100%' }}>
                <Card sx={{ borderRadius: '20px', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }} variant="outlined">
                  <CardMedia image={post.image} sx={{ height: 200, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <Box>
                      <Chip label={post.category} size="small" sx={{ mb: 1.5, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }} />
                      <Typography variant="h6" sx={{ mb: 1.5, fontSize: '1.25rem', fontWeight: 600, fontFamily: 'Fraunces, serif', lineHeight: 1.3 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                        {post.desc}
                      </Typography>
                    </Box>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 13, bgcolor: 'primary.main', fontWeight: 600 }}>{post.author[0]}</Avatar>
                        <Typography variant="caption" color="text.secondary">
                          {post.author} · {post.date} · {post.read} read
                        </Typography>
                      </Stack>
                      <Button variant="outlined" color="primary" fullWidth size="medium" endIcon={<ArrowForward sx={{ fontSize: 14 }} />}>
                        Read Article
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
          {paginated.length === 0 && (
            <Grid item xs={12}>
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 6 }}>
                No articles match your search query.
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
        <Box sx={{ borderRadius: '28px', bgcolor: 'secondary.main', color: '#fff', p: { xs: 5, md: 7 }, textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Typography variant="h4" sx={{ mb: 1.5, fontFamily: 'Fraunces, serif', fontWeight: 600 }}>
            Get growth strategies in your inbox
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, maxWidth: 460, mx: 'auto' }}>
            Weekly ideas on paid acquisition, social advertising channels, and landing page optimization. No spam.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, maxWidth: 460, mx: 'auto' }}>
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
            <Button variant="contained" color="primary" sx={{ px: 4, py: 1.2, whiteSpace: 'nowrap' }}>
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
