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
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
  },
  palette: {
    type: 'dark',
    background: {
      default: '#24292d',
    },
  },
});
