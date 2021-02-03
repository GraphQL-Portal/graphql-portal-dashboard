import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';

const suite = vest.create('neo4j_handler', ({ wsdl, password, username }) => {
  test('wsdl', 'WSDL is required', () => {
    enforce(wsdl).isNotEmpty();
  });
  test('username', 'Username is required', () => {
    enforce(username).isNotEmpty();
  });
  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });
});

const SOAP_DEFAULT_STATE = {
  wsdl: '',
  username: '',
  password: '',
  securityCertPassword: '',
  securityCertPrivateKey: '',
  securityCertPublicKey: '',
};

export const useSoapHandler = ({ state, updateState, step }: HandlerStep) => {
  const handlerState = Object.assign({}, SOAP_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) =>
    updateState(
      {
        handler: {
          [SOURCE_NAMES.SOAP]: {
            wsdl: data.wsdl,
            basicAuth: {
              username: data.username,
              password: data.password,
            },
            securityCert: {
              password: data.securityCertPassword,
              privateKey: data.securityCertPrivateKey,
              publicKey: data.securityCertPublicKey,
            },
          },
        },
      },
      step
    );

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
