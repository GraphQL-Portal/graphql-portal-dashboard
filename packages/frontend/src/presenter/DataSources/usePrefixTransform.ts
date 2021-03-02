import { useFieldArray, useForm } from 'react-hook-form';

import { PrefixForm, UsePrefixTransformHook } from '../../types';
import { arrayStringFromObjectArray, arrayToFieldArray } from './helpers';

const PREFIX_DEFAULT_VALUES = {
  value: '',
  ignore: [],
  includeRootOperations: false,
};

export const usePrefixTransform: UsePrefixTransformHook = ({
  type,
  onCancel,
  onSuccess,
  value,
}) => {
  const { ignore, ...transform } = value || {};
  const defaultValues = Object.assign({}, PREFIX_DEFAULT_VALUES, transform, {
    ignore: arrayToFieldArray(ignore || []),
  });

  const { handleSubmit, control, errors, register } = useForm<PrefixForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'ignore' });

  const onSubmit = ({ ignore, ...rest }: PrefixForm) => {
    onCancel();
    onSuccess({
      [type]: {
        ...rest,
        ignore: arrayStringFromObjectArray(ignore),
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    control,
    ignoredTypes: fields,
    addIgnoredTypes: append,
    removeIgnoredTypes: remove,
  };
};
