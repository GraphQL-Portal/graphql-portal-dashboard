import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: spacing(8),
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
  },
  icon: {
    flexShrink: 0,
    width: 80,
    height: 80,
    marginRight: spacing(4),
  },
  svg: {
    color: palette.error.main,
    width: '100%',
    height: '100%',
  },
}));
