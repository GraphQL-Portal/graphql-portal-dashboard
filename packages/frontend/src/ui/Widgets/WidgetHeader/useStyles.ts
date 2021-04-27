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
}));
