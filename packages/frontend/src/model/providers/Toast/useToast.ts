import { useContext } from 'react';

import { ToastContext } from './ToastProvider';
import { Messages, Severity } from './types';

export const useToast = () => {
  const dispatch = useContext(ToastContext)!;

  const setMessage = (severity: Severity) => (messages: Messages) =>
    dispatch({
      type: 'set',
      payload: {
        isVisible: true,
        severity,
        messages,
      },
    });

  return {
    showErrorToast: setMessage('error'),
    showInfoToast: setMessage('info'),
    showSuccessToast: setMessage('success'),
    showWarningToast: setMessage('warning'),
  };
};
