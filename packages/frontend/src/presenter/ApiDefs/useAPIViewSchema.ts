import { useState, useEffect } from 'react';
import { buildClientSchema, printSchema, getIntrospectionQuery } from 'graphql';
import { compose, getProp } from '../../utils';
import { UseAPIViewSchemaHook } from '../../types';

const INTROSPECTION_PAYLOAD = {
  operationName: 'IntrospectionQuery',
  query: getIntrospectionQuery(),
};

const getEditorSchema = compose(
  printSchema,
  buildClientSchema,
  getProp('data')
);

export const useAPIViewSchema: UseAPIViewSchemaHook = (fetcher) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const getSchema = async () => {
      const schema = await fetcher(INTROSPECTION_PAYLOAD);
      setValue(getEditorSchema(schema));
    };

    getSchema();
  }, [fetcher]);

  return { value };
};
