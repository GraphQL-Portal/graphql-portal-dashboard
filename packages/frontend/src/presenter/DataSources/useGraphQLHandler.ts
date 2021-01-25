import { useForm, useFieldArray } from 'react-hook-form';

export const useGraphQLHandler = () => {
  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      endpoint: '',
      schemaHeaders: [],
      operationHeaders: [],
      useGETForQueries: false,
      method: '',
      useSSEForSubscription: false,
      customFetch: {},
      webSocketImpl: '',
      introspection: '',
      cacheIntrospection: '',
      multipart: false,
    },
  });

  const {
    fields: schemaFields,
    append: appendSchemaField,
    remove: removeSchemaField,
  } = useFieldArray({
    control,
    name: 'schemaHeaders',
  });

  const {
    fields: operationFields,
    append: appendOperationField,
    remove: removeOperationField,
  } = useFieldArray({
    control,
    name: 'operationHeaders',
  });

  const onSubmit = (data: any) => console.log(data);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    schemaFields,
    appendSchemaField,
    removeSchemaField,
    operationFields,
    appendOperationField,
    removeOperationField,
  };
};
