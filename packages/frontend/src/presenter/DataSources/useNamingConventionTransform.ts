import { useForm } from 'react-hook-form';
import { useFormErrors } from '../../model/Hooks';
import {
  UseNamingConventionTransformHook,
  NamingConventionForm,
} from '../../types';

const NAMING_CONVENTION_DEFAULT = {
  enumValues: '',
  fieldNames: '',
  typeNames: '',
};

export const useNamingConventionTransform: UseNamingConventionTransformHook = ({
  type,
  onCancel,
  onSuccess,
  value,
}) => {
  const defaultValues = Object.assign({}, NAMING_CONVENTION_DEFAULT, value);
  const { control, handleSubmit, errors } = useForm<NamingConventionForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const clearEmptyFields = (data: NamingConventionForm) =>
    Object.keys(data).reduce((acc: Record<string, string>, key: string) => {
      const currentValue = data[key as keyof NamingConventionForm];
      return {
        ...acc,
        ...(!!currentValue ? { [key]: currentValue } : {}),
      };
    }, {});

  const onSubmit = (data: NamingConventionForm) => {
    onCancel();
    onSuccess({
      [type]: clearEmptyFields(data),
    });
  };

  return { onSubmit: handleSubmit(onSubmit), control };
};
