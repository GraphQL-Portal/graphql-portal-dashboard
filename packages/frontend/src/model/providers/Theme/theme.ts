import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowX: 'hidden',
          maxWidth: '100%',
          minHeight: '100vh',
          fontFamily: "'PT Sans', 'Roboto', 'Helvetica', 'Arial',  sans-serif",
        },
        '#root': {
          height: '100vh',
          width: '100%',
          display: 'flex',
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
      },
      text: {
        padding: '0.5rem 1rem',
      },
      containedPrimary: {
        background: 'linear-gradient(45deg, #BD54D3 10%, #6B9FF1 90%)',
        textShadow: `1px 1px 0 #24292d85`,
        fontWeight: 700,
        letterSpacing: '0.5px',
      },
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: "'PT Sans', 'Roboto', 'Helvetica', 'Arial',  sans-serif",
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.75rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
  },
  palette: {
    type: 'dark',
    background: {
      default: '#24292d',
      paper: '#1B1F22',
    },
    primary: {
      light: '#CD7DDE',
      main: '#BD54D3',
      dark: '#B53CCD',
    },
    secondary: {
      light: '#8FB6F5',
      main: '#6B9FF1',
      dark: '#4485EE',
    },
    success: {
      light: '#3acf5d',
      main: '#28a745',
      dark: '#24943e',
    },
    error: {
      light: '#E06773',
      main: '#d73a49',
      dark: '#CB2A3A',
    },
  },
});
