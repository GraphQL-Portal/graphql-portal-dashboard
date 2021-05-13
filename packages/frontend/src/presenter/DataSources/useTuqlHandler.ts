import { useForm } from 'react-hook-form';
import { useFormErrors } from '../../model/Hooks';
import { TuqlForm, UseTuqlHandlerHook } from '../../types';

const TUQL_DEFAULT_STATE = {
  db: undefined,
  infile: undefined,
};

export const useTuqlHandler: UseTuqlHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, TUQL_DEFAULT_STATE, state.handler);
  const { handleSubmit, errors, register } = useForm<TuqlForm>({
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: TuqlForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
  };
};
