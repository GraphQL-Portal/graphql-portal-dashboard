import React, { Children } from 'react';

import { List } from './List';

export const Errors: React.FC = ({ children }) => {
  return (
    <>{Children.count(children) > 1 ? <List>{children}</List> : children}</>
  );
};
