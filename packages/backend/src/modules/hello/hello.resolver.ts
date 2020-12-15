import { Args, Query, Resolver } from '@nestjs/graphql';
import HelloService from './hello.service';

@Resolver('hello')
export default class HelloResolver {
  public constructor(private readonly helloService: HelloService) {

  }

  @Query()
  public hello(@Args('name') name: string): Promise<string> {
    return this.helloService.hello(name);
  }
}
