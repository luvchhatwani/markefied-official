import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Search, ArrowForward, Close, CheckCircle } from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
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
    desc: 'Local storefronts are missing out on massive sales. Learn how simple changes in localized Search Engine Optimization and targeted map ads drive foot traffic.',
    content: [
      'For decades, local businesses relied on word-of-mouth and roadside foot traffic. Today, consumer purchase decisions begin online — over 87% of shoppers search Google Maps and local listings before visiting a physical store or booking a service.',
      'Without an active Google Business profile, local search ad coverage, and geo-targeted social presence, potential customers in your immediate neighborhood are routed directly to your competitors.',
      'By implementing hyper-local search campaigns, localized keyword bid adjustments, and localized customer review workflows, local brands routinely see a 40% to 120% increase in inbound calls and foot traffic within their first 60 days.',
    ],
    keyTakeaways: [
      'Claim, verify, and continuously update your Google Business listing with fresh photos and weekly updates.',
      'Run Google Local Service Ads (LSAs) and radius-targeted Search Ads focused on high intent keywords.',
      'Implement localized review generation workflows to boost map ranking authority.',
    ],
  },
  {
    id: 2,
    title: 'Google Ads Mistakes That Waste Your Budget',
    category: 'PPC',
    author: 'Owen Bright',
    date: 'May 24, 2026',
    read: '9 min',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    desc: 'Many business owners burn thousands on Google Ads by using loose match keywords and missing negative search tags. Discover how to audit and prune your keyword targets.',
    content: [
      'The fastest way to drain your marketing budget is launching a Google Search campaign with broad match keywords without a comprehensive negative keyword list.',
      'Broad match allows Google algorithm to show your ads for loosely related queries that have virtually zero purchase intent. An agency that does not audit search term reports weekly is giving away 30% or more of your ad spend to irrelevant clicks.',
      'To build a profitable Google Ads machine, structure your account with tightly themed ad groups, exact and phrase match roots, aggressive negative keyword lists, and dedicated landing pages tailored strictly to query intent.',
    ],
    keyTakeaways: [
      'Audit your Search Terms report weekly and add irrelevant search phrases as negative keywords.',
      'Ensure 1:1 message match between your ad headline and the destination landing page.',
      'Track offline conversions and qualified lead values back into Google Ads to feed Smart Bidding clean data.',
    ],
  },
  {
    id: 3,
    title: 'Social Media Tips That Increase Sales',
    category: 'Social Media',
    author: 'Ines Kader',
    date: 'May 12, 2026',
    read: '7 min',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
    desc: 'Having thousands of followers means nothing if they do not convert. Here are three simple copy and content templates that turn casual social scrolling into revenue.',
    content: [
      'Follower counts are vanity; conversions are sanity. Modern brands make the critical mistake of producing aesthetically pleasing content that lacks direct conversion pathways.',
      'To drive actual transactions through Instagram and LinkedIn, you need a balanced content flywheel: 50% value-driven educational content, 30% proof of results/testimonials, and 20% direct-response offers with clear calls-to-action.',
      'Pair organic social storytelling with targeted remarketing ad sets to capture users who engaged with your posts and guide them smoothly toward booking a consultation or purchasing.',
    ],
    keyTakeaways: [
      'Feature authentic customer stories, video case studies, and unedited behind-the-scenes results.',
      'Use direct, friction-free bio links and direct message automation to convert interest instantly.',
      'Retarget engaged social video viewers with limited-time promotional offers via Meta Ads.',
    ],
  },
  {
    id: 4,
    title: 'Meta Ads vs Google Ads: Where Should You Spend?',
    category: 'PPC',
    author: 'Owen Bright',
    date: 'Apr 30, 2026',
    read: '8 min',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80',
    desc: 'Should you invest in Google Search intent or Meta social disruption? We break down which advertising platform fits your business model and target demographics.',
    content: [
      'One of the most frequent questions we receive at Markefied is: "Should our business focus on Google Ads or Meta Ads?" The answer depends strictly on whether your product fulfills existing demand or generates new demand.',
      'Google Ads captures high-intent prospects who are actively searching for a specific solution right now (e.g. "emergency plumbing service" or "best b2b accounting software").',
      'Meta Ads (Facebook & Instagram), on the other hand, excels at interruptive visual storytelling — showcasing an exciting solution to qualified audiences before they even think to search for it.',
      'The highest-ROI brands run both: Meta creates initial brand awareness and qualified interest, while Google captures the downstream search queries and closes the loop.',
    ],
    keyTakeaways: [
      'Invest first in Google Search if your product solves an urgent, high-intent problem.',
      'Invest heavily in Meta Ads if visual demonstration and impulse appeal drive your sales.',
      'Combine both channels into an integrated acquisition funnel to maximize overall blended ROAS.',
    ],
  },
  {
    id: 5,
    title: 'Marketing Strategies That Actually Work',
    category: 'ROI & Strategy',
    author: 'Sofia Marchetti',
    date: 'Apr 18, 2026',
    read: '5 min',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    desc: 'Forget the fads. Let us examine the three core principles of customer attribution, visual storytelling, and retargeting segments that yield compounded revenue.',
    content: [
      'In a digital landscape filled with transient marketing trends, only fundamental principles reliably compound revenue year after year.',
      'Successful businesses focus on three foundational pillars: an irresistible core offer, a high-converting frictionless landing page, and a multi-touch attribution system that tracks true customer lifetime value (LTV).',
      'When your customer acquisition cost (CAC) is predictably calculated and your landing page converts above 8%, scaling ad budgets becomes an analytical science rather than a gamble.',
    ],
    keyTakeaways: [
      'Refine your primary value proposition until it addresses your ideal client\'s deepest pain point.',
      'Prioritize landing page speed, social proof, and mobile checkout simplicity above all else.',
      'Track return on ad spend (ROAS) based on net cash collected, not platform vanity metrics.',
    ],
  },
  {
    id: 6,
    title: 'Website Mistakes That Reduce Conversions',
    category: 'ROI & Strategy',
    author: 'Marcus Feld',
    date: 'Apr 6, 2026',
    read: '8 min',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    desc: 'Is your marketing driving traffic to a leaky bucket? Slow page speeds, weak calls-to-action, and confusing navigation are destroying your conversions. Here is how to fix it.',
    content: [
      'Driving thousands of visitors to a website that doesn\'t convert is like pouring expensive water into a leaky bucket. Studies show that a 1-second delay in page load time can reduce conversions by 7%.',
      'The three most frequent conversion killers we identify in our client audits are: hidden contact forms, slow loading visual assets, and vague calls-to-action that do not clearly tell the user what will happen next.',
      'By streamlining page layouts, positioning direct contact buttons above the fold, and adding clear social proof (ratings, client logos, testimonials), brands routinely double their conversion rates without spending an extra dollar on ads.',
    ],
    keyTakeaways: [
      'Optimize image assets and server response times to ensure sub-1.5 second initial load times.',
      'Keep your primary CTA prominent and visible across all viewport breakpoints.',
      'Eliminate unnecessary fields from lead forms — each additional field reduces completion rates by 5-10%.',
    ],
  },
];

