import { useUpdateSource } from '../../model/DataSources/commands';
import { useDataSourceContext } from '../../model/providers';
import { unpackHandler } from './helpers';
import { useEditDataSource } from './useEditDataSource';

export const useUpdateDataSource = (limit: number) => {
  const { source = {}, clearSource } = useDataSourceContext();
  const { state: initialState, key } = source;
  const { _id } = initialState;

  const {
    state,
    step,
    completed,
    updateState,
    completeStep,
    setStep,
  } = useEditDataSource(limit, unpackHandler(initialState, key));
  const onCompleted = () => clearSource();

  // @TODO probably I need to show error message
  const onError = console.error;

  // Send new source to the server
  const { updateSource } = useUpdateSource({ onCompleted, onError });

  const onAddSource = () => {
    updateSource({
      variables: {
        source: state,
        id: _id,
      },
    });
  };

  return {
    source,
    onAddSource,
    step,
    state,
    updateState,
    isDisabled: false,
    completed,
    completeStep,
    setStep,
  };
};
