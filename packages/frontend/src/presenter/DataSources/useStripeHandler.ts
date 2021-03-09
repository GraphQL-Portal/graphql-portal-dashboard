import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const STRIPE_DEFAULT_STATE = {
  token: '',
};

const suite = vest.create('stripe_handler', ({ token }) => {
  test('token', 'Token is required', () => {
    enforce(token).isNotEmpty();
  });
});

export const useStripeHandler = ({ state, updateState, step }: HandlerStep) => {
  const defaultValues = Object.assign({}, STRIPE_DEFAULT_STATE, state.handler);

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
