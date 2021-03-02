import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { enforce, test } from 'vest';

import { TransformStep } from '../../types';
import { useFormErrors } from '../../model/Hooks';
import { validateAjv, getTransformSchema } from './helpers';
import {
  definitions,
  AVAILABLE_TRANSFORMS,
  AJV_SCHEMA_TEMPLATE,
} from './constants';

const validate = validateAjv(AJV_SCHEMA_TEMPLATE);

export const useTransformEditors = ({
  type,
  onCancel,
  onSuccess,
  value,
}: TransformStep) => {
  const source = AVAILABLE_TRANSFORMS[type];

  enforce.extend({
    isValidSchema(transform: any) {
      return validate({
        properties: {
          [type]: getTransformSchema(definitions)(type),
        },
      })({ [type]: transform });
    },
  });

  const suite = vest.create('handler_form', ({ transform }) => {
    test('transform', () => {
      enforce(transform).isValidSchema();
    });
  });

  const { control, errors, handleSubmit } = useForm({
    mode: 'onSubmit',
    resolver: vestResolver(suite),
    defaultValues: {
      transform: value || {},
    },
  });

  useFormErrors(errors);

  const onSubmit = ({ transform }: { transform: any }) => {
    onCancel();
    onSuccess({
      name: type,
      description: source.description || '',
      [type]: transform,
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    errors,
    source,
  };
};
