import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';

const suite = vest.create('slack_handler', ({ token }) => {
  test('token', 'Token is required', () => {
    enforce(token).isNotEmpty();
  });
});

const SLACK_DEFAULT_STATE = {
  token: '',
};

export const useSlackHandler = ({ state, updateState, step }: HandlerStep) => {
  const handlerState = Object.assign({}, SLACK_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) =>
    updateState({ handler: { [SOURCE_NAMES.SLACK_HANDLER]: data } }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
