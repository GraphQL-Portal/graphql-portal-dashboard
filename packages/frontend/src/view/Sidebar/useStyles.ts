import { makeStyles, Theme } from '@material-ui/core';

const DRAWER_WIDTH = '20rem';
const LOGO_HEIGHT = 60;
const LOGO_WIDTH = 154;

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    padding: spacing(4, 6),
  },
  paper: {
    border: 0,
    backgroundColor: 'transparent',
  },
  logo: {
    position: 'relative',
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    margin: spacing(0, 2, 2.5),
  },
  logoBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(100%, -25%)',
    padding: '0 5px',
    backgroundColor: palette.secondary.main,
    fontSize: '10px',
    color: palette.text.primary,
    letterSpacing: '0.5px',
    borderRadius: 2,
  },
}));
