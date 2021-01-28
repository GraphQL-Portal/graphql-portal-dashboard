import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const H5:React.FC<TypographyProps> = (props) => {
  return <Typography variant="h5" {...props} />;
}
