import { Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import { Log } from './interfaces/log.interface';
import LogService from './log.service';

@Resolver('Log')
export default class LogResolver {
  public constructor(private readonly logService: LogService) {}

  @Query()
  @Roles([RolesEnum.ADMIN])
  public getLatestLogs(): Promise<Log[]> {
    return this.logService.getLatestLogs();
  }
}
