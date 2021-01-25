import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  group: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
  groupName: {
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    marginBottom: spacing(1),
    paddingLeft: spacing(2),
    color: palette.text.hint,
  },
  item: {
    textDecoration: 'none',
    display: 'block',
    marginBottom: spacing(1),

    '&:last-child': {
      marginBottom: 0,
    },
  },
  activeItem: {
    '& > button': {
      background: palette.action.hover,
    }
  },
  button: {
    justifyContent: 'flex-start',
  },
}));
