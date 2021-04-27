import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  form: {
    paddingTop: spacing(4),
  },
  tabsHead: {
    '& > div': {
      '& > div': {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        '& > button': {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: '100px',
        },
      },
    },
  },
  copyButton: {
    color: palette.text.secondary,
  },
}));
