import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  errorLog: {
    backgroundColor: palette.error.main,
  },
  infoLog: {
    backgroundColor: palette.success.main,
  },
  warnLog: {
    backgroundColor: '#d9c338',
  },
  debugLog: {
    backgroundColor: '#55aadf',
  },
  logLevelIcon: {
    width: '6px',
    height: '18px',
    borderRadius: '5px',
    margin: '0 5px',
    position: 'relative',
    top: '3px',
    display: 'inline-block',
  },
}));
