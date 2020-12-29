import React from 'react';

import { Snackbar, Errors } from '../../../ui';
import { Toast as Props } from './types';

export const Toast:React.FC<Props> = ({ state, dispatch }) => {
  const { isVisible, severity, messages } = state;
  const onClose = () =>
    dispatch({
      type: 'set',
      payload: {
        isVisible: false,
      },
    });

  return (
    <Snackbar
      isVisible={isVisible}
      severity={severity || 'info'}
      onClose={onClose}
    >
      <Errors>{messages}</Errors>
    </Snackbar>
  );
}
