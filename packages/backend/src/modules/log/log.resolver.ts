import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { Roles } from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import SubscriptionEnum from '../../common/enum/subscription.enum';
import RedisService from '../redis/redis.service';
import { Log } from './interfaces/log.interface';
import LogService from './log.service';

@Resolver('Log')
export default class LogResolver {
  public constructor(
    private readonly logService: LogService,
    private readonly redis: RedisService
  ) {}

  @Query()
  @Roles([RolesEnum.ADMIN])
  public getLatestLogs(): Promise<Log[]> {
    return this.logService.getLatestLogs();
  }

  @Subscription()
  @Roles([RolesEnum.ADMIN])
  public logsUpdated(): AsyncIterator<Log[]> {
    return this.redis.pubSub.asyncIterator(SubscriptionEnum.logsUpdated);
  }
}
