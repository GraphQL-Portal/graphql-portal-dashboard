import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export const OutlineButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="outlined" {...props} />;
};
