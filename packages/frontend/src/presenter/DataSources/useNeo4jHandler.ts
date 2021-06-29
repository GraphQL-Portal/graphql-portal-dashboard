import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { Neo4JForm, UseNeo4JHandlerHook } from '../../types';

const suite = vest.create('neo4j_handler', ({ url, password, username }) => {
  test('url', 'Url is required', () => {
    enforce(url).isNotEmpty();
  });

  test(
    'url',
    'Please enter valid URL for the Neo4j instance (example: neo4j://localhost)',
    () => {
      enforce(url).matches(/^(neo4j|bolt):\/\/(.*)?/);
    }
  );

  test('username', 'Username is required', () => {
    enforce(username).isNotEmpty();
  });

  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });
});

const NEO4J_DEFAULT_STATE = {
  url: undefined,
  username: undefined,
  password: undefined,
  database: undefined,
  typeDefs: undefined,
  alwaysIncludeRelationships: false,
};

export const useNeo4jHandler: UseNeo4JHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, NEO4J_DEFAULT_STATE, state.handler);
  const { handleSubmit, errors, control, register } = useForm<Neo4JForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: Neo4JForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    register,
  };
};
