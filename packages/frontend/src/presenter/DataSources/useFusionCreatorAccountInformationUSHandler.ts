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
  ({ authorizationHeader }) => {
    test('authorizationHeader', 'Authorization header name is required', () => {
      enforce(authorizationHeader).isNotEmpty();
    });
  }
);

export const useFusionCreatorAccountInformationUSHandler: useFusionCreatorAccountInformationUSHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign(
    {},
    { authorizationHeader: '' },
    state.handler
  );

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
