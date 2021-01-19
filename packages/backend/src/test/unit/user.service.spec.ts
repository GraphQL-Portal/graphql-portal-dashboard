import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import Roles from '../../common/enum/roles.enum';
import { randomEmail, randomString } from '../../common/tool';
import UserService from '../../modules/user/user.service';
import TokenService from '../../modules/user/token.service';
import AppModule from '../../modules/app.module';
import { IUserDocument } from '../../data/schema/user.schema';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import { createUser, randomObjectId } from '../common';

describe('ApiDefService', () => {
  let app: TestingModule;
  let userService: UserService;
  let tokenService: TokenService;

  let spyRefreshTokens: jest.SpyInstance;

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    userService = app.get<UserService>(UserService);
    tokenService = app.get<TokenService>(TokenService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('register', () => {
    const device = 'device';
    const password = 'Secret123';
    const tokens: ITokens = {
      accessToken: randomString(),
      refreshToken: randomString(),
    };
    const registrationData = {
      email: randomEmail(),
      role: Roles.USER,
      password,
    };

    beforeAll(() => {
      spyRefreshTokens = jest.spyOn(tokenService, 'issueTokens').mockResolvedValue(tokens);
    });

    it('creates user', async () => {
      const result = await userService.register(registrationData, device);

      expect(result).toMatchObject(tokens);
      expect(spyRefreshTokens).toBeCalledTimes(1);
    });

    describe('login', () => {
      it('throws error on invalid credentials', async () => {
        await expect(userService.login('invalid@email.com', 'password123', device)).rejects.toThrow(
          'Wrong email or password'
        );
      });

      it('returns token', async () => {
        const result = await userService.login(registrationData.email, password, device);

        expect(result).toMatchObject(tokens);
        expect(spyRefreshTokens).toBeCalledTimes(1);
      });
    });

    describe('findByEmail', () => {
      let id: string;
      let user: IUserDocument;

      const expectUser = (data: IUserDocument): void => {
        expect(data).toMatchObject({
          ...registrationData,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          password: expect.any(String),
        });
      };

      it('should return user', async () => {
        user = (await userService.findByEmail(registrationData.email))!;

        expect(user).toBeDefined();
        expectUser(user);
        id = user._id!;
      });

      it('should return null', async () => {
        const user = await userService.findByEmail(randomEmail());

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

      describe('getUsers', () => {
        let adminId: string;

        beforeAll(async () => {
          adminId = (await createUser(userService, Roles.ADMIN))._id!;
        });

        it('should return user', async () => {
          const users = await userService.getUsers(adminId);

          expect(users).toBeDefined();
          expect(users).toHaveLength(1);
          expect(!users.some(({ _id }) => _id === adminId)).toBeTruthy();
        });
      });
    });
  });
});
