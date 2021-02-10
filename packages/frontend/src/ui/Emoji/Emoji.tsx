import React from 'react';

import { Emoji as Props } from './types';

export const Emoji: React.FC<Props> = ({ className, label = '', children }) => {
  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      aria-hidden={label !== '' ? 'false' : 'true'}
    >
      {children}
    </span>
  );
};
