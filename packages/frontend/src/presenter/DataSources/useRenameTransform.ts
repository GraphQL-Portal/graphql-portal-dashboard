import { useFieldArray, useForm } from 'react-hook-form';

import { RenameForm, UseRenameTransformHook } from '../../types';

export const useRenameTransform: UseRenameTransformHook = ({
  type,
  onCancel,
  onSuccess,
  value,
}) => {
  const { handleSubmit, control, errors, register } = useForm<RenameForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      items: value || undefined,
    },
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
