import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  table: {
    borderCollapse: 'collapse',
    borderSpacing: spacing(0),
  },
  tableCell: {
    fontSize: '0.9rem',
    padding: spacing(0.5),
    border: '1px solid #b1aeae24',
    'white-space': 'nowrap',
    'vertical-align': 'top',
    maxWidth: '500px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
