import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import {
  FusionCreatorAIPSD2STETForm,
  useFusionCreatorAccountInformationPSD2STETHandlerHook,
} from '../../types';

const suite = vest.create(
  'fusion_creator_account_information_psd2_stet_handler',
  ({ token }) => {
    test('token', 'Token is required', () => {
      enforce(token).isNotEmpty();
    });
  }
);

export const useFusionCreatorAccountInformationPSD2STETHandler: useFusionCreatorAccountInformationPSD2STETHandlerHook = ({
  state,
  updateState,
  step,
}) => {
  const defaultValues = Object.assign({}, { token: '' }, state.handler);

  const {
    handleSubmit,
    errors,
    control,
  } = useForm<FusionCreatorAIPSD2STETForm>({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  useFormErrors(errors);

  const onSubmit = (handler: FusionCreatorAIPSD2STETForm) =>
    updateState({ handler }, step);

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
  };
};
