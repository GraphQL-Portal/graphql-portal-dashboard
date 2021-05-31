import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette }: Theme) => ({
  latencyLine: {
    height: '4px',
    borderRadius: '2px',
    background: palette.primary.light,
    contentVisibility: 'hidden',
  },
}));
