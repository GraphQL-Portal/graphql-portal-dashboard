import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { Snackbar as Props } from '../../types';
import { useStyles } from './useStyles';
import { ButtonIcon } from '../Buttons';
import { Close } from '../../icons';

export const Snackbar: React.FC<Props> = ({
  children,
  severity,
  isVisible,
  onClose,
}) => {
  const { root, icon } = useStyles();
  const isError = severity === 'error';

  return (
    <MuiSnackbar
      open={isVisible}
      autoHideDuration={isError ? null : 4000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Alert
        severity={severity}
        onClick={onClose}
        classes={{ root, icon }}
        variant="filled"
        action={
          isError && (
            <ButtonIcon>
              <Close />
            </ButtonIcon>
          )
        }
      >
        {children}
      </Alert>
    </MuiSnackbar>
  );
};
