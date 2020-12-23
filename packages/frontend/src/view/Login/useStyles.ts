import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }: Theme) => ({
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
}))
