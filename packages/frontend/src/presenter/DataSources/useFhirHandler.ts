import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { isUrl } from './validation';

const suite = vest.create('fhir_handler', ({ endpoint }) => {
  test('endpoint', 'Endpoint is required', () => {
    enforce(endpoint).isNotEmpty();
  });

  test(
    'endpoint',
    'Please use absolute URL http://example.com or http://localhost:80',
    () => {
      isUrl(endpoint);
    }
  );
});

export const useFhirHandler = ({ state, updateState, step }: HandlerStep) => {
  const defaultValues = Object.assign({}, { endpoint: '' }, state.handler);

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
