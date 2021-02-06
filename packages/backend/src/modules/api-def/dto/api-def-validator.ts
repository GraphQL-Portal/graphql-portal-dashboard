import { validateApiDefConfig } from '@graphql-portal/types';
import { ValidationError } from 'apollo-server-express';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'api-def', async: false })
export default class ApiDefValidator implements ValidatorConstraintInterface {
  public validate(value: any): boolean {
    const errorMessage = validateApiDefConfig(value);
    if (errorMessage) {
      throw new ValidationError(errorMessage);
    }
    return true;
  }
}
