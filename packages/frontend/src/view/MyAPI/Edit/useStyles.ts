import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  form: {
    paddingTop: spacing(4),
  },
}));
