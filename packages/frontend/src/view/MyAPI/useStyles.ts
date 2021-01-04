import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  config: {
    marginRight: spacing(2),

    '& > span': {
      color: palette.text.secondary,
    }
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(8)
  },
  emptyIcon: {
    width: 128,
    height: 128,
    marginBottom: spacing(4),
  },
  emptyImg: {
    color: palette.error.main,
    width: '100%',
    height: '100%',
  },
  emptyTitle: {
    width: '60%',
    textAlign: 'center',
  },
  actionCell: {
    padding: spacing(0, 1, 0, 2),
  },
}));
