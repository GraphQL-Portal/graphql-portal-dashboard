import { makeStyles, Theme } from '@material-ui/core';

const DRAWER_WIDTH = '20rem';
const LOGO_HEIGHT = 60;
const LOGO_WIDTH = 154;

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    padding: spacing(6),
  },
  paper: {
    border: 0,
    backgroundColor: 'transparent',
  },
  logo: {
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    margin: spacing(0, 2, 2.5),
  },
}));
