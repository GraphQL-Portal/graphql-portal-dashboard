import { useFieldArray, useForm } from 'react-hook-form';

import { RenameForm, UseRenameTransformHook } from '../../types';

const RENAME_DEFAULT_VALUES = { items: [] };

export const useRenameTransform: UseRenameTransformHook = ({
  type,
  onCancel,
  onSuccess,
  value,
}) => {
  const defaultValues = Object.assign({}, RENAME_DEFAULT_VALUES, {
    items: value || {},
  });

  const { handleSubmit, control, errors, register } = useForm<RenameForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const onSubmit = ({ items }: RenameForm) => {
    onCancel();
    onSuccess({ [type]: items });
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
