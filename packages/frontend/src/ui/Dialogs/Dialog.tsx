import React from 'react';
import { Dialog as MuiDialog } from '@material-ui/core';

import { useDialogs } from '../../model/providers';
import { Dialog as Props } from '../../types';

export const Dialog: React.FC<Props> = (props) => {
  const { id, ...dialogProps } = props;
  const { dialogId, onCloseDialog } = useDialogs()!;
  return (
    <MuiDialog
      {...dialogProps}
      open={id === dialogId}
      onClose={onCloseDialog}
    />
  );
};
