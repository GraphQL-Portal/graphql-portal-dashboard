import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class HelloWorldDto {
  public constructor(name: string) {
    this.name = name;
  }

  @IsNotEmpty()
  @ApiProperty({ example: 'John Smith', description: 'end-user name' })
  @Field(() => String)
  public name: string;
}
