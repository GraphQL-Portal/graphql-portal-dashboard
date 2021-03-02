import { useFieldArray, useForm } from 'react-hook-form';

import { RenameForm, UseRenameTransformHook } from '../../types';
import { AVAILABLE_TRANSFORMS } from './constants';

const RENAME_DEFAULT_VALUES = {
  items: [],
};

export const useRenameTransform: UseRenameTransformHook = ({
  type,
  onCancel,
  onSuccess,
  value,
}) => {
  const { description = '' } = AVAILABLE_TRANSFORMS[type];
  const defaultValues = Object.assign({}, RENAME_DEFAULT_VALUES, value || {});

  const { handleSubmit, control, errors, register } = useForm<RenameForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const onSubmit = ({ items }: RenameForm) => {
    onCancel();
    onSuccess({
      name: type,
      description,
      [type]: items,
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    register,
    items: fields,
    onAdd: append,
    onRemove: remove,
  };
};
