import { useForm } from 'react-hook-form';
import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const TUQL_DEFAULT_STATE = {
  db: '',
  infile: '',
};

export const useTuqlHandler = ({ state, updateState, step }: HandlerStep) => {
  const defaultValues = Object.assign({}, TUQL_DEFAULT_STATE, state.handler);
  const { handleSubmit, errors, control } = useForm({
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: any) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
