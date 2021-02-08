import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { randomString } from '../../common/tool';
import TokenService from '../../modules/user/token.service';
import AppModule from '../../modules/app.module';
import { expectTokens, randomObjectId } from '../common';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import * as jwt from '../../common/tool/token.tool';
import UserService from '../../modules/user/user.service';
import Roles from '../../common/enum/roles.enum';

jest.spyOn(jwt as any, 'verify').mockResolvedValue(true);

jest.useFakeTimers();

jest.mock('ioredis');

describe('TokenService', () => {
  let app: TestingModule;
  let tokenService: TokenService;
  let userService: UserService;
  let tokens: ITokens;
  let spySign: jest.SpyInstance;

  const userId = randomObjectId();
  const role = Roles.USER;
  const device = randomString();

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    tokenService = app.get<TokenService>(TokenService);
    userService = app.get<UserService>(UserService);
    spySign = jest.spyOn(jwt, 'sign').mockImplementation(() => randomString());
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('issueTokens', () => {
    it('returns tokens', async () => {
      const spyFindById = jest.spyOn(userService, 'findById').mockResolvedValue({
        _id: userId,
        role,
      } as any);
      const result = await tokenService.issueTokens(userId, device);

      expectTokens(result);
      expect(spySign).toBeCalledTimes(2);
      expect(spyFindById).toBeCalledTimes(1);
      tokens = result;
    });

    describe('refreshToken', () => {
      it('throws error on invalid device', async () => {
        await expect(
          tokenService.refreshTokens(tokens.refreshToken, 'device')
        ).rejects.toThrow('Refresh token is invalid');
        expect(spySign).toBeCalledTimes(0);
      });

      it('returns a new pair of tokens', async () => {
        const result = await tokenService.refreshTokens(
          tokens.refreshToken,
          device
        );

        expect(spySign).toBeCalledTimes(2);
        expectTokens(result);
      });

      it("can't refresh token using previous one", async () => {
        await expect(
          tokenService.refreshTokens(tokens.refreshToken, device)
        ).rejects.toThrow('Refresh token is invalid');
        expect(spySign).toBeCalledTimes(0);
      });
    });
  });
});
