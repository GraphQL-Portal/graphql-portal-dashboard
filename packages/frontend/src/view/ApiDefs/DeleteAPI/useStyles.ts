import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  primaryButton: {
    marginBottom: spacing(2),
  },
}));
