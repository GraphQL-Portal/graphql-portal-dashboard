import { IsBoolean } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import ApiDefCreateDto from './api-def-create.dto';

export default class ApiDefUpdateDto extends ApiDefCreateDto {
  @IsObjectId({ message: 'Id should be a string with ID' })
  public id: string;

  @IsBoolean()
  public enabled: boolean;
}
