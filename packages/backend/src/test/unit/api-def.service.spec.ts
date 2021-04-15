import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import IApiDef from '../../common/interface/api-def.interface';
import { randomString } from '../../common/tool';
import { IApiDefDocument } from '../../data/schema/api-def.schema';
import { ISourceDocument } from '../../data/schema/source.schema';
import ApiDefService from '../../modules/api-def/api-def.service';
import AppModule from '../../modules/app.module';
import RedisService from '../../modules/redis/redis.service';
import SourceService from '../../modules/source/source.service';
import {
  apiDefExample,
  expectApiDef,
  mongoDocumentSchema,
  randomObjectId,
  sourceExample,
} from '../common';

jest.mock('ioredis');

describe('ApiDefService', () => {
  let app: TestingModule;
  let sourceService: SourceService;
  let apiDefService: ApiDefService;
  let redisService: RedisService;
  let apiDef: IApiDefDocument;
  let source: ISourceDocument;

  let publishApiDefsUpdatedMock: jest.SpyInstance;
  let getMeshSchemaMock: jest.SpyInstance;

  const userId = randomObjectId();

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();
    await Promise.all(mongoose.connections.map((c) => c.db?.dropDatabase()));

    sourceService = app.get<SourceService>(SourceService);
    apiDefService = app.get<ApiDefService>(ApiDefService);
    redisService = app.get<RedisService>(RedisService);

    getMeshSchemaMock = jest
      .spyOn(apiDefService, 'getMeshSchema')
      .mockResolvedValue(randomString());
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('setLastUpdateTime', () => {
    it('should set current timestamp', async () => {
      const timestamp = apiDefService.setLastUpdateTime();
      const timeDiff = (Date.now() - timestamp) / 10;
      expect(timeDiff).toBeLessThanOrEqual(2);
      expect(apiDefService.lastUpdateTime).toBe(timestamp);
    });
  });

  describe('publishApiDefsUpdated', () => {
    it("should call redis service's method", async () => {
      publishApiDefsUpdatedMock = jest
        .spyOn(redisService, 'publishApiDefsUpdated')
        .mockResolvedValue(1);
      await apiDefService.publishApiDefsUpdated();
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledWith(
        apiDefService.lastUpdateTime
      );
    });
  });

  describe('create', () => {
    it('findAll returns empty array', async () => {
      const { apiDefs, timestamp } = await apiDefService.findAll();
      expect(timestamp).toBe(apiDefService.lastUpdateTime);
      expect(apiDefs).toHaveLength(0);
    });

    it('should create an apiDef', async () => {
      source = await sourceService.create(
        { ...sourceExample, name: 'api-source' },
        userId
      );
      expect(getMeshSchemaMock).toHaveBeenCalledTimes(1);
      const result = await apiDefService.create(
        apiDefExample,
        [source._id],
        userId
      );
      apiDef = result.apiDef;
      expect(apiDef).toBeDefined();
      expectApiDef(apiDef);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
      expect(getMeshSchemaMock).toHaveBeenCalledTimes(2);
    });

    it('findAll returns an apiDef', async () => {
      const { apiDefs } = await apiDefService.findAll();
      expect(apiDefs).toBeDefined();
      expect(apiDefs).toHaveLength(1);
    });

    it('isSourceUsed should return an apiDef with the source', async () => {
      const result = await apiDefService.isSourceUsed(source._id);
      expect(result).toBeDefined();
    });

    it('findAllForGateway should return only enabled apiDefs', async () => {
      const disabled = await apiDefService.create(
        {
          ...apiDefExample,
          _id: randomObjectId(),
          name: randomString(),
          enabled: false,
          endpoint: '/endpoint2',
        },
        [],
        randomObjectId()
      );
      expect(disabled.apiDef).toBeDefined();
      expect(disabled.apiDef.enabled).toBe(false);

      const { apiDefs } = await apiDefService.findAllForGateway();
      expect(apiDefs).toHaveLength(1);
    });

    it('findById should return an apiDef', async () => {
      const { apiDefs } = await apiDefService.findAll();
      expect(apiDefs).toHaveLength(2);

      const id = apiDefs[0]._id!;
      const apiDef = await apiDefService.findById(id);
      expect(apiDef).toBeDefined();
      expect(apiDef._id).toBeDefined();
      expect(apiDef._id!.toString()).toBe(id!.toString());
    });
  });

  describe('update', () => {
    it('should throw for wrong id', async () => {
      expect.assertions(1);
      const id = randomObjectId();
      await expect(() =>
        apiDefService.update(id, {} as IApiDef, [])
      ).rejects.toThrow(`ApiDef with id ${id} does not exist`);
    });

    it('should update document and call publishApiDefsUpdated', async () => {
      const newData = ({
        ...apiDef.toObject({ getters: true }),
        endpoint: 'new-endpoint',
      } as any) as IApiDef;
      const result = await apiDefService.update(apiDef._id, newData, []);

      expect(result.apiDef).toBeDefined();
      expect(result.apiDef.toObject({ getters: true })).toMatchObject({
        ...newData,
        ...mongoDocumentSchema,
      });
      expect(typeof result.schema).toBe('string');
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
      expect(getMeshSchemaMock).toHaveBeenCalledTimes(1);
    });

    it('should save all fields', async () => {
      const newData = ({
        ...apiDef.toObject({ getters: true }),
        schema_polling_interval: 1,
        schema_updates_through_control_api: true,
        enable_ip_filtering: true,
        allow_ips: ['String'],
        deny_ips: ['String'],
        request_size_limit: 'String',
        depth_limit: 1,
        request_complexity_limit: 1,
        rate_limit: { field: 'value' },
      } as any) as IApiDef;
      const result = await apiDefService.update(apiDef._id, newData, []);

      expect(result.apiDef).toBeDefined();
      expect(result.apiDef.toObject({ getters: true })).toMatchObject({
        ...newData,
        ...mongoDocumentSchema,
      });
    });

    it('isSourceUsed should return falsy value', async () => {
      const result = await apiDefService.isSourceUsed(source._id);
      expect(result).toBeFalsy();
    });
  });

  describe('delete', () => {
    it('should delete document and call publishApiDefsUpdated', async () => {
      const result = await apiDefService.delete(apiDef._id);
      expect(result).toBe(true);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(1);
    });

    it('should not change anything', async () => {
      const result = await apiDefService.delete(apiDef._id);
      expect(result).toBe(false);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(0);
    });

    it('shoud delete document by name and call publishApiDefsUpdated', async () => {
      const source = await sourceService.create(
        { ...sourceExample, _id: randomObjectId(), name: 'api-source-2' },
        userId
      );
      await apiDefService.create(
        { ...apiDefExample, _id: randomObjectId() },
        [source._id],
        userId
      );

      const result = await apiDefService.deleteByName(apiDefExample.name);
      expect(result).toBe(true);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(2);
    });

    it('should not change anything', async () => {
      const result = await apiDefService.deleteByName(apiDefExample.name);
      expect(result).toBe(false);
      expect(publishApiDefsUpdatedMock).toHaveBeenCalledTimes(0);
    });
  });
});