const FEATURED = {
  id: 0,
  title: 'The Ultimate Guide to Scaling Digital Marketing Budgets',
  excerpt:
    'How we help fast-growing startups allocate ad spend across Google Search, Meta Social, and SEO funnels to maintain a low customer acquisition cost (CAC) while scaling campaign volume.',
  author: 'Marcus Feld',
  role: 'Growth Strategist',
  date: 'Jun 10, 2026',
  read: '11 min read',
  image: 'https://images.unsplash.com/photo-1551836022-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
  category: 'ROI & Strategy',
  content: [
    'Scaling a marketing budget from $5,000 to $50,000+ per month is not simply a matter of multiplying your daily ad spend. Without a disciplined allocation framework, rapid scaling leads to ad fatigue, skyrocketing CPA, and wasted capital.',
    'At Markefied, our media buyers employ a 70/20/10 budget allocation model: 70% goes to proven, compounding core channels with established conversion history (such as Google Search and validated Meta lookalike campaigns); 20% goes to scaling emerging creative angles and horizontal audience tests; and 10% is dedicated to high-upside experimental channels.',
    'Crucially, successful scaling requires creative velocity. Brands must test 5 to 10 new creative hooks and video variations weekly to combat creative fatigue and keep ad algorithms consistently refreshed with high-performing assets.',
  ],
  keyTakeaways: [
    'Scale ad spend incrementally (no more than 15-20% every 3 to 4 days) to prevent algorithm reset.',
    'Diversify creative formats: mix UGC video, static high-contrast graphics, and carousel formats.',
    'Monitor first-party attribution metrics in Google Analytics and Looker Studio to detect ad channel saturation early.',
  ],
};

