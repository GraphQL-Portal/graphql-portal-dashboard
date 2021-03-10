import { useCreateSource } from '../../model/DataSources/commands';
import { useDataSourceContext, useToast } from '../../model/providers';
import { useEditDataSource } from './useEditDataSource';
import { INITIAL_STATE } from './constants';
import { packHandler } from './helpers';
import { AError } from '../../types';
import { getSourceSteps } from '../../view/DataSources/helpers';

export const useAddDataSource = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const { source = {}, clearSource } = useDataSourceContext();
  const steps = getSourceSteps(source);
  const {
    state,
    step,
    completed,
    updateState,
    completeStep,
    setStep,
  } = useEditDataSource(steps.length - 1, INITIAL_STATE);

  const { createSource } = useCreateSource({
    onCompleted() {
      clearSource();
      showSuccessToast('Successfully created new data-source');
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const onSubmit = () => {
    createSource({
      variables: {
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
    isDisabled:
      steps.length === 3 ? !completed[0] || !completed[1] : !completed[0],
    completed,
    completeStep,
    setStep,
    text: {
      title: 'Configure a data-source',
      button: 'Add data-source',
    },
  };
};
