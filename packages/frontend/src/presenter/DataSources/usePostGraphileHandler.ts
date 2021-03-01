import { useForm, useFieldArray } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import {
  arrayObjectToObject,
  arrayStringFromObjectArray,
  objectToFieldArray,
  arrayToFieldArray,
} from './helpers';

const suite = vest.create('post_graphile_handler', ({ connectionString }) => {
  test('connectionString', 'Connection string is required', () => {
    enforce(connectionString).isNotEmpty();
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

export const usePostGraphileHandler = ({
  state,
  updateState,
  step,
}: HandlerStep) => {
  const {
    appendPlugins,
    skipPlugins,
    schemaName,
    options,
    pool,
    ...handler
  } = state.handler;
  const defaultValues = Object.assign(
    {},
    POST_GRAPHILE_DEFAULT_STATE,
    handler,
    {
      appendPlugins: arrayToFieldArray(appendPlugins),
      skipPlugins: arrayToFieldArray(skipPlugins),
      schemaName: arrayToFieldArray(schemaName),
      pool: objectToFieldArray(pool),
      options: objectToFieldArray(options),
    }
  );
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
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

  const onSubmit = (data: any) =>
    updateState(
      {
        handler: {
          ...data,
          schemaName: arrayStringFromObjectArray(data.schemaName),
          appendPlugins: arrayStringFromObjectArray(data.appendPlugins),
          skipPlugins: arrayStringFromObjectArray(data.skipPlugins),
          pool: arrayObjectToObject(data.pool),
          options: arrayObjectToObject(data.options),
        },
      },
      step
    );

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
