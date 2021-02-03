import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { SOURCE_NAMES } from './constants';

const suite = vest.create('neo4j_handler', ({ url, password, username }) => {
  test('url', 'Url is required', () => {
    enforce(url).isNotEmpty();
  });
  test('username', 'Username is required', () => {
    enforce(username).isNotEmpty();
  });
  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });
});

const NEO4J_DEFAULT_STATE = {
  url: '',
  username: '',
  password: '',
  database: '',
  typeDefs: '',
  cacheIntrospection: false,
  alwaysIncludeRelationships: false,
};

export const useNeo4jHandler = ({ state, updateState, step }: HandlerStep) => {
  const handlerState = Object.assign({}, NEO4J_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });

  useFormErrors(errors);

  const onSubmit = (data: any) =>
    updateState({ handler: { [SOURCE_NAMES.NEO4J]: data } }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
