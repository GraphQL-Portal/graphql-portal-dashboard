import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { SalesforceForm, UseSalesforceHandlerHook } from '../../types';
import { isUrl } from '../validation';

const suite = vest.create('saleseforce_handler', ({ baseUrl, token }) => {
  test('baseUrl', 'Base url is required', () => {
    enforce(baseUrl).isNotEmpty();
  });

  test(
    'baseUrl',
    'Please use absolute URL http://example.com or http://localhost:80',
    () => {
      isUrl(baseUrl);
    }
  );
});

const SALESFORCE_DEFAULT_STATE = { baseUrl: '', token: '' };

export const useSalesforceHandler: UseSalesforceHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign(
    {},
    SALESFORCE_DEFAULT_STATE,
    state.handler
  );

  const { handleSubmit, errors, register } = useForm<SalesforceForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: SalesforceForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
  };
};
