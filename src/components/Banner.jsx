import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
            'linear-gradient(120deg, #FFFFFF 0%, #EEF5FF 35%, #E4EEFB 55%, #FFFFFF 100%)',
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
              {['Interfaces', 'that feel', 'genuinely alive.'].map((line, i) => (
                <Box key={line} sx={{ overflow: 'hidden' }}>
                  <motion.div custom={i} variants={wordUp} initial="hidden" animate="show">
                    {line.split(' ')[0] === 'that' ? (
                      <span>
                        that <span className="gradient-text">feel</span>
                      </span>
                    ) : (
                      line
                    )}
                  </motion.div>
                </Box>
              ))}
            </Typography>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 480, mb: 4 }}>
                Nexora is a design & engineering studio. We build products with the
                craft of a boutique atelier and the speed of a software team.
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <MagneticButton
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ px: 4, py: 1.6, fontSize: 16, boxShadow: '0 14px 30px rgba(80,132,196,0.35)' }}
                >
                  Start a Project
                </MagneticButton>
                <MagneticButton
                  variant="outlined"
                  color="secondary"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{ px: 4, py: 1.6, fontSize: 16, borderColor: 'rgba(17,17,17,0.15)' }}
                >
                  Watch Showreel
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
                  width: { xs: 220, md: 300 },
                  height: { xs: 280, md: 380 },
                  top: i * 24,
                  left: i * 28,
                  borderRadius: '24px',
                  background:
                    i === 0
                      ? 'linear-gradient(160deg, rgba(255,255,255,0.7), rgba(238,245,255,0.4))'
                      : i === 1
                      ? 'linear-gradient(160deg, #5084C4, #3A669F)'
                      : 'linear-gradient(160deg, #111111, #2B2B2B)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 30px 60px rgba(17,17,17,0.18)',
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                  zIndex: 3 - i,
                }}
              >
                <Typography sx={{ color: i === 0 ? 'text.primary' : '#fff', fontWeight: 600, opacity: 0.85 }}>
                  {i === 0 ? '01 · Discover' : i === 1 ? '02 · Design' : '03 · Ship'}
                </Typography>
                <Box
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: i === 0 ? 'rgba(17,17,17,0.15)' : 'rgba(255,255,255,0.3)',
                  }}
                />
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
