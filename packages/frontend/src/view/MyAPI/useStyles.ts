import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  actionCell: {
    padding: spacing(0, 1, 0, 2),
  },
}));
