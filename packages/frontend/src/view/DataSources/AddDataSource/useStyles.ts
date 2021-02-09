import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  visibleOverflow: {
    overflow: 'visible',
  },
}));
