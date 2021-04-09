import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
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
  },
}));
