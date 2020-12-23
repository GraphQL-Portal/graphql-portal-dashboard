import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

// import { useStyles } from './useStyles';

export const Input: React.FC<TextFieldProps> = (props) => {
  // const { root } = useStyles();

  return <TextField variant="outlined" {...props} />;
};
