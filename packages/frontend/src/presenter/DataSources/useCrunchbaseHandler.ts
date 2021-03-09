import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { HandlerStep } from '../../types';

const suite = vest.create('crunchbase_handler', ({ userKey }) => {
  test('userKey', 'User key is required', () => {
    enforce(userKey).isNotEmpty();
  });
});

export const useCrunchbaseHandler = ({
  state,
  updateState,
  step,
}: HandlerStep) => {
  const defaultValues = Object.assign({}, { userKey: '' }, state.handler);

  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: any) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
