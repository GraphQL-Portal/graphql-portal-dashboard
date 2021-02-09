import { makeStyles, Theme } from '@material-ui/core';

const TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0.85)';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  tooltip: {
    fontSize: '1rem',
    background: TRANSPARENT_WHITE,
    padding: spacing(1),
    color: palette.background.default,
  },
  arrow: {
    color: TRANSPARENT_WHITE,
  },
}));
