import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  title: {
    marginBottom: spacing(4),
  },
}));
