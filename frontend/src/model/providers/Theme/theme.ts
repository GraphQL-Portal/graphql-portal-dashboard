import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowX: 'hidden',
          maxWidth: '100%',
          minHeight: '100vh',
        },
        '#root': {
          height: '100vh',
          width: '100%',
          display: 'flex',
        },
      },
    },
    MuiButton: {
      text: {
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
        textTransform: 'none',
      },
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
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
      light: '#8965cd',
      main: '#6f42c1',
      dark: '#5f37a9',
    },
    secondary: {
      light: '#0E7DFB',
      main: '#0366d6',
      dark: '#0356B5',
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
