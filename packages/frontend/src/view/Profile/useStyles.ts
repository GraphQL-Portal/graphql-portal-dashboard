import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  formRow: {
    marginBottom: spacing(2),
  },
  tab: {
    paddingTop: spacing(4),
  },
}));
