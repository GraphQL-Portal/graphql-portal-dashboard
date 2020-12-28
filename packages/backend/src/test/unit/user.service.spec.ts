import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import Roles from '../../common/enum/roles.enum';
import { randomString } from '../../common/tool';
import UserService from '../../modules/user/user.service';
import AppModule from '../../modules/app.module';
import * as jwt from '../../common/tool/token.tool';
import { IUserDocument } from 'src/data/schema/user.schema';
import { randomObjectId } from '../common';

describe('ApiDefService', () => {
  let app: TestingModule;
  let userService: UserService;
  let spySign: jest.SpyInstance;

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    userService = app.get<UserService>(UserService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('register', () => {
    const password = 'Secret123';
    const token = randomString();
    const registrationData = {
      email: `${randomString()}@example.com`,
      role: Roles.USER,
      password,
    };

    beforeAll(async () => {
      spySign = await jest.spyOn(jwt as any, 'sign').mockResolvedValue(token);
    })

    it('creates user', async () => {
      const result = await userService.register(registrationData);

      expect(result).toBe(token);
      expect(spySign).toBeCalledTimes(1);
    });

    describe('login', () => {
      it('throws error on invalid credentials', async () => {
        await expect(userService.login('invalid@email.com', 'password123')).rejects.toThrow('Wrong email or password');
      });

      it('returns token', async () => {
        const token = await userService.login(registrationData.email, password);

        expect(spySign).toBeCalledTimes(1);
        expect(token).toBe(token);
      });
    });

    describe('findByEmail', () => {
      let id: string;

      const expectUser = (data: IUserDocument) => {
        expect(data).toMatchObject({
          ...registrationData,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          password: expect.any(String),
        });
      };

      it('should return user', async () => {
        const user = (await userService.findByEmail(registrationData.email))!;

        expect(user).toBeDefined();
        expectUser(user);

        id = user._id!;
      });

      it('should return null', async () => {
        const user = await userService.findByEmail(`email@email.com`);

        expect(user).toBeNull();
      });

      describe('findById', () => {
        it('should return user', async () => {
          const user = (await userService.findById(id))!;

          expect(user).toBeDefined();
          expectUser(user);
        });

        it('should return null', async () => {
          const user = await userService.findById(randomObjectId());

          expect(user).toBeNull();
        });
      });
    });
  });
});
