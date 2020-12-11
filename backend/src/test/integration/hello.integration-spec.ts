import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import HelloRepository from '../../data/repository/hello.repository';
import AppModule from '../../modules/app.module';

const HELLO_REPOSITORY_COUNTER_VALUE: number = 3;
const DEFAULT_NAME: string = 'Erlich Bachman';

describe('Hello integration', () => {
  let app: INestApplication;
  let request: () => supertest.SuperTest<supertest.Test>;

  const helloRepository = { getUsersHelloWorld: async (): Promise<number> => HELLO_REPOSITORY_COUNTER_VALUE };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HelloRepository)
      .useValue(helloRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const requestToServer = supertest(app.getHttpServer());
    request = (): supertest.SuperTest<supertest.Test> => requestToServer;
  });

  describe('(GET) /hello:', () => {
    it('should return 400 - bad request', async () => {
      await request()
        .get('/hello')
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 200, with mocked counter', async () => {
      const { body } = await request()
        .get('/hello')
        .query({ name: DEFAULT_NAME })
        .expect(HttpStatus.OK);

      expect(typeof body).toBe('object');

      expect(body).toMatchObject({ result: expect.any(String) });

      expect(body).toStrictEqual({ result: `Hello, ${DEFAULT_NAME}! Your counter: ${HELLO_REPOSITORY_COUNTER_VALUE}` });
    });
  });

  describe('(POST) /graphql, (query) hello:', () => {
    it('should return 400 - bad request, expected name', async () => {
      const { body } = await request()
        .post('/graphql')
        .send({
          query: `{
            hello()
          }`,
        })
        .expect(HttpStatus.BAD_REQUEST);

      const errorMessage = body.errors[0].message;
      expect(errorMessage).toStrictEqual('Syntax Error: Expected Name, found ")".');
    });

    it('should return 200, with mocked counter', async () => {
      const { body } = await request()
        .post('/graphql')
        .send({
          query: `{
            hello(name: "${DEFAULT_NAME}")
          }`,
        })
        .expect(HttpStatus.OK);

      expect(body.data.hello).toStrictEqual(`Hello, ${DEFAULT_NAME}! Your counter: ${HELLO_REPOSITORY_COUNTER_VALUE}`);
    });
  });
});
