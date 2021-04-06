import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  arrowIcon: {
    '& > svg': {
      color: palette.common.white,
      position: 'relative',
      top: '3px',
      width: '1rem',
      height: '1rem',
    },
  },
  unclickableArrowIcon: {
    '& > svg': {
      color: '#444445',
      cursor: 'disabled',
    },
  },
  closedLog: {
    'white-space': 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  openLog: {
    'white-space': 'pre-wrap',
    overflow: 'visible',
  },
}));
