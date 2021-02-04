import { validateSourceConfig } from '@graphql-portal/types';
import { ValidationError } from 'apollo-server-express';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'source', async: false })
export default class SourceValidator implements ValidatorConstraintInterface {
  public validate(value: any): boolean {
    const errorMessage = validateSourceConfig(value);
    if (errorMessage) {
      throw new ValidationError(errorMessage);
    }
    return true;
  }
}
