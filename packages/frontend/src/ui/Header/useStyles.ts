import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  root: {
    backgroundColor: 'transparent',
    marginBottom: spacing(2),
  },
  toolbarRoot: {
    justifyContent: 'space-between',
    padding: 0,
  },
  side: {
    display: 'flex',
    alignItems: 'center',
  },
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
}));
