import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const TWITTER_DEFAULT_STATE = {
  token: '',
};

const suite = vest.create('twitter_handler', ({ authorization }) => {
  test('authorization', 'Authorization Header is required', () => {
    enforce(authorization).isNotEmpty();
  });
});

export const useTwitterHandler = ({
  state,
  updateState,
  step,
}: HandlerStep) => {
  const defaultValues = Object.assign({}, TWITTER_DEFAULT_STATE, state.handler);

  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
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
