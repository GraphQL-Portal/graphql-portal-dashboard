import React, { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

export const Input = forwardRef<unknown, TextFieldProps>((props, ref) => {
  return (
    <TextField
      variant="outlined"
      {...props}
      inputRef={ref}
      autoComplete="false"
    />
  );
});
