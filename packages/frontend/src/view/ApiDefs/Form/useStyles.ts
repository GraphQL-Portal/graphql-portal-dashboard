import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  formRow: {
    marginBottom: spacing(2),
  },
  addButton: {
    padding: spacing(1.75, 3),
  },
  collAlignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
}));
