import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { validateSourceConfig } from '@graphql-portal/types';

@ValidatorConstraint({ name: 'source', async: false })
export default class SourceValidator implements ValidatorConstraintInterface {
  public validate(value: any): boolean {
    return !validateSourceConfig(value);
  }

  public defaultMessage({ value }: ValidationArguments): string {
    return validateSourceConfig(value) as string;
  }
}
