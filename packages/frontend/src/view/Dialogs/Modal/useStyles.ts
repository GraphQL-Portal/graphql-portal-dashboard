import { makeStyles, Theme } from '@material-ui/core/styles';

const DIALOG_WIDTH = 480;

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  paper: {
    padding: spacing(5),
    width: DIALOG_WIDTH,
  },
}));
