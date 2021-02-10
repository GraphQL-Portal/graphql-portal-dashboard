import React from 'react';
import { H1, H3 } from '../../ui';

import { useStyles } from './useStyles';

export const UnderConstruction: React.FC<{ name: string }> = ({ name }) => {
  const { content, title } = useStyles();
  return (
    <div className={content}>
      <H1 className={title}>
        <b>{name}</b>
      </H1>
      <H3>is under construction :(</H3>
    </div>
  );
};
