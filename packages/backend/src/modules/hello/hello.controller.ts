import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import Tags from '../../common/enum/tags.enum';
import HelloWorldDto from './dto/hello.dto';
import HelloService from './hello.service';

@ApiTags(Tags.HELLO)
@Controller(Tags.HELLO)
export default class HelloController {
  public constructor(private readonly helloService: HelloService) {

  }

  @Get('/')
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: HttpStatus.OK, description: 'Say hello to user by name' })
  public async hello(@Query() query: HelloWorldDto): Promise<{ result: string }> {
    const result: string = await this.helloService.hello(query.name);

    return { result };
  }
}
