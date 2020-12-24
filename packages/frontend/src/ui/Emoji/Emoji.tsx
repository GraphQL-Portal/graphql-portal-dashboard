import React from 'react';

import { Emoji as Type } from './types';

export const Emoji:React.FC<Type> = ({ className, label = '', children }) => {
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
}
