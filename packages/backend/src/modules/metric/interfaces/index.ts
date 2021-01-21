import IGotRequest from './got-request.interface';
import IResolverCalled from './resolver-called.interface';
import IResolverDone from './resolver-done.interface';
import IResolverError from './resolver-error.interface';
import IGotError from './got-error.interface';
import ISentResponse from './sent-response.interface';
import IReducedResolver from './reduced-resolver.interface';


export type AnyMetric = IGotRequest | IGotError | ISentResponse | IResolverCalled | IResolverDone | IResolverError;

export type AnyResolverMetric = IResolverCalled | IResolverDone | IResolverError;

export {
  IGotRequest,
  IResolverCalled,
  IResolverDone,
  IResolverError,
  IGotError,
  ISentResponse,
  IReducedResolver,
};
