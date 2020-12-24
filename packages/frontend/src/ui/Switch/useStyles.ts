import { makeStyles, Theme } from '@material-ui/core/styles';

const SWITCH_WIDTH = 40;
const SWITCH_HEIGHT = 24;
const THUMB_SIZE = 20;

export const useStyles = makeStyles(
  ({ spacing, palette, transitions }: Theme) => ({
    root: {
      width: SWITCH_WIDTH,
      height: SWITCH_HEIGHT,
      padding: 0,
      margin: spacing(1),
    },
    switchBase: {
      padding: 2,
      color: palette.common.white,
      '&$checked': {
        transform: 'translateX(16px)',
        color: palette.common.white,
        '& + $track': {
          backgroundColor: palette.primary.main,
          opacity: 1,
        },
      },
      '&$focusVisible $thumb': {
        color: palette.primary.main,
        border: `4px solid ${palette.common.white}`,
      },
    },
    thumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      boxShadow: 'none',
      border: `1px solid ${palette.divider}`,
    },
    track: {
      borderRadius: SWITCH_HEIGHT / 2,
      backgroundColor: palette.action.disabled,
      opacity: 1,
      transition: transitions.create(['background-color']),
    },
    checked: {},
    focusVisible: {},
  })
);
