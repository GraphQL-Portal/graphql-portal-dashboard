import { makeStyles, Theme } from '@material-ui/core';

const TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0.85)';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  tooltip: {
    fontSize: '0.875rem',
    background: TRANSPARENT_WHITE,
    padding: spacing(1),
    color: palette.background.default,
  },
  arrow: {
    color: TRANSPARENT_WHITE,
  },
  tooltipTitle: {
    marginBottom: spacing(1.5),
    fontSize: '0.875rem',
    fontWeight: 700,
  },
  tooltipText: {
    margin: 0,
    marginBottom: spacing(1),
  },
  tooltipList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  tooltipListItem: {
    marginBottom: spacing(1),
  },
}));
