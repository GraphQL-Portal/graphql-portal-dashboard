import { UseCopyToClipboardHook } from '../../types';
import { useToast } from '../providers';

export const useCopyToClipboard: UseCopyToClipboardHook = ({
  message,
  onCopy,
}) => {
  const { showSuccessToast } = useToast();

  const onCopySuccess = () => {
    showSuccessToast(message);

    if (!!onCopy && typeof onCopy === 'function') onCopy();
  };

  return { onCopySuccess };
};
