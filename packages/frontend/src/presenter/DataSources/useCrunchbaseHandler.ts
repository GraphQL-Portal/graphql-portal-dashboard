import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { CrunchbaseForm, UseCrunchbaseHandlerHook } from '../../types';

const suite = vest.create('crunchbase_handler', ({ userKey }) => {
  test('userKey', 'User key is required', () => {
    enforce(userKey).isNotEmpty();
  });
});

export const useCrunchbaseHandler: UseCrunchbaseHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, { userKey: '' }, state.handler);

  const { handleSubmit, errors, register } = useForm<CrunchbaseForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: CrunchbaseForm) => updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    register,
  };
};
