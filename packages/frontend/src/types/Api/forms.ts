import { ApiAuth, ApiDef } from './data';
import { FormMethods } from '../HookForm';
import { StringArray } from '../Forms';

export type ApiAuthFields = ApiAuth<StringArray>;

export type ApiDefForm = Omit<
  ApiDef,
  | 'authentication'
  | 'sources'
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'allow_ips'
  | 'deny_ips'
> & {
  authentication: ApiAuthFields;
  source: '';
  sources: StringArray;
  allow_ips: StringArray;
  deny_ips: StringArray;
};

export type ApiDefFormMethods = FormMethods<ApiDefForm>;
