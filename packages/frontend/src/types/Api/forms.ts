import { ApiAuth, ApiDef } from './data';
import { FormMethods } from '../HookForm';
import { StringArray } from '../Forms';

export type ApiAuthFields = ApiAuth<StringArray>;

export type ApiDefForm = Omit<
  ApiDef,
  'authentication' | 'sources' | '_id' | 'createdAt' | 'updatedAt'
> & {
  authentication: ApiAuthFields;
  source: '';
  sources: StringArray;
};

export type ApiDefFormMethods = FormMethods<ApiDefForm>;
