import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  copyButton: {
    color: palette.text.secondary,
  },
}));
