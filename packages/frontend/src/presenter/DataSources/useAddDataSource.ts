import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';

import { useFormErrors  } from '../../hooks';
import { useCreateSource } from '../../model/DataSources/commands';
import { useDataSourceContext, useToast } from '../../model/providers';
import { validateAvj, getHandlerSchema } from './helpers';
import { AJV_SCHEMA_TEMPLATE, definitions } from './constants';

const validate = validateAvj(AJV_SCHEMA_TEMPLATE);

type DataSourceFormInput = {
  name: string;
  handler: any;
};

// enforce.extend({
//   isValidSchema() {
//     return {
//       pass: true,
//       message: () => '',
//     }
//   }
// })

const validationSuite = vest.create('login_form', ({ name }: DataSourceFormInput) => {
  test('name', 'Name is required', () => {
    enforce(name).isNotEmpty();
  });

  // test('handler', () => {
  //   enforce(handler).isValidSchema();
  // });
});



export const useAddDataSource = () => {
  const { showErrorToast } = useToast();
  const { source, clearSource } = useDataSourceContext();
  const { key = '', connector } = source || {};

  const onCompleted = (data: any) => {
    console.log('CREATE SUCCESS: ', data);
  }

  const onError = (err: any) => {
    console.error('CREATE ERROR: ', err);
  }

  const { createSource } = useCreateSource({ onCompleted, onError });

  const { control, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
    defaultValues: {
      name: '',
      handler: {},
    },
  });

  useFormErrors(errors);

  const onHandlerValidate = (data: any) =>
    validate({
      properties: {
        [key]: getHandlerSchema(definitions)(key),
      },
    })({ [key]: data });

  console.log(source, clearSource);

  const onSubmit = (source: any) => {

    // message is function because I've tried to use vest
    // I'm waiting on a fix for typings
    const { pass, message } = onHandlerValidate(source.handler);

    if (pass) {
      createSource({
        variables: {
          source,
        },
      });
    } else {
      showErrorToast(message());
    }
  };

  return {
    source: connector,
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
  };
}
