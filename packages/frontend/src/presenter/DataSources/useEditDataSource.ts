import { useState } from 'react';

import { useNotLinearStepper } from '../../model/Hooks';
import { useDataSourceContext } from '../../model/providers';
import { DataSource } from '../../types';

export const useEditDataSource = (limit: number, initialState: DataSource) => {
  const {
    step,
    nextStep,
    completed,
    completeStep,
    setStep,
  } = useNotLinearStepper(limit);
  const { source = {}, clearSource } = useDataSourceContext();
  const [state, setState] = useState<DataSource>(initialState);

  const updateState = (newState: any, step: number) => {
    setState((s: any) => Object.assign({}, s, newState));
    completeStep(step);
    nextStep();
  };

  return {
    source,
    step,
    state,
    updateState,
    completed,
    completeStep,
    setStep,
    clearSource,
  };
};
