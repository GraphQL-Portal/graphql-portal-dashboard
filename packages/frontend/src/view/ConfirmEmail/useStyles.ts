import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(3),
    '& a': {
      display: 'flex',
      justifyContent: 'center',
      textDecoration: 'none',
      color: palette.common.white,
    },
    '& a:hover': {
      textDecoration: 'underline',
    }
  },
  logo: {
    height: 80,
    marginBottom: spacing(6),
  },
  text: {
    marginBottom: spacing(6),
  },
}))
