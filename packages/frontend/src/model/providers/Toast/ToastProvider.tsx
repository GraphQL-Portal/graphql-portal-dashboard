import React, { createContext, useReducer } from 'react';

import { Toast } from './Toast';
import { ToastMessage, Action, Dispatch } from '../../../types';

export const ToastContext = createContext<Dispatch | null>(null);
const { Provider } = ToastContext;

const reducer = (state: ToastMessage, { type, payload }: Action) => {
  switch (type) {
    case 'set':
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

const INITIAL_STATE: ToastMessage = {
  isVisible: false,
};

export const ToastProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Provider value={dispatch}>
      {children}
      <Toast state={state} dispatch={dispatch} />
    </Provider>
  );
};
