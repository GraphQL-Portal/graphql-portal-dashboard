import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ palette }) => ({
  header: {
    '& > th': {
      fontWeight: 700,
    },
  },
  body: {
    '& > tr:nth-child(odd)': {
      background: palette.action.hover,
    },
  },
}))
