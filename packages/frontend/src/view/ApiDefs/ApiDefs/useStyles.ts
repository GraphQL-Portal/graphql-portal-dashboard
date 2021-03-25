import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette }: Theme) => ({
  name: {
    color: palette.text.primary,

    '&:hover, &:focus, &:active': {
      color: palette.text.primary,
    },
  },
}));
