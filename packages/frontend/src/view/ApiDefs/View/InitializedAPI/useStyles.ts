import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  wrapper: {
    width: '100%',
    textAlign: 'center',
    '& h5': {
      marginBottom: spacing(3),
    },
  },
}));
