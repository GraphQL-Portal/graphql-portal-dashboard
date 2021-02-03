import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  objectField: {
    display: 'flex',
    alignItems: 'center',
  },
  lastField: {
    justifyContent: 'flex-end',
  },
  objectRow: {
    marginBottom: spacing(2),
  },
}));
