import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  row: {
    padding: spacing(2, 3),
  }
}));
