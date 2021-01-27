import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  backButton: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: palette.text.primary,

    '& > svg': {
      display: 'block',
      marginRight: spacing(1.5),
    },

    '& > h3': {
      lineHeight: 0.8,
    },
  },
  visibleOverflow: {
    overflow: 'visible',
  },
}));
