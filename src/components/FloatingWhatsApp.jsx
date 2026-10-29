import { Box, Tooltip, Zoom } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/917850915986?text=Hello%20Markefied%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20digital%20marketing%20services.';

export default function FloatingWhatsApp() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 20, md: 28 },
        right: { xs: 20, md: 28 },
        zIndex: 1100,
      }}
    >
      <Tooltip title="Chat with us on WhatsApp" placement="left" TransitionComponent={Zoom} arrow>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <Box
            component="a"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 52, md: 56 },
              height: { xs: 52, md: 56 },
              borderRadius: '50%',
              bgcolor: '#25D366',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0, 0, 0, 0.2)',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                bgcolor: '#20BA5A',
                boxShadow: '0 12px 30px rgba(37, 211, 102, 0.6)',
              },
            }}
          >
            <FaWhatsapp size={28} />
          </Box>
        </motion.div>
      </Tooltip>
    </Box>
  );
}

