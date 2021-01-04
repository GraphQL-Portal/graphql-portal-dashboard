import React from 'react';

import { useStyles } from './useStyles';

export const EmptyContainer:React.FC = ({ children }) => {
  const { container, body } = useStyles();
  return (
    <section className={container}>
      <div className={body}>{children}</div>
    </section>
  );
}
