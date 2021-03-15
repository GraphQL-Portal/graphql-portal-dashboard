import { AdditionalResolver, ApiAuth, ApiDef } from './data';
import { FieldArray, FormMethods } from '../HookForm';
import { ObjectArrayItem, StringArray } from '../Forms';

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

type FormAdditionalResolver = Omit<AdditionalResolver, 'args'> & {
  args: FieldArray<ObjectArrayItem> | undefined;
};

export type AdditionalResolverForm = {
  mesh: {
    additionalResolvers: FormAdditionalResolver[] | undefined;
    additionalTypeDefs: string[] | undefined;
  };
};
export type AdditionalResolverFormMethods = FormMethods<AdditionalResolverForm>;
