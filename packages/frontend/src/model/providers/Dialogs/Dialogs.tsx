import React, { createContext, useContext, useState } from 'react';

import { DialogContext as Value } from '../../../types';
import { isPOJO } from '../../../utils';

const DialogsContext = createContext<Value | null>(null);
export const useDialogs = () => useContext(DialogsContext);
const { Provider } = DialogsContext;

export const DialogsProvider: React.FC = ({ children }) => {
  const [dialogId, setIsOpenState] = useState<string>('');
  const [dialogConfig, setDialogConfig] = useState<object>({});

  const onOpenDialog = (dialogId: string, config?: object) => {
    setIsOpenState(dialogId);
    if (isPOJO(config)) setDialogConfig(config!);
  };

  const onCloseDialog = () => {
    setIsOpenState('');
    if (Object.keys(dialogConfig).length > 0) {
      setDialogConfig({});
    }
  };

  return (
    <Provider value={{ dialogId, dialogConfig, onOpenDialog, onCloseDialog }}>
      {children}
    </Provider>
  );
};
