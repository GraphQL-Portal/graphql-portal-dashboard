import React from 'react';
import { Paper } from '@material-ui/core';
import { Col } from '../Grid';

export const BigWidget:React.FC = ({ children }) => {
  return <Col xs={12} md={9}><Paper>{children}</Paper></Col>;
}
