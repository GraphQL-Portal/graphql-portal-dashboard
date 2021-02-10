import { makeStyles, Theme } from '@material-ui/core';
import { WidgetActions } from '../types';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ({ justify }: WidgetActions) => justify || 'flex-start',
    padding: spacing(1, 2, 2),
  },
}));
