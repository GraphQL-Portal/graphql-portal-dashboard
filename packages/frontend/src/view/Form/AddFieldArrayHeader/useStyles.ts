import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  titleCol: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonCol: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    marginBottom: spacing(2),
  },
}));
