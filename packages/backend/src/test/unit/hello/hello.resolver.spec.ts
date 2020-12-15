import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '../../../modules/app.module';
import HelloResolver from '../../../modules/hello/hello.resolver';

describe('HelloResolver', () => {
  let helloResolver: HelloResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    helloResolver = app.get<HelloResolver>(HelloResolver);
  });

  describe('root', () => {
    const name: string = 'John Smith';

    it(`should return: "Hello, ${name}! Your counter: 1"`, async () => {
      const result: string = await helloResolver.hello(name);
      expect(result).toStrictEqual(`Hello, ${name}! Your counter: 1`);
    });
  });
});
