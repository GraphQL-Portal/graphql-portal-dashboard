import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';
import { validateAjv, getHandlerSchema } from './helpers';
import { AJV_SCHEMA_TEMPLATE, definitions } from './constants';

const validate = validateAjv(AJV_SCHEMA_TEMPLATE);

export const useEditorsHandler = ({
  source,
  updateState,
  state,
  step,
}: HandlerStep) => {
  const { key = '', connector } = source;

  enforce.extend({
    isValidSchema(handler: any) {
      return validate({
        properties: {
          [key]: getHandlerSchema(definitions)(key),
        },
      })({ [key]: handler });
    },
  });

  const suite = vest.create('handler_form', ({ handler }) => {
    test('handler', () => {
      enforce(handler).isValidSchema();
    });
  });

  const { control, handleSubmit, errors } = useForm({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(suite),
    defaultValues: state,
  });

  useFormErrors(errors);

  const onSubmit = ({ handler }: any) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    source: connector,
  };
};
