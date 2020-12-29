import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { randomString } from '../../common/tool';
import TokenService from '../../modules/user/token.service';
import AppModule from '../../modules/app.module';
import { expectTokens, randomObjectId } from '../common';
import ITokens from '../../modules/user/interfaces/tokens.interface';
import * as jwt from '../../common/tool/token.tool';

jest.spyOn(jwt as any, 'verify').mockResolvedValue(true);

describe('ApiDefService', () => {
  let app: TestingModule;
  let tokenService: TokenService;
  let tokens: ITokens;
  let spySign: jest.SpyInstance;

  const userId = randomObjectId();
  const device = randomString();

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    tokenService = app.get<TokenService>(TokenService);
    spySign = jest.spyOn(jwt, 'sign').mockImplementation(() => randomString());
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('issueTokens', () => {
    it('returns tokens', async () => {
      const result = await tokenService.issueTokens(userId, device);

      expectTokens(result);
      expect(spySign).toBeCalledTimes(2);
      tokens = result;
    });

    describe('refreshToken', () => {
      it('throws error on invalid device', async () => {
        await expect(tokenService.refreshTokens(tokens.refreshToken, 'device')).rejects.toThrow('Refresh token is invalid');
        expect(spySign).toBeCalledTimes(0);
      });

      it('returns a new pair of tokens', async () => {
        const result = await tokenService.refreshTokens(tokens.refreshToken, device);

        expect(spySign).toBeCalledTimes(2);
        expectTokens(result);
      });

      it('can\'t refresh token using previous one', async () => {
        await expect(tokenService.refreshTokens(tokens.refreshToken, device)).rejects.toThrow('Refresh token is invalid');
        expect(spySign).toBeCalledTimes(0);
      });
    });
  });
});
