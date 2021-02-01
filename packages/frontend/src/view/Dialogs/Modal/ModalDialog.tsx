import React from 'react';

import { ModalDialog as Props } from '../../../types';
import { Dialog } from '../../../ui';
import { useStyles } from './useStyles';

export const ModalDialog: React.FC<Props> = ({ children, id }) => {
  const { paper } = useStyles();
  return (
    <Dialog classes={{ paper }} id={id}>
      {children}
    </Dialog>
  );
};
