import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    textTransform: 'none',
  },
  textColorPrimary: {
    color: palette.text.secondary,

    '&.Mui-selected': {
      color: palette.text.primary,
    },
  },
}));
