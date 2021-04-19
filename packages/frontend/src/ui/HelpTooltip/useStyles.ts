import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    opacity: 0.75,
    cursor: 'pointer',
    color: palette.secondary.main,
    transition: 'opacity 0.3s ease-in-out 0s',

    '&:hover': {
      opacity: 1,
    },
  },
}));
