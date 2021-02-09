import { createMuiTheme } from '@material-ui/core';

import { RGBA } from './helpers';
import { FONT_STACK, BOLD_FONT } from './constants';

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowX: 'hidden',
          maxWidth: '100%',
          minHeight: '100vh',
          fontFamily: FONT_STACK,
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

        '&:hover': {
          backgroundColor: RGBA(0.08),
        },
      },
      outlined: {
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
      contained: {
        '&.Mui-disabled': {
          background: RGBA(0.26),
          color: RGBA(0.8),
        },
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
          backgroundColor: RGBA(0.06),
          borderTop: `1px solid ${RGBA(0.06)}`,
          borderBottom: `1px solid ${RGBA(0.08)}`,
          '&:first-child': {
            borderRadius: '8px 0 0 8px',
            borderLeft: `1px solid ${RGBA(0.06)}`,
          },
          '&:last-child': {
            borderRadius: ' 0 8px 8px 0',
            borderRight: `1px solid ${RGBA(0.06)}`,
          },
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: 0,
      },
      head: {
        fontWeight: BOLD_FONT,
      },
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: FONT_STACK,
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
      dark: '#473653',
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
      active: '#fff',
      hover: RGBA(0.08),
      selected: RGBA(0.16),
      disabled: RGBA(0.26),
      disabledBackground: RGBA(0.12),
      focus: RGBA(0.12),
    },
  },
  shape: {
    borderRadius: 8,
  },
});
