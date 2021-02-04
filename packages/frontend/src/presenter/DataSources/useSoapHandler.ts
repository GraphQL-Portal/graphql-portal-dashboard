import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

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

export const useSoapHandler = ({ state, updateState, step }: HandlerStep) => {
  const defaultValues = Object.assign({}, SOAP_DEFAULT_STATE, state.handler);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: any) => {
    updateState({ handler }, step);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
