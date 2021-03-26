import { RecordStringAny } from './General';

export type IsZeroLength = (entity: { length: number }) => boolean;
export type IsEmptyObject = (obj: RecordStringAny) => boolean;
export type IsEqual = (x: any) => (y: any) => boolean;

export type ArrayLikeEntity = {
  indexOf(item: any): number;
};
