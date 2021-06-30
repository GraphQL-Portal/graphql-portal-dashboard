import { useForm } from 'react-hook-form';
import vest, { test } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { UseFhirHandlerHook, FhirForm } from '../../types';
import enforce from '../validation';

const suite = vest.create('fhir_handler', ({ endpoint }) => {
  test('endpoint', 'Endpoint is required', () => {
    enforce(endpoint).isNotEmpty();
  });

  test(
    'endpoint',
    'Please use absolute URL http://example.com or http://localhost:80',
    () => {
      enforce(endpoint).isURL(endpoint);
    }
  );
});

export const useFhirHandler: UseFhirHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign(
    {},
    { endpoint: '', rejectUnauthorized: false },
    state.handler
  );

  const { handleSubmit, errors, register, control } = useForm<FhirForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: FhirForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
    control,
  };
};
