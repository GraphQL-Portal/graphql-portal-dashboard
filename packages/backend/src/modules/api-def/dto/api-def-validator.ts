import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { validateApiDefConfig } from '@graphql-portal/types';

@ValidatorConstraint({ name: 'api-def', async: false })
export default class ApiDefValidator implements ValidatorConstraintInterface {
  public validate(value: any): boolean {
    return !validateApiDefConfig(value);
  }

  public defaultMessage({ value }: ValidationArguments): string {
    return validateApiDefConfig(value) as string;
  }
}
