import { useState } from 'react';

import { useNotLinearStepper } from '../../model/Hooks';
import { useCreateSource } from '../../model/DataSources/commands';
import { useDataSourceContext } from '../../model/providers';
import { INITIAL_STATE } from './constants';

type State = {
  name: string;
  handler: any;
  transforms: any[];
};

export const useAddDataSource = (limit: number) => {
  const {
    step,
    nextStep,
    completed,
    completeStep,
    setStep,
  } = useNotLinearStepper(limit);
  const { source = {}, clearSource } = useDataSourceContext();
  const [state, setState] = useState<State>(INITIAL_STATE);

  const onCompleted = () => {
    // @TODO I need to refetch data-source from here
    // or I need to tell useDataSource to refetch :)
    clearSource();
  };

  const onError = (err: any) => {
    console.error('CREATE ERROR: ', err);
    // @TODO probably I need to show error message
  };

  // Send new source to the server
  const { createSource } = useCreateSource({ onCompleted, onError });

  const updateState = (newState: any, step: number) => {
    setState((s: any) => Object.assign({}, s, newState));
    completeStep(step);
    nextStep();
  };

  const onAddSource = () => {
    createSource({
      variables: {
        source: state,
      },
    });
  };

  return {
    source,
    onAddSource,
    step,
    state,
    updateState,
    isDisabled: !completed[0] || !completed[1],
    completed,
    completeStep,
    setStep,
  };
};
