import React from 'react';
import { ButtonGroup as MuiButtonGroup, Button } from '@material-ui/core';

import { ButtonGroupProps } from '../../types';
import { getKeyFromText } from '../../utils';

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  onClick,
}) => {
  return (
    <MuiButtonGroup size="large">
      {buttons.map(({ text, value }) => (
        <Button onClick={onClick.bind(null, value)} key={getKeyFromText(text)}>
          {text}
        </Button>
      ))}
    </MuiButtonGroup>
  );
};
