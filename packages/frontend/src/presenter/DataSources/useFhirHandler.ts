import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const suite = vest.create('fhir_handler', ({ endpoint }) => {
  test('endpoint', 'Endpoint is required', () => {
    enforce(endpoint).isNotEmpty();
  });
});

const FHIR_DEFAULT_STATE = {
  endpoint: '',
};

export const useFhirHandler = ({ state, updateState }: HandlerStep) => {
  const handlerState = Object.assign({}, FHIR_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) => updateState({ handler: data });

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
