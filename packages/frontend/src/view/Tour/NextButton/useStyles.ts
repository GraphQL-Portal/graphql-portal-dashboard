import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  disabledNextStepButton: {
    cursor: 'not-allowed',
    color: '#ffffff0d',
  },
  nextStepButton: {
    '&:hover': {
      color: 'white',
    },
  },
}));
