import { makeStyles, Theme } from '@material-ui/core';

const DRAWER_WIDTH = 256;

export const useStyles = makeStyles(({ palette }: Theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
    border: 0,
  }
}));
