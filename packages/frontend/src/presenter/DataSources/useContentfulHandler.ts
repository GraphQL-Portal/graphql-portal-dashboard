import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';

const suite = vest.create('contentful_handler', ({ token, endpoint }) => {
  test('token', 'Token is required', () => {
    enforce(token).isNotEmpty();
  });
  test('endpoint', 'Endpoint is required', () => {
    enforce(endpoint).isNotEmpty();
  });
});

const CONTENTFUL_DEFAULT_STATE = {
  token: '',
  endpoint: '',
};

export const useContentfulHandler = ({
  state,
  updateState,
  step,
}: HandlerStep) => {
  const handlerState = Object.assign({}, CONTENTFUL_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) =>
    updateState({ handler: { [SOURCE_NAMES.CONTENTFUL_HANDLER]: data } }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
