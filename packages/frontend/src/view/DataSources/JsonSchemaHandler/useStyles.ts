import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  lastRow: {
    marginBottom: 0,
  },
  editor: {
    height: 250,
    marginTop: spacing(2),
  },
}));
