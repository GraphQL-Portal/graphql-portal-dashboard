import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(3),
  },
  logo: {
    height: 80,
    marginBottom: spacing(6),
  },
  formFrame: {
    padding: spacing(3, 2)
  },
  formField: {
    marginBottom: spacing(2),
  },
  footerWrapper: {
    display: 'flex',
    width: "100%",
    flexDirection: 'column',
  },
  links: {
    display: 'flex',
    marginTop: spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& a': {
      textDecoration: 'none',
      color: palette.text.primary,
    },
    '& a:hover': {
      textDecoration: 'underline',
    }
  },
}))
