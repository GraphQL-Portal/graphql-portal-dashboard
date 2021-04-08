import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  widget: {
    marginLeft: spacing(2),
    marginTop: spacing(1),
    padding: spacing(1.5),
  },
  apiSelect: {
    width: 322,
    '& .MuiOutlinedInput-input': {
      padding: spacing(1.5, 1.75),
    },
  },
  apiSelectLabel: {
    transform: 'translate(14px, 14px)',
  },
}));
