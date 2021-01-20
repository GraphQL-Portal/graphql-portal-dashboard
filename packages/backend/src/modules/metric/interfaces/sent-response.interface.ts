import { MetricsChannels } from '@graphql-portal/types';

export default interface ISentResponse {
  event: MetricsChannels.SENT_RESPONSE,
  rawResponseBody: string,
  contentLength: number,
  date: number,
}