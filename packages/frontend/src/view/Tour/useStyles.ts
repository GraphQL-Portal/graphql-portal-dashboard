import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ palette }: Theme) => ({
  disabledNextStepButton: {
    cursor: 'not-allowed',
    color: '#ffffff0d',
  },
  nextStepButton: {
    '&:hover': {
      color: 'white',
    },
  },
  tourWrapper: {
    color: 'white',
    '& > button': {
      outline: 'none',
    },
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& > div > button': {
      outline: 'none',
      margin: 0,
    },
    '& > a': {
      color: palette.text.primary,
    },
  },
}));
