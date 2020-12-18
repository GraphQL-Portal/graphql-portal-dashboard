import { Validate } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import ApiDefValidator from './api-def-validator';
import { ApiDef } from '@graphql-portal/types';

export default class ApiDefCreateDto {
  @Validate(ApiDefValidator)
  public apiDef: ApiDef;

  @IsObjectId({ each: true, message: 'Each source should be a string with ID' })
  public sources: string[];
}
