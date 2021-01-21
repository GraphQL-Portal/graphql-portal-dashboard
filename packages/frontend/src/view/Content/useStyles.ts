import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  main: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: spacing(6),
    paddingLeft: spacing(2),
  }
}));
