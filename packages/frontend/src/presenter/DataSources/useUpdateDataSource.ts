import { useUpdateSource } from '../../model/DataSources/commands';
import { useDataSourceContext } from '../../model/providers';
import { INITIAL_STATE } from './constants';
import { unpackHandler, packHandler } from './helpers';
import { useEditDataSource } from './useEditDataSource';

export const useUpdateDataSource = (limit: number) => {
  const { source = {}, clearSource } = useDataSourceContext();
  const { state: initialState, key } = source || {};
  const { id } = initialState || {};

  const {
    state,
    step,
    completed,
    updateState,
    completeStep,
    setStep,
    isTouched,
  } = useEditDataSource(
    limit,
    unpackHandler(initialState || INITIAL_STATE, key || '')
  );
  const onCompleted = () => clearSource();

  // @TODO probably I need to show error message
  const onError = console.error;

  // Send new source to the server
  const { updateSource } = useUpdateSource({ onCompleted, onError });

  const onSubmit = () => {
    updateSource({
      variables: {
        id,
        source: packHandler(state, source.key),
      },
    });
  };

  return {
    source,
    onSubmit,
    step,
    state,
    updateState,
    isDisabled: !isTouched,
    completed,
    completeStep,
    setStep,
    text: {
      title: 'Edit a data-source',
      button: 'Update data-source',
    },
  };
};
