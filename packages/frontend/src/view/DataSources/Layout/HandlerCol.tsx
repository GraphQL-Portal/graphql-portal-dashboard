import React from 'react';
import clsx from 'clsx';
import { ClassName as Props } from '../../../types';
import { Col } from '../../../ui';

export const HandlerCol: React.FC<Props> = ({ children, className }) => {
  const colClassName = clsx(className);
  return (
    <Col xs={6} className={colClassName}>
      {children}
    </Col>
  );
};