export default function Blog() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const perPage = 4;

  // Initialize query from URL search param if present (e.g. from header search)
  useEffect(() => {
    const urlQuery = searchParams.get('search') || searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      setPage(1);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return POSTS.filter((p) => {
      const matchCategory = category === 'All' || p.category === category;
      const matchQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setToast({ open: true, message: 'Please enter a valid email address.', severity: 'error' });
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('markefied_subscribers') || '[]');
      existing.push({ email, subscribedAt: new Date().toISOString() });
      localStorage.setItem('markefied_subscribers', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    setToast({
      open: true,
      message: 'You are subscribed! Welcome to Markefied Growth Journal updates.',
      severity: 'success',
    });
    setNewsletterEmail('');
  };

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
            <CardContent sx={{ flex: 1, p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <Chip label="Featured Article" size="small" sx={{ mb: 2, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600, alignSelf: 'center' }} />
              <Typography variant="h4" sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '1.9rem' }, fontFamily: 'Fraunces, serif', fontWeight: 600 }}>
                {FEATURED.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                {FEATURED.excerpt}
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 600 }}>{FEATURED.author[0]}</Avatar>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{FEATURED.author}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {FEATURED.role} · {FEATURED.date} · {FEATURED.read}
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSelectedArticle(FEATURED)}
                sx={{ alignSelf: 'center', px: 4, fontWeight: 600 }}
                endIcon={<ArrowForward />}
              >
                Read Article
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Filters */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center">
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
              width: '100%',
              maxWidth: 380,
              mx: 'auto',
            }}
          >
            <Search fontSize="small" color="action" />
            <InputBase
              placeholder="Search articles by title or keyword…"
              fullWidth
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              sx={{ color: '#fff', fontSize: '0.95rem' }}
            />
            {query && (
              <IconButton size="small" onClick={() => setQuery('')}>
                <Close fontSize="small" />
              </IconButton>
            )}
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
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setSelectedArticle(post)}
                        fullWidth
                        size="medium"
                        endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
                        sx={{ fontWeight: 600 }}
                      >
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
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>No articles match "{query}"</Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Try a different search keyword or browse all articles.
                </Typography>
                <Button variant="outlined" color="primary" onClick={() => { setQuery(''); setCategory('All'); }}>
                  Clear Filters
                </Button>
              </Box>
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
          <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, maxWidth: 460, mx: 'auto' }}>
            <TextField
              placeholder="you@company.com"
              type="email"
              required
              fullWidth
              size="small"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              sx={{
                input: { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
              }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ px: 4, py: 1.2, whiteSpace: 'nowrap', fontWeight: 600 }}>
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Article Reader Modal */}
      <Dialog
        open={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: '24px',
            bgcolor: 'background.paper',
            border: '1px solid rgba(255,255,255,0.08)',
            p: { xs: 2, md: 3 },
          }
        }}
      >
        {selectedArticle && (
          <>
            <DialogTitle sx={{ pb: 1, pr: 6, position: 'relative' }}>
              <IconButton
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
                sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
              >
                <Close />
              </IconButton>
              <Chip
                label={selectedArticle.category}
                size="small"
                sx={{ mb: 1.5, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }}
              />
              <Typography variant="h4" sx={{ fontFamily: 'Fraunces, serif', fontWeight: 600, lineHeight: 1.25 }}>
                {selectedArticle.title}
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: 14 }}>
                  {selectedArticle.author[0]}
                </Avatar>
                <Typography variant="body2" color="text.secondary">
                  By {selectedArticle.author} · {selectedArticle.date} · {selectedArticle.read || '7 min read'}
                </Typography>
              </Stack>
            </DialogTitle>

            <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.06)', py: 3 }}>
              {selectedArticle.image && (
                <Box
                  component="img"
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  sx={{
                    width: '100%',
                    height: { xs: 200, sm: 300 },
                    objectFit: 'cover',
                    borderRadius: '16px',
                    mb: 3,
                  }}
                />
              )}

              {selectedArticle.content?.map((paragraph, idx) => (
                <Typography
                  key={idx}
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2.5, lineHeight: 1.8, fontSize: '1.02rem' }}
                >
                  {paragraph}
                </Typography>
              ))}

              {selectedArticle.keyTakeaways && (
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: '16px',
                    bgcolor: 'background.default',
                    border: '1px solid rgba(80,132,196,0.25)',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main', mb: 1.5 }}>
                    Key Strategic Takeaways
                  </Typography>
                  <Stack spacing={1.2}>
                    {selectedArticle.keyTakeaways.map((point, idx) => (
                      <Stack direction="row" spacing={1.5} alignItems="flex-start" key={idx}>
                        <CheckCircle sx={{ color: 'primary.main', fontSize: 18, mt: 0.3, flexShrink: 0 }} />
                        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                          {point}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ p: 2.5, justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
              <Button
                component="a"
                href={`https://wa.me/917850915986?text=${encodeURIComponent(`Hi Markefied, I was reading your article "${selectedArticle.title}" and would like to discuss it.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<FaWhatsapp />}
                sx={{ borderColor: 'rgba(37,211,102,0.4)', color: '#25D366', '&:hover': { borderColor: '#25D366' } }}
              >
                Discuss on WhatsApp
              </Button>
              <Button
                component={NavLink}
                to="/contact"
                onClick={() => setSelectedArticle(null)}
                variant="contained"
                color="primary"
                endIcon={<ArrowForward />}
                sx={{ fontWeight: 600, px: 3 }}
              >
                Get Free Marketing Audit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar alerts */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} variant="filled" onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
