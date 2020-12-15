import React from 'react';
import { Paper } from '@material-ui/core';

import { Col } from '../Grid';

export const HugeWidget:React.FC = ({ children }) => {
  return <Col xs={12}><Paper>{children}</Paper></Col>;
}
