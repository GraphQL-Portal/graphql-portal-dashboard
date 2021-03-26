import { forwardRef } from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps,
} from '@material-ui/core';

export const IconButton = forwardRef<unknown, IconButtonProps>((props, ref) => (
  <MuiIconButton {...props} innerRef={ref} />
));
