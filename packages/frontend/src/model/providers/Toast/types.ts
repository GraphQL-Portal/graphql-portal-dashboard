import React from 'react';

export type Severity = 'error' | 'warning' | 'info' | 'success';
export type Messages = React.ReactNode | React.ReactNodeArray;

export type ToastMessage = {
  isVisible: boolean;
  severity?: Severity;
  messages?: Messages;
};

export type Action = { type: 'set'; payload: ToastMessage };

export type Dispatch = (action: Action) => void;

export interface Toast {
  state: ToastMessage;
  dispatch(action: Action): void;
}
