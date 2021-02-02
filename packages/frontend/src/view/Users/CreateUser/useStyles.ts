import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  controller: {
    marginBottom: spacing(2),
  },
  form: {
    padding: spacing(0, 2, 0, 2),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));
