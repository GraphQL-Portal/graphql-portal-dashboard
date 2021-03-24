import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  content: {
    minHeight: 500,
    maxHeight: 500,
    overflow: 'scroll',
    padding: spacing(1),
  },
  errorLog: {
    color: palette.error.main,
  },
  infoLog: {
    color: palette.success.main,
  },
  warnLog: {
    color: '#d9c338',
  },
  debugLog: {
    color: '#d468b7',
  },
  logWraper: {
    padding: spacing(0.5),
    display: 'block',
  },
  messageWrapper: {
    paddingLeft: spacing(1),
  },
}));
