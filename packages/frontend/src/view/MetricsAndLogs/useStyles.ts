import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  buttons: {
    padding: spacing(2),
    marginLeft: spacing(1.5),
  },
  date: {
    marginLeft: spacing(2),
    padding: spacing(1.5),
  },
  tabPanel: {
    width: '100%',
  },
  appBar: {
    position: 'static',
    backgroundColor: palette.primary.dark,
  },
}));
