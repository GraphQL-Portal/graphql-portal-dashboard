import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const H2:React.FC<TypographyProps> = (props) => {
  return <Typography variant="h2" {...props} />;
}
