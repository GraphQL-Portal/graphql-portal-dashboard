import { MetricsChannels } from '@graphql-portal/types';

export default interface IGotError {
  event: MetricsChannels.GOT_ERROR;
  error: string | Error | null;
  date: number;
}
