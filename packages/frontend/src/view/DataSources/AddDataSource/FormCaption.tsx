import React from 'react';

import { FormCaption as Props } from './types';
import { useStyles } from './useStyles';

export const FormCaption:React.FC<Props> = ({ title, description }) => {
  const { formCaption, formCaptionItem } = useStyles();
  return (
    <section className={formCaption}>
      {title && (
        <p className={formCaptionItem}>
          <span>Connector type: </span>
          {title}
        </p>
      )}
      {description && (
        <p className={formCaptionItem}>
          <span>Description: </span>
          {description}
        </p>
      )}
    </section>
  );
}
