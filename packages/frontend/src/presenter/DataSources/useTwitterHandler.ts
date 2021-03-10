import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { TwitterForm, UseTwitterHandlerHook } from '../../types';

const TWITTER_DEFAULT_STATE = {
  authorization: '',
};

const suite = vest.create('twitter_handler', ({ authorization }) => {
  test('authorization', 'Authorization Header is required', () => {
    enforce(authorization).isNotEmpty();
  });
});

export const useTwitterHandler: UseTwitterHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, TWITTER_DEFAULT_STATE, state.handler);

  const { handleSubmit, errors, control } = useForm<TwitterForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: TwitterForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
