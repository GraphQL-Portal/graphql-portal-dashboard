import { useState } from 'react';

import { useNotLinearStepper } from '../../model/Hooks';
import { DataSource } from '../../types';

export const useEditDataSource = (limit: number, initialState: DataSource) => {
  const {
    step,
    nextStep,
    completed,
    completeStep,
    setStep,
  } = useNotLinearStepper(limit);
  const [state, setState] = useState<DataSource>(initialState);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const updateState = (newState: any, step: number) => {
    setState((s: any) => Object.assign({}, s, newState));
    completeStep(step);
    setIsTouched(true);
    nextStep();
  };

  return {
    step,
    state,
    updateState,
    completed,
    completeStep,
    setStep,
    isTouched,
  };
};
