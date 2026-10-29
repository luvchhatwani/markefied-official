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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  NotificationsNone,
  KeyboardArrowDown,
  LockOutlined,
  Campaign,
  TrendingUp,
  Article,
} from '@mui/icons-material';
import { FaWhatsapp } from 'react-icons/fa';
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

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Q4 Performance Sprints Open',
    desc: 'Reserve dedicated media buying pods for the holiday season.',
    link: '/contact',
    icon: Campaign,
  },
  {
    id: 2,
    title: 'Meta Ads ROAS Growth Case Study',
    desc: 'See how we scaled lead conversions by 312% with automated funnels.',
    link: '/services#meta',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'Google Ads Budget Audit Guide',
    desc: 'Avoid top 5 budget-draining PPC mistakes in 2026.',
    link: '/blog',
    icon: Article,
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [servicesAnchor, setServicesAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [portalDialogOpen, setPortalDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled
            ? 'rgba(11,12,16,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          color: 'text.primary',
          zIndex: 1200,
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
                            bgcolor: 'background.paper',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
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
                            sx={{
                              py: 1.2,
                              px: 2,
                              fontSize: '0.9rem',
                              '&:hover': { color: 'primary.main', bgcolor: 'accent.main' }
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
              <Tooltip title="Search Articles & Services">
                <IconButton
                  onClick={() => setSearchOpen((s) => !s)}
                  aria-label="Search"
                  sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: searchOpen ? 'primary.main' : 'text.primary' }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Agency Updates & News">
                <IconButton
                  onClick={(e) => setNotificationsAnchor(e.currentTarget)}
                  aria-label="Notifications"
                  sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                  <Badge color="primary" variant="dot">
                    <NotificationsNone />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Notifications Menu */}
              <Menu
                anchorEl={notificationsAnchor}
                open={Boolean(notificationsAnchor)}
                onClose={() => setNotificationsAnchor(null)}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    borderRadius: 3,
                    width: 320,
                    p: 1,
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
                  }
                }}
              >
                <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Agency Highlights
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Live Updates
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5, borderColor: 'rgba(255,255,255,0.06)' }} />
                {NOTIFICATIONS.map((n) => {
                  const Icon = n.icon;
                  return (
                    <MenuItem
                      key={n.id}
                      onClick={() => {
                        setNotificationsAnchor(null);
                        navigate(n.link);
                      }}
                      sx={{
                        borderRadius: 2,
                        my: 0.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                        p: 1.5,
                        whiteSpace: 'normal',
                        '&:hover': { bgcolor: 'accent.main' }
                      }}
                    >
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'accent.main', color: 'primary.main', display: 'flex' }}>
                        <Icon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.85rem' }}>
                          {n.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.2 }}>
                          {n.desc}
                        </Typography>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Menu>

              <Tooltip title="Client Account">
                <IconButton 
                  onClick={(e) => setProfileAnchor(e.currentTarget)} 
                  aria-label="User profile"
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
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 3,
                    minWidth: 190,
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                  }
                }}
              >
                <MenuItem
                  onClick={() => {
                    setProfileAnchor(null);
                    setPortalDialogOpen(true);
                  }}
                >
                  Client Portal
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setProfileAnchor(null);
                    navigate('/contact');
                  }}
                >
                  Request Consultation
                </MenuItem>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                <MenuItem
                  onClick={() => {
                    setProfileAnchor(null);
                    setToastMessage('Signed out of guest session.');
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>

              {/* Log In Button */}
              <Button
                variant="text"
                onClick={() => setPortalDialogOpen(true)}
                sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'text.primary', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
              >
                Log In
              </Button>

              {/* Get Started Button */}
              <motion.div whileHover={{ scale: 1.045 }} whileTap={{ scale: 0.96 }}>
                <Button
                  component={NavLink}
                  to="/contact"
                  variant="contained"
                  color="primary"
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    px: 3,
                    boxShadow: '0 10px 24px rgba(80,132,196,0.35)',
                    fontWeight: 600,
                  }}
                >
                  Get Started
                </Button>
              </motion.div>

              {/* Mobile Menu Icon */}
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
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
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(80,132,196,0.35)',
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    mb: 2,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <SearchIcon fontSize="small" color="primary" />
                  <InputBase
                    autoFocus
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, Google Ads, Meta Ads… (press Enter)"
                    sx={{ color: '#fff' }}
                  />
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
          PaperProps={{ sx: { width: '84%', maxWidth: 360, bgcolor: 'background.paper', p: 3, borderLeft: '1px solid rgba(255,255,255,0.08)' } }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                component="img"
                src="/logo.png"
                alt="Markefied Logo"
                sx={{
                  width: 28,
                  height: 28,
                  filter: 'brightness(0) saturate(100%) invert(48%) sepia(21%) saturate(1478%) hue-rotate(180deg) brightness(91%) contrast(87%)'
                }}
              />
              <Typography variant="h6" sx={{ fontFamily: 'Fraunces, serif' }}>
                Markefied
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile search bar */}
          <Box
            component="form"
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setMobileOpen(false);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'background.default',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2.5,
              px: 1.5,
              py: 0.8,
              mb: 3,
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
            <InputBase
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search site…"
              sx={{ color: '#fff', fontSize: '0.9rem' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.label}
                component={NavLink}
                to={link.to}
                onClick={handleMobileLinkClick}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.4,
                  fontSize: 17,
                  color: location.pathname === link.to ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === link.to ? 600 : 500,
                  borderRadius: 2,
                  px: 2,
                  '&:hover': { bgcolor: 'accent.main' }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.06)' }} />

          <Stack spacing={1.5}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                setPortalDialogOpen(true);
              }}
              startIcon={<LockOutlined />}
              sx={{ py: 1.2, borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              Client Log In
            </Button>
            <Button
              component={NavLink}
              to="/contact"
              onClick={handleMobileLinkClick}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.3, fontWeight: 600 }}
            >
              Get Started
            </Button>
          </Stack>
        </Drawer>
      </AppBar>

      {/* Client Portal Dialog */}
      <Dialog
        open={portalDialogOpen}
        onClose={() => setPortalDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            bgcolor: 'background.paper',
            border: '1px solid rgba(255,255,255,0.08)',
            p: 1.5,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2, display: 'flex', alignItems: 'center', gap: 1.5, fontFamily: 'Fraunces, serif', fontWeight: 600 }}>
          <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'accent.main', color: 'primary.main', display: 'flex' }}>
            <LockOutlined />
          </Box>
          Markefied Client Portal
        </DialogTitle>
        <DialogContent sx={{ py: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
            Client campaigns, real-time ROI reports, and ad creatives are securely tracked via our dedicated Slack channels and live Google Looker Studio dashboards.
          </Typography>
          <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'background.default', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 600, display: 'block', mb: 0.5 }}>
              NEED DASHBOARD ACCESS?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact your designated account lead or email us at{' '}
              <Box component="a" href="mailto:markefied.official21@gmail.com" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>
                markefied.official21@gmail.com
              </Box>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            component="a"
            href="https://wa.me/917850915986?text=Hello%20Markefied%2C%20I%20need%20assistance%20accessing%20my%20client%20marketing%20dashboard."
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<FaWhatsapp />}
            fullWidth
            sx={{ borderColor: 'rgba(37, 211, 102, 0.4)', color: '#25D366', '&:hover': { borderColor: '#25D366' } }}
          >
            WhatsApp Support
          </Button>
          <Button
            component={NavLink}
            to="/contact"
            onClick={() => setPortalDialogOpen(false)}
            variant="contained"
            color="primary"
            fullWidth
          >
            Contact Team
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar feedback */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3000}
        onClose={() => setToastMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" variant="filled" onClose={() => setToastMessage('')} sx={{ bgcolor: 'secondary.main', color: '#fff' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
