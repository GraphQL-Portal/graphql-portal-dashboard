import { makeStyles, Theme } from '@material-ui/core';
const ICON_SIZE = 24;

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  actionCell: {
    padding: spacing(0, 1, 0, 2),
  },
  iconCell: {
    padding: spacing(1, 2),
  },
  iconCellWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: spacing(1.5),
  },
}));
