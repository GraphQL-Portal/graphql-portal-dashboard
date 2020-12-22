import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import IApiDef from '../../common/interface/api-def.interface';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import { ISourceDocument } from '../../data/schema/source.schema';
import ApiDefService from '../../modules/api-def/api-def.service';
import AppModule from '../../modules/app.module';
import RedisService from '../../modules/redis/redis.service';
import SourceService from '../../modules/source/source.service';
import { apiDefExample, expectApiDef, mongoDocumentSchema, sourceExample } from '../common';

describe('ApiDefService', () => {
  let app: TestingModule;
  let sourceService: SourceService;
  let apiDefService: ApiDefService;
  let redisService: RedisService;
  let apiDef: IApiDefDocument;
  let source: ISourceDocument;

  let publishApiDefsUpdatedMock: jest.SpyInstance;

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    sourceService = app.get<SourceService>(SourceService);
    apiDefService = app.get<ApiDefService>(ApiDefService);
    redisService = app.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('setLastUpdateTime', () => {
    it('should set current timestamp', async () => {
      const timestamp = apiDefService.setLastUpdateTime();
      expect(timestamp / 10).toBeCloseTo(Date.now() / 10, 0);
      expect(apiDefService.lastUpdateTime).toBe(timestamp);
    });
  });

  describe('publishApiDefsUpdated', () => {
    it("should call redis service's method", async () => {
      publishApiDefsUpdatedMock = jest.spyOn(redisService, 'publishApiDefsUpdated').mockResolvedValue(1);
      await apiDefService.publishApiDefsUpdated();
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledWith(apiDefService.lastUpdateTime);
    });
  });

  describe('create', () => {
    it('findAll returns empty array', async () => {
      const { apiDefs, timestamp } = await apiDefService.findAll();
      expect(timestamp).toBe(apiDefService.lastUpdateTime);
      expect(apiDefs).toHaveLength(0);
    });

    it('should create an apiDef', async () => {
      source = await sourceService.create({ ...sourceExample, name: 'api-source' });
      apiDef = await apiDefService.create(apiDefExample, [source._id]);
      expect(apiDef).toBeDefined();
      expectApiDef(apiDef);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
    });

    it('findAll returns an apiDef', async () => {
      const { apiDefs } = await apiDefService.findAll();
      expect(apiDefs).toBeDefined();
      expect(apiDefs).toHaveLength(1);
    });

    it('findByName returns an apiDef', async () => {
      const result = await apiDefService.findByName(apiDef.name);
      expect(result).toBeDefined();
      expect(result!.id).toBe(apiDef.id);
    });

    it('isSourceUsed should return an apiDef with the source', async () => {
      const result = await apiDefService.isSourceUsed(source._id);
      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('should throw for wrong name', async () => {
      expect.assertions(1);
      await expect(() => apiDefService.update('', {} as IApiDef, [])).rejects.toThrow('does not exist');
    });

    it('should update document and call publishApiDefsUpdated', async () => {
      const newData = { ...apiDef.toJSON(), endpoint: 'new-endpoint' } as IApiDef;
      const result = await apiDefService.update(apiDef.name, newData, []);

      expect(result).toBeDefined();
      expect(result.toJSON()).toMatchObject({ ...newData, ...mongoDocumentSchema });
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
    });

    it('isSourceUsed should return falsy value', async () => {
      const result = await apiDefService.isSourceUsed(source._id);
      expect(result).toBeFalsy();
    });
  });

  describe('delete', () => {
    it('should delete document and call publishApiDefsUpdated', async () => {
      const result = await apiDefService.delete(apiDef.name);
      expect(result).toBe(true);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
    });

    it('should not change anything', async () => {
      const result = await apiDefService.delete(apiDef.name);
      expect(result).toBe(false);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(0);
    });
  });
});
