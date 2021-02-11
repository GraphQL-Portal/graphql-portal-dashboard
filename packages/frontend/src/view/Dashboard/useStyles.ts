import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  widget: {
    marginLeft: spacing(2),
    marginTop: spacing(1),
    padding: spacing(1.5),
  },
  apiSelect: {
    minWidth: '170',
  },
}));
