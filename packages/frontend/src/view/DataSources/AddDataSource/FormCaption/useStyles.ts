import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  formCaption: {
    marginBottom: spacing(6),
  },
  formCaptionItem: {
    margin: 0,
    marginBottom: spacing(2),

    '& > span': {
      color: palette.text.secondary,
    },
  },
}));
