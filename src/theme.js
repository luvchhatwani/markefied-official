import { createTheme } from '@mui/material/styles';

// ---- Design tokens -------------------------------------------------------
// Primary:    #5084C4  (Nexora blue — used sparingly as an active/accent signal)
// Secondary:  #111111  (near-black — carries weight & contrast)
// Background: #FFFFFF
// Accent:     #EEF5FF  (soft tint for surfaces & hover states)
// Display face: Fraunces (used only for hero/section headlines — the studio's signature)
// Body face:    Poppins
// Radius: 16px
// ---------------------------------------------------------------------------

export const tokens = {
  primary: '#5084C4',
  primaryDark: '#3A669F',
  primaryLight: '#7FA5D6',
  secondary: '#111111',
  background: '#FFFFFF',
  accent: '#EEF5FF',
  ink: '#111111',
  inkSoft: '#4A4A52',
  line: 'rgba(17,17,17,0.08)',
};

const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.primary,
        dark: tokens.primaryDark,
        light: tokens.primaryLight,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: tokens.secondary,
        contrastText: '#FFFFFF',
      },
      background: {
        default: mode === 'light' ? tokens.background : '#0B0C10',
        paper: mode === 'light' ? '#FFFFFF' : '#121319',
      },
      text: {
        primary: mode === 'light' ? tokens.ink : '#F4F6FB',
        secondary: mode === 'light' ? tokens.inkSoft : '#A7ACB9',
      },
      divider: mode === 'light' ? tokens.line : 'rgba(255,255,255,0.08)',
      accent: {
        main: mode === 'light' ? tokens.accent : 'rgba(80,132,196,0.14)',
        contrastText: tokens.ink,
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Fraunces", serif',
        fontWeight: 500,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: '"Fraunces", serif',
        fontWeight: 500,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: '"Fraunces", serif',
        fontWeight: 500,
        letterSpacing: '-0.01em',
      },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shadows: [
      'none',
      '0 2px 8px rgba(17,17,17,0.04)',
      '0 4px 16px rgba(17,17,17,0.06)',
      '0 8px 24px rgba(17,17,17,0.07)',
      '0 12px 32px rgba(17,17,17,0.08)',
      '0 16px 40px rgba(17,17,17,0.09)',
      ...Array(19).fill('0 20px 48px rgba(17,17,17,0.10)'),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: '10px 24px',
          },
          contained: {
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
    },
  });

export default getTheme;
