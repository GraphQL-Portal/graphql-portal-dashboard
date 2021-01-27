import { useState } from 'react';

import { useStepper } from '../../model/Hooks';
import { useCreateSource } from '../../model/DataSources/commands';
import { useDataSourceContext } from '../../model/providers';
import { INITIAL_STATE } from './constants';

type State = {
  name: string;
  handler: any;
  transforms: any[];
};

export const useAddDataSource = (limit: number) => {
  const { step, nextStep } = useStepper(limit);
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

  // const onSubmit = (source: any) => {
  //   createSource({
  //     variables: {
  //       source,
  //     },
  //   });
  // };

  const updateState = (newState: any) => {
    setState((s: any) => Object.assign({}, s, newState));
    nextStep();
  };

  const onAddSource = () => {
    console.log(createSource);
    console.log('ON ADD SOURCE CLICKED');
  };

  console.log('STEP IS: ', step);

  return {
    source,
    onAddSource,
    step,
    state,
    updateState,
  };
};
