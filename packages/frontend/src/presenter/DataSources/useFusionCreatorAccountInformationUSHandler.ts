import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import {
  FusionCreatorAIUSForm,
  useFusionCreatorAccountInformationUSHandlerHook,
} from '../../types';

const suite = vest.create(
  'fusion_creator_account_information_us_handler',
  ({ token }) => {
    test('token', 'Token is required', () => {
      enforce(token).isNotEmpty();
    });
  }
);

export const useFusionCreatorAccountInformationUSHandler: useFusionCreatorAccountInformationUSHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, { token: '' }, state.handler);

  const { handleSubmit, errors, control } = useForm<FusionCreatorAIUSForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: FusionCreatorAIUSForm) =>
    updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
