import { useForm } from 'react-hook-form';
import vest, { test } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { ContentfulForm, UseContentfulHandlerHook } from '../../types';
import enforce from '../validation';

const CONTENTFUL_DEFAULT_STATE = {
  token: '',
  space: '',
  environment: '',
  endpoint: '',
};

const suite = vest.create(
  'contentful_handler',
  ({ token, space, endpoint }) => {
    test('token', 'Token is required', () => {
      enforce(token).isNotEmpty();
    });

    test('space', 'Space ID is required', () => {
      enforce(space).isNotEmpty();
    });

    test(
      'endpoint',
      'Please use absolute URL http://example.com or http://localhost:80',
      () => {
        endpoint && enforce(endpoint).isURL();
      }
    );
  }
);

export const useContentfulHandler: UseContentfulHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign(
    {},
    CONTENTFUL_DEFAULT_STATE,
    state.handler
  );

  const { handleSubmit, errors, register } = useForm<ContentfulForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: ContentfulForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
  };
};
