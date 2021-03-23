import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  tableRow: {
    cursor: 'pointer',

    '&:hover > td:first-child': {
      textDecoration: 'underline',
    },
  },
}));
