import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { SlackForm, UseSlackHandlerHook } from '../../types';

const SLACK_DEFAULT_STATE = {
  token: '',
};

const suite = vest.create('slack_handler', ({ token }) => {
  test('authorization', 'Authorization Token is required', () => {
    enforce(token).isNotEmpty();
  });
});

export const useSlackHandler: UseSlackHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, SLACK_DEFAULT_STATE, state.handler);

  const { handleSubmit, errors, register } = useForm<SlackForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: SlackForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
  };
};
