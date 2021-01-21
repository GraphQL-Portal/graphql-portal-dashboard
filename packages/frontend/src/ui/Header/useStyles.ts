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
  }
}));
