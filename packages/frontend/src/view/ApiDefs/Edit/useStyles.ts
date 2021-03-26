import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  form: {
    paddingTop: spacing(4),
  },
  copyButton: {
    color: palette.text.secondary,
  },
}));
