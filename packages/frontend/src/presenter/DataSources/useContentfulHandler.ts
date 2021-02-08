import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const CONTENTFUL_DEFAULT_STATE = {
  token: '',
  endpoint: '',
};

const suite = vest.create('contentful_handler', ({ token, endpoint }) => {
  test('token', 'Token is required', () => {
    enforce(token).isNotEmpty();
  });
  test('endpoint', 'Endpoint is required', () => {
    enforce(endpoint).isNotEmpty();
  });
});

export const useContentfulHandler = ({
  state,
  updateState,
  step,
}: HandlerStep) => {
  const handlerState = Object.assign(
    {},
    CONTENTFUL_DEFAULT_STATE,
    state.handler
  );
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (handler: any) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
