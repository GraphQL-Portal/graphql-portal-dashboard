import { useUpdateSource } from '../../model/DataSources/commands';
import { useDataSourceContext, useToast } from '../../model/providers';
import { AError } from '../../types';
import { INITIAL_STATE } from './constants';
import { unpackHandler, packHandler } from './helpers';
import { useEditDataSource } from './useEditDataSource';

export const useUpdateDataSource = (limit: number) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { source = {}, clearSource } = useDataSourceContext();
  const { state: initialState, key } = source || {};
  const { _id } = initialState || {};

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

  const { updateSource } = useUpdateSource({
    onCompleted() {
      clearSource();
      showSuccessToast('Successfully created new data-source');
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const onSubmit = () => {
    updateSource({
      variables: {
        id: _id,
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
