import { Test, TestingModule } from '@nestjs/testing';
import AppModule from '../../../modules/app.module';
import HelloWorldDto from '../../../modules/hello/dto/hello.dto';
import HelloController from '../../../modules/hello/hello.controller';

describe('HelloController', () => {
  let helloController: HelloController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    helloController = app.get<HelloController>(HelloController);
  });

  describe('root', () => {
    const name: string = 'John Smith';

    it(`should return: "Hello, ${name}! Your counter: 1"`, async () => {
      const helloWorldDto = new HelloWorldDto(name);

      const result: { result: string } = await helloController.hello(helloWorldDto);
      expect(result).toStrictEqual({ result: `Hello, ${name}! Your counter: 1` });
    });
  });
});
