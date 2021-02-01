import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';

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

  const onSubmit = (data: any) => updateState({ handler: { [SOURCE_NAMES.FHIR]: data } });

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
