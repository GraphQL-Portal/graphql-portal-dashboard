import React, { useState, forwardRef } from 'react';
import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { IconButton } from '../Buttons';
import { Visibility, VisibilityOff } from '../../icons';
import { PasswordInput as Props } from '../../types';
import { getUuid } from '../../utils';

export const PasswordInput = forwardRef<unknown, Props>((props, ref) => {
  const { className, label, fullWidth, ...inputProps } = props;
  const [inputType, setInputType] = useState<string>('password');
  const isPassword = inputType === 'password';
  const id = getUuid();

  const toggleType = () => {
    setInputType(isPassword ? 'text' : 'password');
  };

  return (
    <FormControl
      className={className}
      variant="outlined"
      fullWidth={!!fullWidth}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        {...inputProps}
        fullWidth={!!fullWidth}
        inputRef={ref}
        autoComplete="false"
        type={inputType}
        id={id}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleType}
            >
              {isPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
});
