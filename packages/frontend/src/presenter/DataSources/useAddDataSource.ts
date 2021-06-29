import { useCreateSource } from '../../model/DataSources/commands';
import {
  useDataSourceContext,
  useToast,
  useTourContext,
} from '../../model/providers';
import { useEditDataSource } from './useEditDataSource';
import { INITIAL_STATE } from './constants';
import { packHandler } from './helpers';
import { AError } from '../../types';
import { getSourceSteps } from '../../view/DataSources/helpers';

export const useAddDataSource = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const {
    tour: {
      isStarted,
      source: { state: tourState },
    },
  } = useTourContext();
  const { name, handler, transforms, sourceSchema } = tourState;
  const { source = {}, clearSource } = useDataSourceContext();
  const steps = getSourceSteps(source?.key);
  const initialState = isStarted
    ? { name, handler: handler.openapi, transforms, sourceSchema }
    : INITIAL_STATE;

  const { state, step, completed, updateState, completeStep, setStep } =
    useEditDataSource(steps.length - 1, initialState);

  const { createSource, loading } = useCreateSource({
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
    loading,
    text: {
      title: 'Configure a data-source',
      button: 'Add data-source',
    },
  };
};
