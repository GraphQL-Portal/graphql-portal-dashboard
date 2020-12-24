import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

export const Input: React.FC<TextFieldProps> = (props) => {
  return <TextField variant="outlined" {...props} />;
};
