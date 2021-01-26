import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';

import { useFormErrors } from '../../model/Hooks';
import { NameForm, NameStep } from '../../types';

const suite = vest.create('data_source_name', ({ name }) => {
  test('name', 'Name is required', () => {
    enforce(name).isNotEmpty();
  });
});

export const useAddDataSourceName = ({ state, nextStep, step }: NameStep) => {
  const { control, errors, handleSubmit } = useForm<NameForm>({
    defaultValues: state,
    reValidateMode: 'onSubmit',
    resolver: vestResolver(suite),
  });

  useFormErrors(errors);

  const onSubmit = (data: NameForm) => nextStep(step, data);

  return {
    control,
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
};
