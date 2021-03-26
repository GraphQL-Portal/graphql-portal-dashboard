import React from 'react';
import { Row } from '../Grid';

export const HeaderRow: React.FC = ({ children }) => {
  return <Row alignItems="center">{children}</Row>;
};
