import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  block: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(4),
    marginBottom: spacing(4),
    border: `1px solid ${palette.action.disabled}`,
    borderRadius: 4,
  },
  legend: {
    padding: spacing(0, 2),
    color: palette.text.secondary,
  },
}));
