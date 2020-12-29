import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { randomString } from '../../common/tool';
import TokenService from '../../modules/user/token.service';
import AppModule from '../../modules/app.module';
import { expectTokens, randomObjectId } from '../common';
import ITokens from '../../modules/user/interfaces/tokens.interface';

describe('ApiDefService', () => {
  let app: TestingModule;
  let tokenService: TokenService;
  let tokens: ITokens;

  const userId = randomObjectId();
  const device = randomString();

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    tokenService = app.get<TokenService>(TokenService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('issueTokens', () => {
    it('returns tokens', async () => {
      const result = await tokenService.issueTokens(userId, device);

      expectTokens(result);
      tokens = result;
    });

    describe('refreshToken', () => {
      it('throws error on invalid device', async () => {
        await expect(tokenService.refreshTokens(tokens.refreshToken, 'device')).rejects.toThrow('Refresh token is invalid');
      });

      it('returns a new pair of tokens', async () => {
        const result = await tokenService.refreshTokens(tokens.refreshToken, device);

        expectTokens(result);
      });

      it('previous refresh token does not work anymore', async () => {
        await expect(tokenService.refreshTokens(tokens.refreshToken, device)).rejects.toThrow('Refresh token is invalid');
      });
    });
  });
});
