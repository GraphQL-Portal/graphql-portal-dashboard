import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';

import { useFormErrors } from '../../model/Hooks';
import { useCreateSource } from '../../model/DataSources/commands';
import { useDataSourceContext } from '../../model/providers';
import { validateAvj, getHandlerSchema } from './helpers';
import { AJV_SCHEMA_TEMPLATE, definitions } from './constants';

const validate = validateAvj(AJV_SCHEMA_TEMPLATE);

type DataSourceFormInput = {
  name: string;
  handler: any;
};

export const useAddDataSource = () => {
  const { source, clearSource } = useDataSourceContext();
  const { key = '', connector } = source || {};

  const onCompleted = () => {
    // @TODO I need to refetch data-source from here
    // or I need to tell useDataSource to refetch :)
    clearSource();
  };

  const onError = (err: any) => {
    console.error('CREATE ERROR: ', err);
    // @TODO probably I need to show error message
  };

  const { createSource } = useCreateSource({ onCompleted, onError });

  enforce.extend({
    isValidSchema(handler: any) {
      return validate({
        properties: {
          [key]: getHandlerSchema(definitions)(key),
        },
      })({ [key]: handler });
    },
  });

  const validationSuite = vest.create(
    'login_form',
    ({ name, handler }: DataSourceFormInput) => {
      test('name', 'Name is required', () => {
        enforce(name).isNotEmpty();
      });

      test('handler', () => {
        enforce(handler).isValidSchema();
      });
    }
  );

  const { control, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
    defaultValues: {
      name: '',
      handler: {},
    },
  });

  useFormErrors(errors);

  const onSubmit = (source: any) => {
    createSource({
      variables: {
        source,
      },
    });
  };

  return {
    source: connector,
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
  };
};
