import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacing(4),
  },
  searchIcon: {
    marginRight: spacing(1.75),
  },
  addButton: {
    display: 'inline-block',
  },
  svg: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
}));
