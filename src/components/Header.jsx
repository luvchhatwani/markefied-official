import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Tooltip,
  Divider,
  InputBase,
  Fade,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  NotificationsNone,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { label: 'Social Media Marketing', to: '/services#smm' },
      { label: 'Google Ads', to: '/services#google' },
      { label: 'Meta Ads', to: '/services#meta' },
    ],
  },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const mode = 'dark';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesAnchor, setServicesAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled
          ? mode === 'light'
            ? 'rgba(255,255,255,0.72)'
            : 'rgba(11,12,16,0.72)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? mode === 'light'
            ? '1px solid rgba(17,17,17,0.06)'
            : '1px solid rgba(255,255,255,0.08)'
          : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: { xs: 72, md: 84 }, justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component={NavLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Markefied Logo"
              sx={{
                width: 38,
                height: 38,
                objectFit: 'contain',
                filter: 'brightness(0) saturate(100%) invert(48%) sepia(21%) saturate(1478%) hue-rotate(180deg) brightness(91%) contrast(87%)'
              }}
            />
            <Typography variant="h6" sx={{ fontFamily: 'Fraunces, serif', fontWeight: 600, letterSpacing: '-0.02em' }}>
              Markefied
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Box
                  key={link.label}
                  onMouseEnter={(e) => link.dropdown && setServicesAnchor(e.currentTarget)}
                  onMouseLeave={() => link.dropdown && setServicesAnchor(null)}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    component={link.dropdown ? 'button' : NavLink}
                    to={link.dropdown ? undefined : link.to}
                    onClick={() => link.dropdown && navigate(link.to)}
                    endIcon={link.dropdown ? <KeyboardArrowDown fontSize="small" /> : null}
                    sx={{
                      px: 2,
                      py: 1,
                      color: isActive ? 'primary.main' : 'text.primary',
                      fontWeight: 500,
                      position: 'relative',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      '&:hover': {
                        color: 'primary.main',
                        '& .MuiButton-endIcon': {
                          transform: 'translateY(2px)',
                        }
                      },
                      '&:hover .hover-line': {
                        transform: 'scaleX(1)',
                      },
                      '& .MuiButton-endIcon': {
                        transition: 'transform 0.3s ease',
                      }
                    }}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.div
                        layoutId="active-pill"
                        style={{
                          position: 'absolute',
                          bottom: 2,
                          left: 16,
                          right: 16,
                          height: 2,
                          borderRadius: 2,
                          background: '#5084C4',
                        }}
                      />
                    ) : (
                      <Box
                        className="hover-line"
                        sx={{
                          position: 'absolute',
                          bottom: 2,
                          left: 16,
                          right: 16,
                          height: 2,
                          borderRadius: 2,
                          background: 'rgba(80,132,196,0.5)',
                          transform: 'scaleX(0)',
                          transition: 'transform 0.3s ease',
                          transformOrigin: 'center',
                        }}
                      />
                    )}
                  </Button>
                  {link.dropdown && (
                    <Menu
                      anchorEl={servicesAnchor}
                      open={Boolean(servicesAnchor)}
                      onClose={() => setServicesAnchor(null)}
                      MenuListProps={{ onMouseLeave: () => setServicesAnchor(null) }}
                      TransitionComponent={Fade}
                      disableAutoFocusItem
                      disablePortal
                      PaperProps={{
                        sx: {
                          mt: 1,
                          borderRadius: 3,
                          minWidth: 220,
                          boxShadow: '0 20px 48px rgba(17,17,17,0.12)',
                        },
                      }}
                    >
                      {link.dropdown.map((item) => (
                        <MenuItem
                          key={item.label}
                          onClick={() => {
                            setServicesAnchor(null);
                            navigate(item.to);
                          }}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* Right actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
            <Tooltip title="Search">
              <IconButton onClick={() => setSearchOpen((s) => !s)} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                <Badge color="primary" variant="dot">
                  <NotificationsNone />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton 
                onClick={(e) => setProfileAnchor(e.currentTarget)} 
                sx={{ 
                  display: { xs: 'none', sm: 'inline-flex' },
                  p: 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Avatar sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: 'primary.main', 
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 0 10px rgba(80,132,196,0.6)',
                  }
                }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={() => setProfileAnchor(null)}
              PaperProps={{ sx: { mt: 1, borderRadius: 3, minWidth: 180 } }}
            >
              <MenuItem onClick={() => setProfileAnchor(null)}>My Account</MenuItem>
              <MenuItem onClick={() => setProfileAnchor(null)}>Saved Projects</MenuItem>
              <Divider />
              <MenuItem onClick={() => setProfileAnchor(null)}>Sign Out</MenuItem>
            </Menu>

            <Button
              variant="text"
              sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'text.primary', fontWeight: 500 }}
            >
              Log In
            </Button>

            <motion.div whileHover={{ scale: 1.045 }} whileTap={{ scale: 0.96 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ display: { xs: 'none', md: 'inline-flex' }, px: 3, boxShadow: '0 10px 24px rgba(80,132,196,0.35)' }}
              >
                Get Started
              </Button>
            </motion.div>

            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Inline search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'accent.main',
                  border: '1px solid rgba(17,17,17,0.08)',
                  borderRadius: 3,
                  px: 2,
                  py: 1,
                  mb: 2,
                }}
              >
                <SearchIcon fontSize="small" color="action" />
                <InputBase autoFocus fullWidth placeholder="Search Markefied…" />
                <IconButton size="small" onClick={() => setSearchOpen(false)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: '82%', maxWidth: 360, bgcolor: 'background.paper', p: 3 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ fontFamily: 'Fraunces, serif' }}>
            Markefied
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {NAV_LINKS.map((link) => (
            <Button
              key={link.label}
              component={NavLink}
              to={link.to}
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                fontSize: 18,
                color: 'text.primary',
                fontWeight: 500,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <Badge color="primary" variant="dot">
              <NotificationsNone />
            </Badge>
          </IconButton>
        </Box>

        <Button variant="outlined" fullWidth sx={{ mb: 1.5 }}>
          Log In
        </Button>
        <Button variant="contained" color="primary" fullWidth>
          Get Started
        </Button>
      </Drawer>
    </AppBar>
  );
}
