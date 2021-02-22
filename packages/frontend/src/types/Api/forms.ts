import { ApiAuth, ApiDef } from './data';

export type ApiAuthFields = ApiAuth<{ value: string }[]>;

export type ApiDefForm = Omit<ApiDef, 'authentication'> & {
  authentication: ApiAuthFields;
  source: '';
};
