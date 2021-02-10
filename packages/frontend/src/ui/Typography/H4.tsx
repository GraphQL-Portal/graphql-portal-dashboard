import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const H4: React.FC<TypographyProps> = (props) => {
  return <Typography variant="h4" {...props} />;
};
