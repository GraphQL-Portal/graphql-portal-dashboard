import { Channel } from '@graphql-portal/types';
import { Test, TestingModule } from '@nestjs/testing';
import Subscription from '../../common/enum/subscription.enum';
import AppModule from '../../modules/app.module';
import GatewayService from '../../modules/gateway/gateway.service';
import RedisService from '../../modules/redis/redis.service';
import GatewayStatusTimers from '../../common/enum/gateway-status-timers.enum';

jest.useFakeTimers();

jest.mock('ioredis');

describe('GatewayService', () => {
  let app: TestingModule;
  let gatewayService: GatewayService;
  let redisService: RedisService;

  beforeAll(async () => {
    app = await Test.createTestingModule({ imports: [AppModule] }).compile();

    gatewayService = app.get<GatewayService>(GatewayService);
    redisService = app.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    jest.useRealTimers();
    await app.close();
  });

  afterEach(() => jest.clearAllMocks());

  describe('onApplicationBootstrap', () => {
    it('should subscribe to the channel', async () => {
      const onMock = jest.spyOn(redisService, 'on').mockResolvedValueOnce(1);
      await app.init();

      expect(onMock).toHaveBeenCalledTimes(1);
      expect(onMock).toHaveBeenCalledWith(Channel.ping, expect.any(Function));
    });
  });

  describe('onPing', () => {
    it('findAll returns empty array', async () => {
      const result = await gatewayService.findAll();
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });

    it('onPing should save a gateway node in memory', async () => {
      const setTimerMock = jest.spyOn(gatewayService as any, 'setTimer').mockReturnValue(1);
      const gatewaysUpdatedMock = jest.spyOn(gatewayService as any, 'gatewaysUpdated').mockReturnValue(1);
      const data = { nodeId: 'nodeId', configTimestamp: Date.now() };

      (gatewayService as any).onPing(JSON.stringify(data));
      const nodes = await gatewayService.findAll();

      expect(nodes).toHaveLength(1);
      expect(nodes[0]).toMatchObject(data);
      expect(setTimerMock).toHaveBeenCalledTimes(1);
      expect(setTimerMock).toHaveBeenCalledWith(data.nodeId);
      expect(gatewaysUpdatedMock).toHaveBeenCalledTimes(1);
      setTimerMock.mockRestore();
    });
  });

  describe('setTimer', () => {
    it('onPing should save a timer in memory and remove a node then', async () => {
      const gatewaysUpdatedMock = jest.spyOn(gatewayService as any, 'gatewaysUpdated').mockReturnValue(1);
      const nodeId = '1';
      (gatewayService as any).nodes = {
        '1': {
          hostname: 'test.local',
          nodeId: '1',
          lastPingAt: Date.now() - GatewayStatusTimers.REMOVE_TIMEOUT * 2,
          status: 'active',
        },
      };
      // need this for time comparison condition in setTimer
      const fakeDate = Date.now() + GatewayStatusTimers.REMOVE_TIMEOUT * 2;
      const dateNowMock = jest.spyOn(global.Date, 'now').mockReturnValue(fakeDate);

      (gatewayService as any).setTimer(nodeId);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect((gatewayService as any).clearNodes[nodeId]).toBeDefined();

      (gatewayService as any).setTimer(nodeId);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect((gatewayService as any).clearNodes[nodeId]).toBeDefined();
      expect(gatewaysUpdatedMock).toHaveBeenCalledTimes(0);

      // first time, sets node's status to 'idle'
      jest.runOnlyPendingTimers();
      expect((gatewayService as any).clearNodes[nodeId]).toBeDefined();
      expect((gatewayService as any).nodes[nodeId].status).toBe('idle');

      // second time, clears the node
      jest.runOnlyPendingTimers();
      expect((gatewayService as any).clearNodes[nodeId]).not.toBeDefined();
      expect(gatewaysUpdatedMock).toHaveBeenCalledTimes(2);

      gatewaysUpdatedMock.mockRestore();
      dateNowMock.mockRestore();
    });
  });

  describe('gatewaysUpdated', () => {
    it('should publish to the channel', async () => {
      const publishGraphqlMock = jest.spyOn(redisService, 'publishGraphql').mockResolvedValueOnce();

      (gatewayService as any).gatewaysUpdated();

      expect(publishGraphqlMock).toHaveBeenCalledTimes(1);
      expect(publishGraphqlMock).toHaveBeenCalledWith(Subscription.gatewaysUpdated, gatewayService.findAll());
    });
  });
});
