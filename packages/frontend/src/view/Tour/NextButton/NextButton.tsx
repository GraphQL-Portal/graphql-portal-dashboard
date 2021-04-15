import { ArrowForward } from '@material-ui/icons';
import React from 'react';
import { useStyles } from './useStyles';

export const NextButton: React.FC<{ isDisabled: boolean }> = ({
  isDisabled,
}) => {
  const { disabledNextStepButton, nextStepButton } = useStyles();

  return (
    <span
      className={`${nextStepButton} ${
        isDisabled ? disabledNextStepButton : ''
      }`}
    >
      {' '}
      <ArrowForward />
    </span>
  );
};
