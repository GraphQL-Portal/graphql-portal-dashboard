import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  primaryButton: {
    marginTop: spacing(2),
  },
  formField: {
    marginBottom: spacing(2),
  },
}));
