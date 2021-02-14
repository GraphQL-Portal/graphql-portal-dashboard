import { ObjectId } from 'mongodb';

export default interface IMatch {
  requestDate: {
    $gte?: Date;
    $lte?: Date;
  };
  'resolvers.sourceId'?: ObjectId;
  apiDef?: ObjectId;
  user?: ObjectId;
}
