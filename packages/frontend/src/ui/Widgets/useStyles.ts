import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  row: {
    padding: spacing(2, 3),
  },
  widget: {
    overflow: 'hidden',
  },
  widgetContent: {
    padding: spacing(2),
  },
  widgetActions: {
    padding: spacing(1),
  },
}));
