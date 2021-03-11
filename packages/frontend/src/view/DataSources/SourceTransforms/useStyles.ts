import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  list: {
    marginBottom: spacing(6),
  },
  availableTitle: {
    marginBottom: spacing(2),
  },
}));
