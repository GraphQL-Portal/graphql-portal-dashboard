import { DialogProps } from '@material-ui/core';

export type DialogContext = {
  dialogId: string;
  dialogConfig: any;
  onOpenDialog(dialogId: string, config?: any): void;
  onCloseDialog(): void;
};

export type Dialog = Omit<DialogProps, 'open'>;

export type ModalDialog = Dialog & { id: string };
