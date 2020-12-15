import React from 'react';
import { Paper } from '@material-ui/core';

import { Col } from '../Grid';

export const MediumWidget: React.FC = ({ children }) => {
  return (
    <Col xs={12} md={6}>
      <Paper>{children}</Paper>
    </Col>
  );
};
