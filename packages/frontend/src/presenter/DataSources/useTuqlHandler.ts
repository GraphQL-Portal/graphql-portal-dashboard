import { useForm } from 'react-hook-form';
import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';

const TUQL_DEFAULT_STATE = {
  db: '',
  infile: '',
};

export const useTuqlHandler = ({ state, updateState }: HandlerStep) => {
  const handlerState = Object.assign({}, TUQL_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) => updateState({ handler: { [SOURCE_NAMES.TUQL]: data } });

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
