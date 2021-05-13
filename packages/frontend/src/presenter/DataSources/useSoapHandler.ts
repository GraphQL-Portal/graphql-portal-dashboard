import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { SoapForm, UseSoapHandlerHook } from '../../types';

const suite = vest.create(
  'neo4j_handler',
  ({ wsdl, basicAuth: { password, username } }) => {
    test('wsdl', 'WSDL is required', () => {
      enforce(wsdl).isNotEmpty();
    });

    if (password || username) {
      test('username', 'Username is required', () => {
        enforce(username).isNotEmpty();
      });

      test('password', 'Password is required', () => {
        enforce(password).isNotEmpty();
      });
    }
  }
);

const SOAP_DEFAULT_STATE = {
  wsdl: '',
  basicAuth: {
    username: '',
    password: '',
  },
  securityCert: {
    password: '',
    privateKey: '',
    publicKey: '',
  },
};

export const useSoapHandler: UseSoapHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, SOAP_DEFAULT_STATE, state.handler);
  const { handleSubmit, errors, register } = useForm<SoapForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: SoapForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
  };
};
