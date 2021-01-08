import { IsObjectId } from 'class-validator-mongo-object-id';
import SourceCreateDto from './source-create.dto';

export default class SourceUpdateDto extends SourceCreateDto {
  @IsObjectId({ message: 'Id should be a string with ID' })
  public id: string;
}
