import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  list: {
    marginBottom: spacing(3),
  },
  addButton: {
    padding: spacing(1.75, 3),
  },
}));
