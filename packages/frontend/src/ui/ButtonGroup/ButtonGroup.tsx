import React from 'react';
import { ButtonGroup as MuiButtonGroup, Button } from '@material-ui/core';

import { ButtonGroupProps as Props } from '../../types';
import { getKeyFromText } from '../../utils';

export const ButtonGroup: React.FC<Props> = ({ buttons, onClick, active }) => (
  <MuiButtonGroup size="large">
    {buttons.map(({ text, value }) => (
      <Button
        onClick={onClick.bind(null, value)}
        key={getKeyFromText(text)}
        variant={active === value ? 'contained' : 'outlined'}
      >
        {text}
      </Button>
    ))}
  </MuiButtonGroup>
);
