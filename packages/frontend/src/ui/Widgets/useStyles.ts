import { makeStyles, Theme } from '@material-ui/core';

const deg = 150;
const rgba = (v: number) => `rgba(200, 200, 255, ${v})`;

export const useStyles = makeStyles(({ spacing }: Theme) => ({
  row: {
    padding: spacing(2, 0),
  },
  widget: {
    overflow: 'hidden',
    padding: spacing(2),
    background: `linear-gradient(${deg}deg, ${rgba(0.04)} 10%, ${rgba(0.08)})`,
    border: `1px solid ${rgba(0.06)}`
  },
  widgetContent: {
    padding: spacing(2),
  },
  widgetActions: {
    padding: spacing(1),
  },
}));
