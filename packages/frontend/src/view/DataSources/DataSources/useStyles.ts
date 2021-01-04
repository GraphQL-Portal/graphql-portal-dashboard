import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacing(4),
  },
  searchIcon: {
    marginRight: spacing(1.75),
  },
  actionCell: {
    padding: spacing(0, 1, 0, 2),
  },
}));
