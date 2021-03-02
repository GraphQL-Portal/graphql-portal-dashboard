import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  cancelButton: {
    marginRight: spacing(3),
  },
  titleCol: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonCol: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
