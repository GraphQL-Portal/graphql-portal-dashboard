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
        padding: '0.5rem 1.5rem',
      },
      text: {
        padding: '0.5rem 1rem',
      },
      containedPrimary: {
        background: 'linear-gradient(#BD54D3 10%, #9C2EB2 90%)',
        textShadow: `1px 1px 0 #24292d85`,
        letterSpacing: '0.5px',
      },
      startIcon: {
        marginLeft: 0,
        marginRight: '16px',
      },
    },
    MuiTable: {
      root: {
        borderSpacing: '0 16px',
        borderCollapse: 'separate',
      },
    },
    MuiTableBody: {
      root: {
        '& > tr > td': {
          backgroundColor: 'rgba(200, 200, 255, 0.06)',
          '&:first-child': {
            borderRadius: '8px 0 0 8px',
          },
          '&:last-child': {
            borderRadius: ' 0 8px 8px 0',
          },
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: 0,
      },
      head: {
        fontWeight: 700,
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
      paper: '#24292D',
      default: '#1B1F22',
    },
    primary: {
      light: '#CD7DDE',
      main: '#BD54D3',
      dark: '#9C2EB2',
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
    action: {
      hover: 'rgba(200, 200, 255, 0.08)',
    },
  },
  shape: {
    borderRadius: 8,
  },
});
