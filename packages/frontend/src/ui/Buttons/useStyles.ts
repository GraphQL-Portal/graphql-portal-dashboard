import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  buttonIcon: {
    marginRight: spacing(1),
    width: 24,
    height: 24,

    '& > svg': {
      width: '100%',
      height: '100%',
    },
  },
  loaderWrapper: {
    marginLeft: '10px',
  },
}));
