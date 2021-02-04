import { useCreateSource } from '../../model/DataSources/commands';
import { useDataSourceContext } from '../../model/providers';
import { useEditDataSource } from './useEditDataSource';
import { INITIAL_STATE } from './constants';
import { packHandler } from './helpers';

export const useAddDataSource = (limit: number) => {
  const { source = {}, clearSource } = useDataSourceContext();
  const {
    state,
    step,
    completed,
    updateState,
    completeStep,
    setStep,
  } = useEditDataSource(limit, INITIAL_STATE);

  const onCompleted = () => clearSource();

  // @TODO probably I need to show error message
  const onError = console.error;

  // Send new source to the server
  const { createSource } = useCreateSource({ onCompleted, onError });

  const onAddSource = () => {
    createSource({
      variables: {
        source: packHandler(state, source.key),
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
