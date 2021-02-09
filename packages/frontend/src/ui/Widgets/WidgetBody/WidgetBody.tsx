import React from 'react';

import { useStyles } from './useStyles';

export const WidgetBody: React.FC = ({ children }) => {
  const { content } = useStyles();
  return <section className={content}>{children}</section>;
};
