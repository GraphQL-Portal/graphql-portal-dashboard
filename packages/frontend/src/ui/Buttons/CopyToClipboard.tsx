import React from 'react';
import { CopyToClipboard as CopyComponent } from 'react-copy-to-clipboard';

import { useCopyToClipboard } from '../../model/Hooks';
import { FileCopyOutlined } from '../../icons';
import { CopyToClipboard as Props } from '../../types';
import { TextButton } from './Text';
import { ButtonIcon } from './ButtonIcon';

export const CopyToClipboard: React.FC<Props> = ({
  onCopy,
  text,
  buttonText,
  message,
  className,
}) => {
  const { onCopySuccess } = useCopyToClipboard({
    message,
    onCopy,
  });

  return (
    <CopyComponent text={text} onCopy={onCopySuccess}>
      <TextButton className={className || ''} size="small">
        <ButtonIcon>
          <FileCopyOutlined />
        </ButtonIcon>
        {buttonText}
      </TextButton>
    </CopyComponent>
  );
};
