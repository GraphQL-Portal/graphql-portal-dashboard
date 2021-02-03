import { useCreateSource } from '../../model/DataSources/commands';
import { useEditDataSource } from './useEditDataSource';
import { INITIAL_STATE } from './constants';

export const useAddDataSource = (limit: number) => {
  const {
    source,
    state,
    step,
    completed,
    updateState,
    completeStep,
    setStep,
    clearSource,
  } = useEditDataSource(limit, INITIAL_STATE);

  const onCompleted = () => clearSource();

  // @TODO probably I need to show error message
  const onError = console.error;

  // Send new source to the server
  const { createSource } = useCreateSource({ onCompleted, onError });

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
