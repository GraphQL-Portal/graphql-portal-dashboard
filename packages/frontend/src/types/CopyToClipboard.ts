import { NOOP } from './General';

type HookProps = {
  message: string;
  onCopy?: NOOP;
};

export type UseCopyToClipboardHook = (
  props: HookProps
) => {
  onCopySuccess: NOOP;
};

export type CopyToClipboard = HookProps & {
  text: string;
  buttonText: string;
  className?: string;
};
