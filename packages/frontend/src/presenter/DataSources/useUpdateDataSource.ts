import { useUpdateSource } from '../../model/DataSources/commands';
import { useDataSourceContext, useToast } from '../../model/providers';
import { AError } from '../../types';
import { getSourceSteps } from '../../view/DataSources/helpers';
import { INITIAL_STATE } from './constants';
import { unpackHandler, packHandler } from './helpers';
import { useEditDataSource } from './useEditDataSource';

export const useUpdateDataSource = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { source = {}, clearSource } = useDataSourceContext();
  const { state: initialState, key } = source || {};
  const { _id } = initialState || {};

  const steps = getSourceSteps(key);

  const {
    state,
    step,
    completed,
    updateState,
    completeStep,
    setStep,
    isTouched,
  } = useEditDataSource(
    steps.length - 1,
    unpackHandler(initialState || INITIAL_STATE, key || '')
  );

  const { updateSource, loading } = useUpdateSource({
    onCompleted() {
      clearSource();
      showSuccessToast(`Successfully updated ${state.name} data-source`);
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
    steps,
    state,
    updateState,
    isDisabled: !isTouched,
    completed,
    completeStep,
    setStep,
    loading,
    text: {
      title: 'Edit a data-source',
      button: 'Update data-source',
    },
  };
};
