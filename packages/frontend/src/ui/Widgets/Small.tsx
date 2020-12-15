import React from 'react';
import { Paper } from '@material-ui/core';

import { Col } from '../Grid';

export const SmallWidget: React.FC = ({ children }) => {
  return (
    <Col xs={12} md={3}>
      <Paper>{children}</Paper>
    </Col>
  );
};
