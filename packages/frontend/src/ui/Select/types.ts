import React from 'react';
import { SelectProps } from '@material-ui/core';

type Option = {
  value: string | number | undefined;
  label: React.ReactNode;
};

export type Select = SelectProps & {
  options: Option[];
  fullWidth?: boolean;
};
