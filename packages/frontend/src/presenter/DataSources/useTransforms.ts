import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AVAILABLE_TRANSFORMS } from './constants';

const createOption = (option: string) => ({ label: option, value: option });
const options = Object.keys(AVAILABLE_TRANSFORMS).map(createOption);

export const useTransforms = () => {
  const [fields, setFields] = useState<string[]>([]);
  const { handleSubmit, control, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      transform: '',
    },
  });

  const onAddTransform = ({ transform }: { transform: string }) => {
    console.log(transform);
    if (!!transform) {
      setFields((s) => s.concat(transform));
      reset({ transform: '' });
    }
  };

  return {
    transforms: options,
    onAddTransform: handleSubmit(onAddTransform),
    control,
    fields,
  };
};
