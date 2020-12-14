import React from 'react';
import { Button, ButtonProps } from '@material-ui/core'

export const TextButton:React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
