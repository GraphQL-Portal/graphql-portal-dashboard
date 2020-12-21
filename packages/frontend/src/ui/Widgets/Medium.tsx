import React from 'react';

import { Col } from '../Grid';
import { Widget } from './Widget';

export const MediumWidget: React.FC = ({ children }) => {
  return (
    <Col xs={12} md={6}>
      <Widget>{children}</Widget>
    </Col>
  );
};
