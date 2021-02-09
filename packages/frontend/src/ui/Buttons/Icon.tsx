import React from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps,
} from '@material-ui/core';

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MuiIconButton {...props} />;
};
