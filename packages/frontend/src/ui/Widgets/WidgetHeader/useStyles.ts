import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  widgetHeader: {
    padding: spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  widgetHeaderTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    marginRight: spacing(1.5),
  },
  iconRoot: {
    opacity: 0.75,
    cursor: 'pointer',
    color: palette.secondary.main,
    transition: 'opacity 0.3s ease-in-out 0s',

    '&:hover': {
      opacity: 1,
    },
  },
}));
