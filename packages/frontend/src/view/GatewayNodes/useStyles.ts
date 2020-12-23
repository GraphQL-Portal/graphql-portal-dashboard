import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  config: {
    marginRight: spacing(2),

    '& > span': {
      color: palette.text.secondary,
    }
  },
}));
