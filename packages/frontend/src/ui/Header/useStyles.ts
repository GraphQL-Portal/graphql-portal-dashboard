import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  root: {
    backgroundColor: palette.background.default,
    marginBottom: spacing(2),
  },
  toolbarRoot: {
    justifyContent: 'space-between',
  },
}));
