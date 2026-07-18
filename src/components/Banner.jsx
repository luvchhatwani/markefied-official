import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wordUp = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { delay: 0.35 + i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

function MagneticButton({ children, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}

export default function Banner() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRef = useRef(null);
  const tiltRef = useRef(null);

  // Mouse-tilt / parallax for the floating card stack
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const handleMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const depth = (i + 1) * 10;
        gsap.to(card, {
          rotateY: px * depth,
          rotateX: -py * depth,
          x: px * depth,
          y: py * depth,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    };
    const handleLeave = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
      });
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', handleLeave);
    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Apple-style scroll scene: as the user scrolls through the hero, the stage
  // scales/rotates/blurs away while the background gradient morphs.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        stageRef.current,
        {
          scale: 0.8,
          rotateX: 18,
          y: -60,
          filter: 'blur(6px)',
          opacity: 0,
          ease: 'power2.inOut',
        },
        0
      )
        .to(
          tiltRef.current,
          { y: -140, opacity: 0, ease: 'power2.inOut' },
          0
        )
        .to(
          bgRef.current,
          {
            backgroundPosition: '100% 50%',
            ease: 'power2.inOut',
          },
          0
        );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        tl.to(
          card,
          {
            y: `-=${40 + i * 30}`,
            rotateZ: i % 2 === 0 ? 8 : -8,
            ease: 'power2.inOut',
          },
          0
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pt: { xs: 12, md: 0 },
      }}
    >
      {/* Animated gradient background */}
      <Box
        ref={bgRef}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'linear-gradient(120deg, #0B0C10 0%, #121319 35%, #1A2B42 70%, #0B0C10 100%)',
          backgroundSize: '220% 220%',
          backgroundPosition: '0% 50%',
        }}
      />
      {/* Floating radial glows */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(80,132,196,0.25) 0%, transparent 70%)',
          filter: 'blur(10px)',
          zIndex: 0,
        }}
        component={motion.div}
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            alignItems: 'center',
            gap: { xs: 6, md: 4 },
          }}
        >
          {/* Text content */}
          <Box ref={tiltRef}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip
                label="Awwwards Site of the Day · 2026"
                sx={{ mb: 3, bgcolor: 'accent.main', color: 'primary.main', fontWeight: 600 }}
              />
            </motion.div>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.4rem' },
                lineHeight: 1.05,
                mb: 3,
                overflow: 'hidden',
              }}
            >
              {['We Help Businesses', 'Grow Online', 'Through Smart Ads.'].map((line, i) => (
                <Box key={line} sx={{ overflow: 'hidden' }}>
                  <motion.div custom={i} variants={wordUp} initial="hidden" animate="show">
                    {line === 'Grow Online' ? (
                      <span className="gradient-text">Grow Online</span>
                    ) : (
                      line
                    )}
                  </motion.div>
                </Box>
              ))}
            </Typography>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 480, mb: 4 }}>
                We help brands increase visibility, generate quality leads, and scale faster with data-driven digital marketing strategies.
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <MagneticButton
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => window.location.href = '/contact'}
                  endIcon={<ArrowForward />}
                  sx={{ px: 4, py: 1.6, fontSize: 16, boxShadow: '0 14px 30px rgba(80,132,196,0.35)' }}
                >
                  Get Free Consultation
                </MagneticButton>
                <MagneticButton
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={() => window.location.href = '/services'}
                  startIcon={<PlayArrow />}
                  sx={{ px: 4, py: 1.6, fontSize: 16, borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  View Services
                </MagneticButton>
              </Stack>
            </motion.div>
          </Box>

          {/* 3D floating card stack */}
          <Box
            ref={stageRef}
            sx={{
              position: 'relative',
              height: { xs: 340, md: 480 },
              perspective: '1400px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  m: 'auto',
                  width: { xs: 230, md: 320 },
                  height: { xs: 290, md: 390 },
                  top: i * 24,
                  left: i * 28,
                  borderRadius: '24px',
                  background:
                    i === 0
                      ? 'linear-gradient(165deg, rgba(18, 19, 25, 0.95), rgba(11, 12, 16, 0.9))'
                      : i === 1
                      ? 'linear-gradient(165deg, rgba(255, 255, 255, 0.92), rgba(238, 245, 255, 0.85))'
                      : 'linear-gradient(165deg, #111111 0%, #1A2B42 100%)',
                  border: i === 1 ? '1px solid rgba(80,132,196,0.35)' : '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0 30px 60px rgba(11,12,16,0.5)',
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                  zIndex: 3 - i,
                }}
              >
                {i === 0 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#A7ACB9' }}>META ADS PERFORMANCE</Typography>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50', boxShadow: '0 0 8px #4caf50' }} />
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', fontSize: '1.8rem', mb: 0.5 }}>+312%</Typography>
                      <Typography sx={{ fontSize: 12, color: '#4caf50', fontWeight: 600 }}>Conversion Rate Growth</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, minHeight: 60, display: 'flex', alignItems: 'flex-end', mb: 1, mt: 1 }}>
                      <svg width="100%" height="80" style={{ overflow: 'visible' }}>
                        <defs>
                          <linearGradient id="gradient-meta" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5084C4" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#5084C4" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,70 Q30,45 60,60 T120,20 T180,35 T240,10" fill="none" stroke="#5084C4" strokeWidth="3" />
                        <path d="M0,70 Q30,45 60,60 T120,20 T180,35 T240,10 L240,80 L0,80 Z" fill="url(#gradient-meta)" />
                        <circle cx="240" cy="10" r="4" fill="#fff" stroke="#5084C4" strokeWidth="2" />
                      </svg>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', pt: 1.5 }}>
                      <Box>
                        <Typography sx={{ fontSize: 9, color: '#A7ACB9' }}>CPL</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>$2.45</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 9, color: '#A7ACB9' }}>ROAS</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#4caf50' }}>4.8x</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 9, color: '#A7ACB9' }}>Leads</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>1,840</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}

                {i === 1 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#111111' }}>GOOGLE SEARCH ADS</Typography>
                      <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#5084C4', bgcolor: 'rgba(80,132,196,0.12)', px: 1, py: 0.2, borderRadius: 1 }}>Live</Typography>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#111111', fontSize: '1.8rem', mb: 0.5 }}>$0.82</Typography>
                      <Typography sx={{ fontSize: 12, color: '#4A4A52', fontWeight: 600 }}>Avg Cost Per Click (CPC)</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, minHeight: 60, display: 'flex', alignItems: 'flex-end', gap: '8px', mb: 1, mt: 1 }}>
                      {[25, 45, 30, 60, 50, 75, 95].map((h, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            flexGrow: 1,
                            height: `${h}%`,
                            background: 'linear-gradient(to top, #5084C4, #7FA5D6)',
                            borderRadius: '4px 4px 0 0',
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(17,17,17,0.08)', pt: 1.5 }}>
                      <Box>
                        <Typography sx={{ fontSize: 9, color: '#4A4A52' }}>CTR</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111111' }}>8.9%</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 9, color: '#4A4A52' }}>Impressions</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#111111' }}>142k</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}

                {i === 2 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.6)' }}>ROI SUMMARY</Typography>
                      <Typography sx={{ fontSize: 10, color: '#ffb300', fontWeight: 700 }}>HIGH TARGET</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, mt: 2 }}>
                      <Box sx={{ width: 70, height: 70, position: 'relative' }}>
                        <svg width="70" height="70" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient-roi)"
                            strokeWidth="3.5"
                            strokeDasharray="85, 100"
                          />
                          <defs>
                            <linearGradient id="gradient-roi" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#7FA5D6" />
                              <stop offset="100%" stopColor="#5084C4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>85%</Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', mb: 0.2 }}>$48,250</Typography>
                        <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Net Campaign Profit</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', pt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4caf50' }} />
                      <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Campaign Optimization: Active</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Scroll cue */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          translateX: '-50%',
          zIndex: 2,
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Box
          sx={{
            width: 26,
            height: 42,
            borderRadius: 20,
            border: '2px solid rgba(17,17,17,0.25)',
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Box sx={{ width: 4, height: 8, borderRadius: 4, bgcolor: 'primary.main' }} />
        </Box>
      </motion.div>
    </Box>
  );
}
