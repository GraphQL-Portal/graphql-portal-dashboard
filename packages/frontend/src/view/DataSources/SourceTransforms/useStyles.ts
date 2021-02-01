import { makeStyles, Theme } from '@material-ui/core';
import { RGBA } from '../../../model/providers/Theme';

export const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  list: {
    marginBottom: spacing(3),
  },
  addButton: {
    padding: spacing(1.75, 3),
  },
  transformBlock: {
    padding: spacing(4),
    marginBottom: spacing(4),
    border: `1px solid ${RGBA(palette.action.activatedOpacity)}`,
    borderRadius: 4,
  },
  transformBlockTitle: {
    padding: spacing(0, 2),
    color: palette.text.secondary,
  },
}));
