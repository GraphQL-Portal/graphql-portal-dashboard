import { gql, useMutation } from '@apollo/client';

import { MutationOptions } from '../../../types';

export const CHANGE_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const useChangePassword = (options: MutationOptions = {}) =>
  useMutation(CHANGE_PASSWORD, options);
