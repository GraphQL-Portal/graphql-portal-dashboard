import { ApiAuth, StringArray } from '../../../types';
import { arrayStringFromObjectArray } from '../../DataSources/helpers';

export const createAuth = ({
  auth_header_name,
  auth_tokens,
}: ApiAuth<StringArray>) =>
  !!auth_header_name
    ? {
        authentication: {
          auth_header_name,
          auth_tokens: arrayStringFromObjectArray(auth_tokens),
        },
      }
    : {};
