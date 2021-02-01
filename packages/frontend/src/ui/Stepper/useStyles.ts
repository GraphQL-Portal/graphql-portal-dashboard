import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: 0,
    margin: spacing(0, -2, 8),
    background: 'none',
  },
  horizontal: {
    padding: spacing(0, 2),
  },
}));
