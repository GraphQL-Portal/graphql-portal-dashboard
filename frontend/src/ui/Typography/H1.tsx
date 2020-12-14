import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const H1:React.FC<TypographyProps> = (props) => {
  return <Typography variant="h1" {...props} />;
}
