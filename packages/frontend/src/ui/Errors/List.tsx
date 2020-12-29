import React, { Children } from 'react';

import { useStyles } from './useStyles';

export const List: React.FC = ({ children }) => {
  const { item } = useStyles()
  return (
    <>
      {Children.map(children, child => <div className={item}>- {child}</div>)}
    </>
  );
}
