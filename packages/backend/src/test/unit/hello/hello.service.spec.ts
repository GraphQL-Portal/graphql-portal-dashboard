import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '../../../modules/app.module';
import HelloService from '../../../modules/hello/hello.service';

describe('HelloService', () => {
  let helloService: HelloService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    helloService = app.get<HelloService>(HelloService);
  });

  describe('root', () => {
    const name: string = 'John Smith';

    it(`should return: "Hello, ${name}! Your counter: 1"`, async () => {
      const firstExecutionResult: string = await helloService.hello(name);
      expect(firstExecutionResult).toStrictEqual(`Hello, ${name}! Your counter: 1`);

      const secondExecutionResult: string = await helloService.hello(name);
      expect(secondExecutionResult).toStrictEqual(`Hello, ${name}! Your counter: 2`);
    });
  });
});
