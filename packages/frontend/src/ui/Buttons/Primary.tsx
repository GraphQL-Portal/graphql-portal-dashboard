import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="contained" color="primary" {...props} />;
};
