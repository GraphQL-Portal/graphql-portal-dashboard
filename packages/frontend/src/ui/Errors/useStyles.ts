import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  item: {
    paddingBottom: spacing(1),

    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));
