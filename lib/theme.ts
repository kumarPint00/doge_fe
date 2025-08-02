import { createTheme } from '@mui/material/styles';

/* Extend palette with neutral */
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#0B39C6' },
    secondary: { main: '#FF4B82' },
    neutral: { main: '#46415B', contrastText: '#FFFFFF' },
    background: { default: '#F9F9FC', paper: '#FFFFFF' },
    text: { primary: '#1F2250', secondary: '#555770' }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
      lineHeight: 1.1
    },
    h2: {
      fontWeight: 800,
      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
      lineHeight: 1.15
    },
    h4: { fontWeight: 700, fontSize: '1.5rem' },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 26,
          transition: 'transform .15s',
          '&:hover': { transform: 'translateY(-2px)' }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 6px 22px -8px rgba(0,0,0,.15)'
        }
      }
    }
  }
});

export default theme;
