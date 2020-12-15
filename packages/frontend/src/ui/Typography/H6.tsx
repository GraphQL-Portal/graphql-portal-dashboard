import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const H6:React.FC<TypographyProps> = (props) => {
  return <Typography variant="h6" {...props} />;
}
