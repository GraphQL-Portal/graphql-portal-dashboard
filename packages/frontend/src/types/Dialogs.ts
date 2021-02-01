import { DialogProps } from '@material-ui/core';

export type DialogContext = {
  dialogId: string;
  dialogConfig: object;
  onOpenDialog(dialogId: string, config?: object): void;
  onCloseDialog(): void;
};

export type Dialog = Omit<DialogProps, 'open'>;

export type ModalDialog = Dialog & { id: string };
