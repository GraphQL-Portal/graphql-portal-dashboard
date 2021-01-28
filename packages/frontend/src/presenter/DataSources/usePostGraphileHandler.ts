import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const suite = vest.create('post_graphile_handler', ({ host, port, database, user, password }) => {
  test('host', 'Host is required', () => {
    enforce(host).isNotEmpty();
  });
  test('user', 'User is required', () => {
    enforce(user).isNotEmpty();
  });
  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });
  test('port', 'Port is required', () => {
    enforce(port).isNotEmpty();
  });
  test('port', 'Port has to be numeric', () => {
    enforce(port).isNumeric();
  });
  test('database', 'Database is required', () => {
    enforce(database).isNotEmpty();
  });
});

const POST_GRAPHILE_DEFAULT_STATE = {
  connectionString: '',
  cacheIntrospection: false,
  appendPlugins: [],
  skipPlugins: [],
  schemaName: [],
  options: [],
  pool: [],
};

export const usePostGraphileHandler = ({ state, updateState }: HandlerStep) => {
  const handlerState = Object.assign({}, POST_GRAPHILE_DEFAULT_STATE, state);
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: handlerState,
  });


  const {
    fields: optionsFields,
    append: appendOptionsField,
    remove: removeOptionsField,
  } = useFieldArray({
    control,
    name: 'options',
  });

  const {
    fields: schemaNameFields,
    append: appendSchemaNameField,
    remove: removeSchemaNameField,
  } = useFieldArray({
    control,
    name: 'schemaName',
  });

  const {
    fields: skipPluginsFields,
    append: appendSkipPluginsField,
    remove: removeSkipPluginsField,
  } = useFieldArray({
    control,
    name: 'skipPlugins',
  });

  const {
    fields: appendPluginsFields,
    append: appendAppendPluginsField,
    remove: removeAppendPluginsField,
  } = useFieldArray({
    control,
    name: 'appendPlugins',
  });

  const {
    fields: poolFields,
    append: appendPoolField,
    remove: removePoolField,
  } = useFieldArray({
    control,
    name: 'pool',
  });

  useFormErrors(errors);

  const onSubmit = (data: any) => updateState({ handler: data });

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    poolFields,
    appendPoolField,
    removePoolField,
    optionsFields,
    appendOptionsField,
    removeOptionsField,
    appendPluginsFields,
    appendAppendPluginsField,
    removeAppendPluginsField,
    schemaNameFields,
    appendSchemaNameField,
    removeSchemaNameField,
    skipPluginsFields,
    appendSkipPluginsField,
    removeSkipPluginsField,
  };
};
