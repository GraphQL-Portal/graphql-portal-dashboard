import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const suite = vest.create('slack_handler', ({ token }) => {
  test('token', 'Token is required', () => {
    enforce(token).isNotEmpty();
  });
});

const SLACK_DEFAULT_STATE = {
  token: '',
};

export const useSlackHandler = ({ state, updateState, step }: HandlerStep) => {
  const defaultValues = Object.assign({}, SLACK_DEFAULT_STATE, state.handler);
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
