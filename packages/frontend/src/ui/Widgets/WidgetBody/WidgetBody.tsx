import React from 'react';

import { useStyles } from './useStyles';

export const WidgetBody: React.FC = ({ children, ...props }) => {
  const { content } = useStyles();
  return (
    <section {...props} className={content}>
      {children}
    </section>
  );
};
