import { makeStyles, Theme } from '@material-ui/core';

const DRAWER_WIDTH = 256;

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
    border: 0,
  },
  logo: {
    height: 46,
    width: 118,
    margin: spacing(1.75, 4, 2.5),
  },
}));
