import { Validate } from 'class-validator';
import SourceValidator from './source-validator';
import { SourceConfig } from '@graphql-portal/types';

export default class SourceCreateDto {
  @Validate(SourceValidator)
  public source: SourceConfig;
}
