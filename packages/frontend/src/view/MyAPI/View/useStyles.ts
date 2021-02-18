import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  wrapper: {
    height: '30rem',
    marginTop: spacing(4),
  },
  playground: {},
  editor: {},
}));
